import { Typography } from '@material-tailwind/react';
import React from 'react';
import { FindMyMessagesQuery } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';
import { findMyMessages } from '../../api/messages/queries';
import dayjs from 'dayjs';

interface Props {
  message: FindMyMessagesQuery['findMyMessages']['items'][number];
  activeChat: string;
}

export default function MessageItem({ message, activeChat }: Props) {
  return (
    <div
      className={`flex max-w-full ${
        message.receiver.user_id === activeChat
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      <div
        className={`flex gap-1 ${
          message.receiver.user_id === activeChat
            ? 'bg-green-700'
            : 'bg-gray-700'
        } pl-2 pr-2 pb-1 pt-1 box-border rounded-md`}
      >
        <Typography variant="h6" color="white">
          {message.content}
        </Typography>
        <Typography
          color="white"
          variant="small"
          className="font-normal text-gray-200 mt-4 text-xs"
        >
          {dayjs(message.createdAt).format('HH:mm')}
        </Typography>
      </div>
    </div>
  );
}
