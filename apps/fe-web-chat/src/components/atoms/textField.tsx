import React, { useMemo } from 'react';
import { Input } from '@material-tailwind/react';
import { TValidationForm } from '../../helper/validation';

interface Props {
  label: string;
  value: TValidationForm<string>;
  path: string;
  setValues: React.Dispatch<React.SetStateAction<any>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({
  label,
  path,
  value,
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
        label={label}
        onChange={handleOnChange}
        size="lg"
        error={value?.error_message ? true : false}
        required={value.required}
      />
    ),
    [value]
  );

  return render;
}
