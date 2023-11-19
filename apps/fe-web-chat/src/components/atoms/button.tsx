import React from 'react';
import { Button as MButton } from '@material-tailwind/react';

interface Props {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: Props) {
  return (
    <MButton color={'white'} onClick={onClick}>
      {label}
    </MButton>
  );
}
