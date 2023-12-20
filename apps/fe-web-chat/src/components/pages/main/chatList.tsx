import React from 'react';
import ChatListHeader from './chatListHeader';
import { Input, List, Spinner } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ChatItem from '../../atoms/chatItem';
import { useQuery } from '@apollo/client';
import { findMyChats } from 'apps/fe-web-chat/src/api/chats/queries';

interface Props {
  userId: string;
  activeChat: string;
  setActiveChat: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatList({ activeChat, setActiveChat, userId }: Props) {
  const { loading, error, data } = useQuery(findMyChats, {
    variables: { senderId: userId },
  });

  return (
    <div className="flex flex-col flex-1 h-full border-r border-r-gray-600 overflow-hidden">
      <ChatListHeader userId={userId} setActiveChat={setActiveChat} />

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
            {data?.findMyChats?.items?.map((chat, i) => (
              <ChatItem
                chat={chat}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
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
