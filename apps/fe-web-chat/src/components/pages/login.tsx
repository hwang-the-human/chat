import React from 'react';
import { Input } from '@material-tailwind/react';

interface Props {}

export default function login({}: Props) {
  return (
    <div className={'bg-indigo-500 p-2 font-mono'}>
      <div className={'bg-indigo-500 p-2 font-mono'}>Hello</div>
      <Input label="Username" />
      <Input label="Username" size="lg" />
    </div>
  );
}
