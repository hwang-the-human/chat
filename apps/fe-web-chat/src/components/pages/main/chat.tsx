import React, { useState, useEffect, useRef, useMemo } from 'react';
import MessageItem from '../../atoms/messageItem';
import { IconButton, Input, List } from '@material-tailwind/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { findMyMessages } from 'apps/fe-web-chat/src/api/messages/queries';
import { FindMyMessagesQuery } from 'apps/fe-web-chat/src/graphql/graphql';
import { createMessage } from 'apps/fe-web-chat/src/api/messages/mutations';
import ChatHeader from './chatHeader';
import { socket } from 'apps/fe-web-chat/src/api/socket/socket';

interface Props {
  receiverId: string;
  userId: string;
}

export default function Chat({ receiverId, userId }: Props) {
  const chatContainerRef = useRef<any>(null);
  const client = useApolloClient();

  const { loading, error, data } = useQuery(findMyMessages, {
    variables: { senderId: userId, receiverId: receiverId },
  });
  const [handleCreateMessage] = useMutation(createMessage);

  const [messages, setMessages] = useState<
    FindMyMessagesQuery['findMyMessages']['items']
  >([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (!chatContainerRef.current) return;
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages.length, chatContainerRef]);

  useEffect(() => {
    if (!data?.findMyMessages?.items) return;
    setMessages(data.findMyMessages.items);
  }, [data]);

  useEffect(() => {
    function onMessage(
      d: FindMyMessagesQuery['findMyMessages']['items'][number]
    ) {
      if (!data?.findMyMessages?.items) return;
      client.writeQuery({
        query: findMyMessages,
        data: {
          ...data,
          findMyMessages: {
            ...data.findMyMessages,
            items: [...data.findMyMessages.items, d],
          },
        },
        variables: { senderId: userId, receiverId: receiverId },
      });
    }
    socket.on(`events.messages.${userId}`, onMessage);

    return () => {
      socket.off(`events.messages.${userId}`, onMessage);
    };
  }, [data]);

  async function handleSendMessage() {
    if (!input) return;
    setInput('');
    const newMessage: FindMyMessagesQuery['findMyMessages']['items'][number] = {
      id: '',
      content: input,
      createdAt: new Date(),
      sender: {
        user_id: userId,
        firstName: '',
        lastName: '',
        imageUrl: '',
      },
      receiver: {
        user_id: receiverId,
        firstName: '',
        lastName: '',
        imageUrl: '',
      },
    };

    setMessages((prev) => {
      const newArray = [...prev, newMessage];
      client.writeQuery({
        query: findMyMessages,
        data: {
          ...data,
          findMyMessages: {
            ...data?.findMyMessages,
            items: newArray,
          },
        },
        variables: { senderId: userId, receiverId: receiverId },
      });
      return newArray;
    });

    try {
      const res = await handleCreateMessage({
        variables: {
          createMessageInput: {
            senderId: userId,
            receiverId: receiverId,
            content: input,
          },
        },
      });

      setMessages((prev) => {
        const newArray = [...prev];
        const i = newArray.findIndex((a) => a.id === '');
        newArray[i] = res.data?.createMessage!;

        client.writeQuery({
          query: findMyMessages,
          data: {
            ...data,
            findMyMessages: {
              ...data?.findMyMessages,
              items: newArray,
            },
          },
          variables: { senderId: userId, receiverId: receiverId },
        });

        return newArray;
      });
    } catch (err) {
      console.log(err);
    }
  }

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  const disabled = useMemo(() => (receiverId ? false : true), [receiverId]);

  return (
    <div className="flex flex-col flex-1 border-r border-r-gray-600 gap-2 overflow-hidden">
      <ChatHeader receiverId={receiverId} />
      {disabled ? (
        <div className="flex items-center flex-1 justify-center">
          <h1 className="text-gray-500">Please select or start a new chat</h1>
        </div>
      ) : (
        <List className="flex flex-1 justify-end overflow-hidden p-0">
          <div className="overflow-y-auto" ref={chatContainerRef}>
            {messages.map((message, i) => (
              <MessageItem message={message} receiverId={receiverId} key={i} />
            ))}
          </div>
        </List>
      )}

      <div className="flex items-center bg-secondary p-5 box-border gap-4">
        <Input
          type="text"
          placeholder="Type a message"
          color="white"
          disabled={disabled}
          autoFocus
          value={input}
          onChange={onChangeInput}
          className="bg-tertiary p-2 border-transparent focus:border-transparent focus:ring-0 text-white"
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              handleSendMessage();
            }
          }}
          labelProps={{
            className: 'hidden',
          }}
        />

        <IconButton
          className="h-8 w-8"
          onClick={handleSendMessage}
          disabled={disabled}
        >
          <PaperAirplaneIcon color="grey" />
        </IconButton>
      </div>
    </div>
  );
}
