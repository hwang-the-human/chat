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

interface Props {
  userId: string;
  chat: FindMyChatsQuery['findMyChats']['items'][number];
  activeChat: string;
  setActiveChat: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatItem({
  chat,
  activeChat,
  setActiveChat,
  userId,
}: Props) {
  const { loading, error, data } = useQuery(findMyMessages, {
    variables: { senderId: userId },
  });

  const message = useMemo(() => {
    if (loading) return;
    return data?.findMyMessages?.items
      ?.filter(
        (a) =>
          a.sender.user_id === chat.sender.user_id &&
          a.receiver.user_id === chat.receiver.user_id
      )
      ?.at(-1);
  }, [data?.findMyMessages?.items]);

  function handleSelectChat() {
    setActiveChat(message?.receiver?.user_id || '');
  }

  return (
    <ListItem
      className={`flex justify-between p-2 box-border ${
        chat.receiver.user_id === activeChat ? 'bg-gray-700' : ''
      }`}
      onClick={handleSelectChat}
    >
      <div className="flex">
        <ListItemPrefix>
          <Avatar
            src={chat.receiver.imageUrl}
            className="cursor-pointer rounded-full"
            alt="avatar"
            width="50px"
            height="50px"
          />
        </ListItemPrefix>
        <div>
          <Typography variant="h6" color="white">
            {chat.receiver.firstName} {chat.receiver.lastName}
          </Typography>
          <Typography variant="small" className="font-normal text-gray-400">
            {message && message.content}
          </Typography>
        </div>
      </div>
      <Typography variant="small" className="font-normal text-gray-400">
        {message && dayjs(message.createdAt).format('HH:mm')}
      </Typography>
    </ListItem>
  );
}
