import React, { useEffect, useState } from 'react';
import ChatItem from '../../atoms/chatItem';
import ChatList from './chatList';
import Chat from './chat';

interface Props {}

export default function Main({}: Props) {
  const [activeChat, setActiveChat] = useState<number>(-1);
  // get all chats
  // get all messages
  // reconstruct the object

  return (
    <div className="flex h-screen">
      <ChatList activeChat={activeChat} setActiveChat={setActiveChat} />
      <Chat activeChat={activeChat} />
    </div>
  );
}
