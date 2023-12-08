import React, { useMemo, useState } from 'react';
import ChatHeader from './chatHeader';
import MessageItem from '../../atoms/messageItem';
import { Input } from '@material-tailwind/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@apollo/client';
import { findUserChatMessages } from 'apps/fe-web-chat/src/api/chat-messages/queries';

interface Props {
  activeChat: number;
}

export default function Chat({ activeChat }: Props) {
  const { loading, error, data } = useQuery(findUserChatMessages, {
    variables: { senderId: 1 },
  });

  const [input, setInput] = useState<string>('');

  console.log(activeChat);

  const messages = useMemo(() => {
    if (loading) return [];
    return data?.findUserChatMessages?.items?.filter(
      (a) => a.sender.id === activeChat || a.receiver.id === activeChat
    );
  }, [data?.findUserChatMessages?.items, activeChat]);

  function handleSendMessage(e: any) {
    if (e.code === 'Enter') {
      console.log('send');
      setInput('');
    }
  }

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="flex flex-col flex-1 h-full border-r border-r-gray-600 overflow-hidden gap-2">
      <ChatHeader activeChat={activeChat} />;
      <div className="flex flex-col gap-2 flex-1 justify-end p-7 box-border">
        {!loading && activeChat !== -1 ? (
          messages?.map((message) => (
            <MessageItem message={message} activeChat={activeChat} />
          ))
        ) : (
          <div className="flex items-center w-full h-full justify-center">
            <h1 className="text-gray-500">Please select or start a new chat</h1>
          </div>
        )}
      </div>
      <div className="flex items-center bg-secondary p-5 box-border gap-4">
        <Input
          type="text"
          placeholder="Type a message"
          color="white"
          autoFocus
          value={input}
          onChange={onChangeInput}
          className="bg-tertiary p-2 border-transparent focus:border-transparent focus:ring-0"
          onKeyDown={handleSendMessage}
          labelProps={{
            className: 'hidden',
          }}
        />
        <PaperAirplaneIcon
          className="h-8 w-8 text-gray-500 cursor-pointer"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
}
