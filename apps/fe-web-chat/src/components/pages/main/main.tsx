import React from 'react';
import ChatItem from '../../atoms/chatItem';
import ChatList from './chatList';
import Chat from './chat';

interface Props {}

export default function Main({}: Props) {
  return (
    <div className="flex h-screen">
      <ChatList />
      <Chat />
    </div>
  );
}
