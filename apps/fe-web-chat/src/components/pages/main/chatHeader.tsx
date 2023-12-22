import React, { useMemo } from 'react';
import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@apollo/client';
import { findMyMessages } from 'apps/fe-web-chat/src/api/messages/queries';
import { findUserById } from 'apps/fe-web-chat/src/api/users/queries';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

interface Props {
  receiverId: string;
}

export default function ChatHeader({ receiverId }: Props) {
  const { loading, error, data } = useQuery(findUserById, {
    variables: { user_id: receiverId },
  });

  const disabled = useMemo(() => (receiverId ? false : true), [receiverId]);

  function handleProfile() {}
  function handleOpenSettings() {}

  return (
    <div className="flex items-center justify-between bg-secondary h-[70px] pl-5 pr-5">
      <div className="flex items-center gap-2">
        {!disabled && (
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
      <IconButton
        className="rounded-full"
        onClick={handleOpenSettings}
        disabled={disabled}
      >
        <EllipsisVerticalIcon className="h-6 w-6" color="lightGray" />
      </IconButton>
    </div>
  );
}
