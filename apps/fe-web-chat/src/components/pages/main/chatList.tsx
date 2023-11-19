import React from 'react';
import ChatListHeader from './chatListHeader';
import { Input, List } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ChatItem from '../../atoms/chatItem';

interface Props {}

export default function ChatList({}: Props) {
  return (
    <div className="flex flex-col flex-1 h-full border-r border-r-gray-600 overflow-hidden">
      <ChatListHeader />

      <div className="p-4">
        <Input
          className="text-white border-gray-400 border-t-gray-300"
          color={'white'}
          icon={<MagnifyingGlassIcon className="h-5 w-5" color="grey" />}
          label="Search"
        />
      </div>

      <List className="overflow-auto h-full">
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
