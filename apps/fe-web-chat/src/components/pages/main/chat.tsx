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
import { NetworkStatus } from '@apollo/client';

interface Props {
  receiverId: string;
  userId: string;
}

export default function Chat({ receiverId, userId }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const client = useApolloClient();
  const [input, setInput] = useState<string>('');

  const { data, fetchMore, networkStatus } = useQuery(findMyMessages, {
    notifyOnNetworkStatusChange: true,
    variables: {
      senderId: userId,
      receiverId: receiverId,
    },
  });
  const [handleCreateMessage] = useMutation(createMessage);
  const disabled = useMemo(() => (receiverId ? false : true), [receiverId]);

  useEffect(() => {
    if (!ref.current) return;

    //TODO: Fix infinite scroll
    ref.current.scrollTop = ref.current.scrollHeight / 2;
  }, [data, ref]);

  useEffect(() => {
    function onMessage(
      d: FindMyMessagesQuery['findMyMessages']['items'][number]
    ) {
      const prev = client.readQuery({
        query: findMyMessages,
        variables: { senderId: userId, receiverId: d.sender.user_id },
      });

      if (!prev) return;

      client.writeQuery({
        query: findMyMessages,
        data: {
          ...prev,
          findMyMessages: {
            ...prev.findMyMessages,
            items: [...prev.findMyMessages.items, d],
          },
        },
        variables: { senderId: userId, receiverId: d.sender.user_id },
      });
    }
    socket.on(`events.messages.${userId}`, onMessage);

    return () => {
      socket.off(`events.messages.${userId}`, onMessage);
    };
  }, []);

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

    client.writeQuery({
      query: findMyMessages,
      data: {
        ...data,
        findMyMessages: {
          ...data?.findMyMessages,
          items: [...data?.findMyMessages.items!, newMessage],
        },
      },
      variables: { senderId: userId, receiverId: receiverId },
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

      const newItems = [
        ...client.readQuery({
          query: findMyMessages,
          variables: { senderId: userId, receiverId: receiverId },
        })?.findMyMessages.items!,
      ];

      const i = newItems.findIndex((a) => a.id === '');
      newItems[i] = res.data?.createMessage!;

      client.writeQuery({
        query: findMyMessages,
        data: {
          ...data,
          findMyMessages: {
            ...data?.findMyMessages,
            items: newItems,
          },
        },
        variables: { senderId: userId, receiverId: receiverId },
      });
    } catch (err) {
      console.log(err);
    }
  }

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleScroll(e: React.UIEvent<HTMLElement>) {
    const { scrollTop } = e.currentTarget;

    if (
      scrollTop <= 20 &&
      data?.findMyMessages?.page! < data?.findMyMessages?.totalPages! &&
      networkStatus !== NetworkStatus.fetchMore
    ) {
      loadMore();
    }
  }

  async function loadMore() {
    await fetchMore({
      variables: {
        options: {
          page: data?.findMyMessages?.page! + 1,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          findMyMessages: {
            ...fetchMoreResult.findMyMessages,
            items: [
              ...fetchMoreResult.findMyMessages.items,
              ...prev.findMyMessages.items,
            ],
          },
        };
      },
    });
  }

  return (
    <div className="flex flex-col flex-1 border-r border-r-gray-600 gap-2 overflow-hidden">
      <ChatHeader receiverId={receiverId} />
      {disabled ? (
        <div className="flex items-center flex-1 justify-center">
          <h1 className="text-gray-500">Please select or start a new chat</h1>
        </div>
      ) : (
        <List className="flex flex-1 justify-end overflow-hidden p-0">
          <div className="overflow-y-auto" ref={ref} onScroll={handleScroll}>
            {data?.findMyMessages.items.map((message, i) => (
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
