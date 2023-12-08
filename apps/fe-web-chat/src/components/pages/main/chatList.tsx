import React from 'react';
import ChatListHeader from './chatListHeader';
import { Input, List, Spinner } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ChatItem from '../../atoms/chatItem';
import { useQuery } from '@apollo/client';
import { findUsersChats } from 'apps/fe-web-chat/src/api/chats/queries';

interface Props {
  activeChat: number;
  setActiveChat: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChatList({ activeChat, setActiveChat }: Props) {
  const { loading, error, data } = useQuery(findUsersChats, {
    variables: { senderId: 1 },
  });

  return (
    <div className="flex flex-col flex-1 h-full border-r border-r-gray-600 overflow-hidden">
      <ChatListHeader />

      <div className="p-4 box-border">
        <Input
          className="bg-tertiary p-2 border-transparent focus:border-transparent focus:ring-0"
          color={'white'}
          // icon={<MagnifyingGlassIcon className="h-5 w-5" color="grey" />}
          placeholder="Search"
          labelProps={{
            className: 'hidden',
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <List>
            {data?.findUserChats?.items?.map((chat, i) => (
              <ChatItem
                chat={chat}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
                key={i}
              />
            ))}
          </List>
        )}
      </div>
    </div>
  );
}
