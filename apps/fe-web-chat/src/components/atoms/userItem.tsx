import React, { useMemo } from 'react';
import {
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from '@material-tailwind/react';
import { FindUsersQuery } from '../../graphql/graphql';

interface Props {
  user: FindUsersQuery['findUsers']['items'][number];
  handleSelectUser: (user_id: string) => void;
}

export default function UserItem({ user, handleSelectUser }: Props) {
  return (
    <ListItem
      className={'flex justify-between box-border py-1'}
      onClick={() => handleSelectUser(user.user_id)}
    >
      <div className="flex items-center gap-3">
        <ListItemPrefix>
          <Avatar
            src={user.imageUrl}
            className="cursor-pointer rounded-full"
            alt="avatar"
            width="50px"
            height="50px"
          />
        </ListItemPrefix>
        <Typography variant="h6" color="white">
          {user.firstName} {user.lastName}
        </Typography>
      </div>
    </ListItem>
  );
}
