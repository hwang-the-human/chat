import React from 'react';
import ChatListHeader from './chatListHeader';
import { Input, List } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ChatItem from '../../atoms/chatItem';
import { useQuery } from '@apollo/client';
import { findAllUsers } from 'apps/fe-web-chat/src/api/users/queries';

interface Props {}

export default function ChatList({}: Props) {
  const { loading, error, data } = useQuery(findAllUsers);

  return (
    <div className="flex flex-col flex-1 h-full border-r border-r-gray-600 overflow-hidden">
      <ChatListHeader />

      <div className="p-4 box-border">
        <Input
          className="bg-tertiary p-2 border-transparent focus:border-transparent focus:ring-0"
          color={'white'}
          icon={<MagnifyingGlassIcon className="h-5 w-5" color="grey" />}
          placeholder="Search"
          labelProps={{
            className: 'hidden',
          }}
        />
      </div>

      <List className="overflow-auto flex-1">
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </List>
    </div>
  );
}
