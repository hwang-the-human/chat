import React, { useMemo } from 'react';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from '@material-tailwind/react';
import { FindMyChatsQuery } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';
import { findMyMessages } from '../../api/messages/queries';
import dayjs from 'dayjs';
import { ClockIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/outline';

interface Props {
  chat: FindMyChatsQuery['findMyChats']['items'][number];
  receiverId: string;
  setReceiverId: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatItem({ chat, receiverId, setReceiverId }: Props) {
  const { loading, error, data } = useQuery(findMyMessages, {
    notifyOnNetworkStatusChange: true,
    variables: {
      senderId: chat.sender.user_id,
      receiverId: chat.receiver.user_id,
    },
  });

  const message = useMemo(() => {
    if (loading) return;
    return data?.findMyMessages.items.at(-1);
  }, [data]);

  function handleSelectChat() {
    setReceiverId(chat.receiver.user_id);
  }

  return (
    <ListItem
      className={`flex justify-between p-2 box-border ${
        chat.receiver.user_id === receiverId ? 'bg-gray-700' : ''
      }`}
      onClick={handleSelectChat}
    >
      <div className="flex gap-2 overflow-hidden">
        <ListItemPrefix>
          <Avatar
            src={chat.receiver.imageUrl}
            className="cursor-pointer rounded-full"
            alt="avatar"
            width="50px"
            height="50px"
          />
        </ListItemPrefix>
        <div className="overflow-hidden">
          <Typography variant="h6" color="white">
            {chat.receiver.firstName} {chat.receiver.lastName}
          </Typography>
          {message && (
            <div className="flex flex-row items-center gap-1">
              {message.id ? (
                <CheckIcon className="h-4 w-4 text-gray-200" />
              ) : (
                <ClockIcon className="h-4 w-4 text-gray-200" />
              )}
              <Typography
                variant="small"
                className="font-normal text-gray-400 text-ellipsis overflow-hidden"
              >
                {message.content}
              </Typography>
            </div>
          )}
        </div>
      </div>
      {message && (
        <Typography variant="small" className="font-normal text-gray-400">
          {dayjs(message.createdAt).format('HH:mm')}
        </Typography>
      )}
    </ListItem>
  );
}
