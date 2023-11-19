import { Typography } from '@material-tailwind/react';
import React from 'react';

interface Props {}

export default function MessageItem({}: Props) {
  return (
    <div className="flex justify-end">
      <div className="flex gap-1 bg-green-700 w-min pl-2 pr-2 pb-1 pt-1 box-border rounded-md">
        <Typography variant="h6" color="white">
          Hello
        </Typography>
        <Typography
          color="white"
          variant="small"
          className="font-normal text-gray-200 mt-4 text-xs"
        >
          22:45
        </Typography>
      </div>
    </div>
  );
}
