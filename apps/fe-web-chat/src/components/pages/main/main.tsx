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
  const [activeChat, setActiveChat] = useState<number>(-1);
  const sessionContext = useSessionContext();

  async function getUser() {
    // const response = await axios.get(
    //   'https://www.googleapis.com/oauth2/v3/userinfo',
    //   {
    //     headers: {
    //       Authorization: `Bearer a035079a-856a-4628-8e3f-dc5464c17158`,
    //     },
    //   }
    // );
    // console.log(response);
  }

  React.useEffect(() => {
    getUser();
  }, []);

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

  const navigate = useNavigate();
  async function logoutClicked() {
    await signOut();
    navigate('/auth');
  }

  return (
    <div className="flex h-screen">
      <div onClick={logoutClicked}>SIGN OUT</div>
      {/* <ChatList activeChat={activeChat} setActiveChat={setActiveChat} />
      <Chat activeChat={activeChat} /> */}
    </div>
  );
}
