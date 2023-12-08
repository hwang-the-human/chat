import React, { useMemo } from 'react';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from '@material-tailwind/react';
import { FindUsersChatsQuery } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';
import { findUserChatMessages } from '../../api/chat-messages/queries';
import dayjs from 'dayjs';

interface Props {
  chat: FindUsersChatsQuery['findUserChats']['items'][number];
  activeChat: number;
  setActiveChat: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChatItem({ chat, activeChat, setActiveChat }: Props) {
  const { loading, error, data } = useQuery(findUserChatMessages, {
    variables: { senderId: 1 },
  });

  const message = useMemo(() => {
    if (loading) return;
    return data?.findUserChatMessages?.items
      ?.filter(
        (a) =>
          a.sender.id === chat.sender.id && a.receiver.id === chat.receiver.id
      )
      ?.at(-1);
  }, [data?.findUserChatMessages?.items]);

  function handleSelectChat() {
    setActiveChat(message?.receiver?.id || -1);
  }

  return (
    <ListItem
      className={`flex justify-between p-2 box-border ${
        chat.receiver.id === activeChat ? 'bg-gray-700' : ''
      }`}
      onClick={handleSelectChat}
    >
      <div className="flex">
        {/* <ListItemPrefix>
          <Avatar
            variant="circular"
            alt="candice"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
          />
        </ListItemPrefix> */}
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
