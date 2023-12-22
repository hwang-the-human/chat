import React, { useEffect, useState } from 'react';
import ChatListHeader from './chatListHeader';
import { Input, List, Spinner } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ChatItem from '../../atoms/chatItem';
import { useApolloClient, useQuery } from '@apollo/client';
import { findMyChats } from 'apps/fe-web-chat/src/api/chats/queries';
import { socket } from 'apps/fe-web-chat/src/api/socket/socket';
import { FindMyChatsQuery } from 'apps/fe-web-chat/src/graphql/graphql';

interface Props {
  userId: string;
  receiverId: string;
  setReceiverId: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatList({ receiverId, setReceiverId, userId }: Props) {
  const client = useApolloClient();
  const { loading, error, data } = useQuery(findMyChats, {
    variables: { senderId: userId },
  });

  useEffect(() => {
    function onChat(d: FindMyChatsQuery['findMyChats']['items'][number]) {
      if (!data?.findMyChats?.items) return;
      client.writeQuery({
        query: findMyChats,
        data: {
          ...data,
          findMyChats: {
            ...data.findMyChats,
            items: [...data.findMyChats.items, d],
          },
        },
        variables: { senderId: userId },
      });
    }
    socket.on(`events.chats.${userId}`, onChat);

    return () => {
      socket.off(`events.chats.${userId}`, onChat);
    };
  }, [data]);

  return (
    <div className="flex flex-col flex-1 h-full border-r border-r-gray-600 overflow-hidden">
      <ChatListHeader userId={userId} setReceiverId={setReceiverId} />

      <div className="p-4 box-border">
        <Input
          className="bg-tertiary p-2 border-transparent focus:border-transparent focus:ring-0 text-white"
          color={'white'}
          // icon={<MagnifyingGlassIcon className="h-5 w-5" color="grey" />}
          placeholder="Search"
          labelProps={{
            className: 'hidden',
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {!loading && data ? (
          <List>
            {data.findMyChats.items.map((chat, i) => (
              <ChatItem
                chat={chat}
                receiverId={receiverId}
                setReceiverId={setReceiverId}
                key={i}
              />
            ))}
          </List>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}
