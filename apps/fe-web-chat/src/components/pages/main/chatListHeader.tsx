import React from 'react';
import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'supertokens-auth-react/recipe/session';
import { useQuery } from '@apollo/client';
import { findUserById } from 'apps/fe-web-chat/src/api/users/queries';
import NewChat from './newChat';

interface Props {
  userId: string;
  setActiveChat: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatListHeader({ userId, setActiveChat }: Props) {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(findUserById, {
    variables: { user_id: userId },
  });

  function handleProfile() {}

  async function handleLogout() {
    await signOut();
    navigate('/auth');
  }

  return (
    <div className="flex items-center justify-between bg-secondary h-[70px] pl-5 pr-5 box-border">
      <div className="flex items-center gap-2">
        <Avatar
          src={data?.findUserById.imageUrl}
          onClick={handleProfile}
          className="cursor-pointer rounded-full"
          alt="avatar"
          width="50px"
          height="50px"
        />
        <Typography variant="h6" color="white">
          {data?.findUserById.firstName} {data?.findUserById.lastName}
        </Typography>
      </div>

      <div className="flex gap-4">
        <IconButton className="rounded-full" onClick={handleLogout}>
          <PlusCircleIcon className="h-6 w-6" color="lightGray" />
        </IconButton>

        <NewChat setActiveChat={setActiveChat} />
      </div>
    </div>
  );
}
