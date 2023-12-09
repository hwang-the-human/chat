import React, { useEffect, useState } from 'react';
import ChatItem from '../../atoms/chatItem';
import ChatList from './chatList';
import Chat from './chat';
import { socket } from 'apps/fe-web-chat/src/api/socket/socket';

interface Props {}

export default function Main({}: Props) {
  const [activeChat, setActiveChat] = useState<number>(-1);

  // useEffect(() => {
  //   function onConnect() {
  //     console.log('Client connected!');
  //   }

  //   function onDisconnect() {}

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('foo', onFooEvent);
  //   };
  // }, []);

  return (
    <div className="flex h-screen">
      <ChatList activeChat={activeChat} setActiveChat={setActiveChat} />
      <Chat activeChat={activeChat} />
    </div>
  );
}
