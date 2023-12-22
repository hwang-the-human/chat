import React, { useEffect, useState } from 'react';
import ChatItem from '../../atoms/chatItem';
import ChatList from './chatList';
import Chat from './chat';
import { socket } from 'apps/fe-web-chat/src/api/socket/socket';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

interface Props {}

export default function Main({}: Props) {
  const [receiverId, setReceiverId] = useState<string>('');
  const sessionContext = useSessionContext();

  if (sessionContext.loading === true) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <ChatList
        receiverId={receiverId}
        setReceiverId={setReceiverId}
        userId={sessionContext.userId}
      />
      <Chat receiverId={receiverId} userId={sessionContext.userId} />
    </div>
  );
}
