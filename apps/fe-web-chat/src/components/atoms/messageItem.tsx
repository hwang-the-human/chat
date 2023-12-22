import { Typography } from '@material-tailwind/react';
import { FindMyMessagesQuery } from '../../graphql/graphql';
import dayjs from 'dayjs';
import { ClockIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/outline';

interface Props {
  message: FindMyMessagesQuery['findMyMessages']['items'][number];
  receiverId: string;
}

export default function MessageItem({ message, receiverId }: Props) {
  return (
    <div
      className={`flex px-4 py-1 box-border ${
        message.receiver.user_id === receiverId
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      <div
        className={`flex gap-1 ${
          message.receiver.user_id === receiverId
            ? 'bg-green-700'
            : 'bg-gray-700'
        } pl-2 pr-2 pb-1 pt-1 box-border rounded-md`}
      >
        <Typography variant="h6" color="white">
          {message.content}
        </Typography>
        {message.id ? (
          <CheckIcon className="h-4 w-4 text-gray-200 mt-4" />
        ) : (
          <ClockIcon className="h-4 w-4 text-gray-200 mt-4" />
        )}
      </div>
    </div>
  );
}
