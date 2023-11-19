import React, { useState } from 'react';
import ChatHeader from './chatHeader';
import MessageItem from '../../atoms/messageItem';
import { Input } from '@material-tailwind/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Props {}

export default function Chat({}: Props) {
  const [input, setInput] = useState<string>('');

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
      <ChatHeader />;
      <div className="flex flex-col gap-2 flex-1 justify-end p-7 box-border">
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
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
