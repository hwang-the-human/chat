import React, { useState, useEffect } from 'react';
import MessageItem from '../../atoms/messageItem';
import { IconButton, Input } from '@material-tailwind/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useQuery, useMutation } from '@apollo/client';
import { findMyMessages } from 'apps/fe-web-chat/src/api/messages/queries';
import { FindMyMessagesQuery } from 'apps/fe-web-chat/src/graphql/graphql';
import { createMessage } from 'apps/fe-web-chat/src/api/messages/mutations';
import ChatHeader from './chatHeader';

interface Props {
  activeChat: string;
  userId: string;
}

export default function Chat({ activeChat, userId }: Props) {
  const { loading, error, data } = useQuery(findMyMessages, {
    variables: { senderId: userId, receiverId: activeChat },
  });
  const [handleCreateMessage] = useMutation(createMessage);

  const [input, setInput] = useState<string>('');

  const [messages, setMessages] = useState<
    FindMyMessagesQuery['findMyMessages']['items'] | undefined
  >([]);

  useEffect(() => {
    if (loading) return;

    setMessages(
      data?.findMyMessages?.items?.filter(
        (a) =>
          a.sender.user_id === activeChat || a.receiver.user_id === activeChat
      )
    );
  }, [data, activeChat]);

  async function handleSendMessage() {
    if (!input) return;
    setInput('');
    const newMessage: FindMyMessagesQuery['findMyMessages']['items'][number] = {
      id: '',
      content: input,
      createdAt: null,
      sender: {
        user_id: userId,
        firstName: '',
        lastName: '',
        imageUrl: '',
      },
      receiver: {
        user_id: activeChat,
        firstName: '',
        lastName: '',
        imageUrl: '',
      },
    };
    try {
      setMessages((prev = []) => [...prev, newMessage]);
      const res = await handleCreateMessage({
        variables: {
          createMessageInput: {
            senderId: userId,
            receiverId: activeChat,
            content: input,
          },
        },
      });
      setMessages((prev = []) => {
        const newArray = [...prev];
        const i = newArray.findIndex((a) => a.id === '');
        newArray[i] = res.data?.createMessage!;
        return newArray;
      });
    } catch (err) {
      console.log(err);
    }
  }

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="flex flex-col flex-1 border-r border-r-gray-600 gap-2 overflow-hidden">
      <ChatHeader activeChat={activeChat} />
      <div className="flex-1 overflow-y-auto ">
        <div className="flex flex-col gap-2 justify-end p-7 box-border">
          {!loading && activeChat ? (
            messages?.map((message) => (
              <MessageItem message={message} activeChat={activeChat} />
            ))
          ) : (
            <div className="flex items-center w-full h-full justify-center">
              <h1 className="text-gray-500">
                Please select or start a new chat
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center bg-secondary p-5 box-border gap-4">
        <Input
          type="text"
          placeholder="Type a message"
          color="white"
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

        <IconButton className="h-8 w-8" onClick={handleSendMessage}>
          <PaperAirplaneIcon color="grey" />
        </IconButton>
      </div>
    </div>
  );
}
