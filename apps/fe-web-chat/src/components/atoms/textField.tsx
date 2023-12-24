import React, { HTMLInputTypeAttribute, useMemo } from 'react';
import { Input } from '@material-tailwind/react';
import { TValidationForm } from '../../helper/validation';

interface Props {
  label: string;
  value: TValidationForm<string>;
  path: string;
  type?: HTMLInputTypeAttribute;
  setValues: React.Dispatch<React.SetStateAction<any>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({
  label,
  path,
  value,
  type,
  setValues,
  onChange,
}: Props) {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) return onChange(e);

    setValues((prev: any) => ({
      ...prev,
      [path]: {
        ...prev[path],
        value: e.target.value,
      },
    }));
  }

  const render = useMemo(
    () => (
      <Input
        className="text-white border-gray-400 border-t-gray-300 w-full"
        color={'white'}
        label={label}
        onChange={handleOnChange}
        error={value?.error_message ? true : false}
        required={value.required}
        type={type}
      />
    ),
    [value]
  );

  return render;
}
