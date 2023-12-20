import React, { useMemo } from 'react';
import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@apollo/client';
import { findMyMessages } from 'apps/fe-web-chat/src/api/messages/queries';
import { findUserById } from 'apps/fe-web-chat/src/api/users/queries';

interface Props {
  activeChat: string;
}

export default function ChatHeader({ activeChat }: Props) {
  const { loading, error, data } = useQuery(findUserById, {
    variables: { user_id: activeChat },
  });

  function handleProfile() {}

  return (
    <div className="flex items-center justify-between bg-secondary h-[70px] pl-5 pr-5">
      <div className="flex items-center gap-2">
        {activeChat && (
          <Avatar
            src={data?.findUserById.imageUrl}
            onClick={handleProfile}
            className="cursor-pointer rounded-full"
            alt="avatar"
            width="50px"
            height="50px"
          />
        )}
        <Typography variant="h6" color="white">
          {data?.findUserById.firstName} {data?.findUserById.lastName}
        </Typography>
      </div>
    </div>
  );
}
