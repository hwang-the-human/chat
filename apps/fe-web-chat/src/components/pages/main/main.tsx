import React, { useEffect, useState } from 'react';
import ChatItem from '../../atoms/chatItem';
import ChatList from './chatList';
import Chat from './chat';
import { socket } from 'apps/fe-web-chat/src/api/socket/socket';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'supertokens-auth-react/recipe/session';

interface Props {}

export default function Main({}: Props) {
  const [activeChat, setActiveChat] = useState<string>('');
  const sessionContext = useSessionContext();

  if (sessionContext.loading === true) {
    return null;
  }

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
      <ChatList
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        userId={sessionContext.userId}
      />
      <Chat activeChat={activeChat} userId={sessionContext.userId} />
    </div>
  );
}
