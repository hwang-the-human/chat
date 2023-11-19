import React from 'react';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from '@material-tailwind/react';

interface Props {}

export default function ChatItem({}: Props) {
  return (
    <ListItem className="flex justify-between">
      <div className="flex">
        <ListItemPrefix>
          <Avatar
            variant="circular"
            alt="candice"
            src="https://docs.material-tailwind.com/img/face-1.jpg"
          />
        </ListItemPrefix>
        <div>
          <Typography variant="h6" color="white">
            Tania Andrew
          </Typography>
          <Typography variant="small" className="font-normal text-gray-400">
            Software Engineer @ Material Tailwind
          </Typography>
        </div>
      </div>
      <Typography variant="small" className="font-normal text-gray-400">
        07/11/2023
      </Typography>
    </ListItem>
  );
}
