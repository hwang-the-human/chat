import React, { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  List,
  IconButton,
  Input,
} from '@material-tailwind/react';
import { useQuery } from '@apollo/client';
import { findUsers } from 'apps/fe-web-chat/src/api/users/queries';
import UserItem from '../../atoms/userItem';

interface Props {
  setActiveChat: React.Dispatch<React.SetStateAction<string>>;
}

export default function newChat({ setActiveChat }: Props) {
  const [input, setInput] = useState<string>('');
  const [open, setOpen] = useState<false | undefined>(undefined);

  const { loading, error, data } = useQuery(findUsers, {
    variables: { options: { page: 0, limit: 10 } },
  });

  function handleSearch() {}

  function handleSelectUser(user_id: string) {
    setActiveChat(user_id);
    setOpen(false);
  }

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <Popover open={open} placement="bottom-end">
      <PopoverHandler>
        <div className="flex gap-6">
          <IconButton
            className="rounded-full"
            onClick={() => setOpen(undefined)}
          >
            <PlusCircleIcon className="h-6 w-6" color="lightGray" />
          </IconButton>
        </div>
      </PopoverHandler>
      <PopoverContent className="flex w-72 bg-secondary h-80 overflow-hidden flex-col">
        <div className="flex items-center gap-4 border-b pb-4">
          <Input
            type="text"
            placeholder="Search"
            color="white"
            autoFocus
            value={input}
            onChange={onChangeInput}
            className="bg-tertiary p-2 border-transparent focus:border-transparent focus:ring-0 text-white"
            onKeyDown={handleSearch}
            labelProps={{
              className: 'hidden',
            }}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {!loading && data ? (
            <List className="px-0">
              {data?.findUsers.items.map((user, i) => (
                <UserItem
                  user={user}
                  handleSelectUser={handleSelectUser}
                  key={i}
                />
              ))}
            </List>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
