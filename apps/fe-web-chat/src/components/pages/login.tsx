import React from 'react';
import { Input } from '@material-tailwind/react';

interface Props {}

export default function login({}: Props) {
  return (
    <div>
      <Input label="Username" />
      <Input label="Username" size="lg" />
    </div>
  );
}
