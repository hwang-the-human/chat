import React from 'react';
import { Avatar, IconButton } from '@material-tailwind/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
interface Props {}

export default function ChatListHeader({}: Props) {
  function handleProfile() {}

  return (
    <div className="flex items-center justify-between bg-secondary h-[70px] pl-5 pr-5 box-border">
      <Avatar
        className="cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
        alt="profile"
        onClick={handleProfile}
      />

      <div className="flex gap-6">
        <IconButton className="rounded-full">
          <PlusCircleIcon className="h-6 w-6" color="lightGray" />
        </IconButton>
      </div>
    </div>
  );
}
