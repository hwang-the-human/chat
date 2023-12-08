import React, { useMemo } from 'react';
import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@apollo/client';
import { findUserChatMessages } from 'apps/fe-web-chat/src/api/chat-messages/queries';

interface Props {
  activeChat: number;
}

export default function ChatHeader({ activeChat }: Props) {
  const { loading, error, data } = useQuery(findUserChatMessages, {
    variables: { senderId: 1 },
  });

  const chat = useMemo(() => {
    if (loading) return;
    return data?.findUserChatMessages?.items?.find(
      (a) => a.sender.id === activeChat || a.receiver.id === activeChat
    );
  }, [data?.findUserChatMessages?.items, activeChat]);

  function handleProfile() {}

  return (
    <div className="flex items-center justify-between bg-secondary h-[70px] pl-5 pr-5">
      <div className="flex items-center gap-3">
        {/* <Avatar
          className="cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
          alt="profile"
          onClick={handleProfile}
        /> */}
        <Typography variant="h6" color="white">
          Tania Andrew
        </Typography>
      </div>

      <div className="flex gap-6">
        {/* <IconButton className="rounded-full">
          <PlusCircleIcon className="h-6 w-6" color="lightGray" />
        </IconButton> */}
      </div>
    </div>
  );
}
