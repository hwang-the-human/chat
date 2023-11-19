import React, { useState } from 'react';
import { TValidationForm, isValid } from '../../../helper/validation';
import TextField from '../../atoms/textField';
import Button from '../../atoms/button';
import { useNavigate } from 'react-router-dom';

interface FLogin {
  phoneNumber: TValidationForm<string>;
  password: TValidationForm<string>;
}

interface Props {}

export default function login({}: Props) {
  const initialValues: FLogin = {
    phoneNumber: { value: '', required: true },
    password: { value: '', required: true },
  };

  const [values, setValues] = useState<FLogin>(initialValues);
  const navigate = useNavigate();

  function handleLogin() {
    if (!isValid(values, setValues)) return;

    navigate('/');
  }

  function handleNavigate() {
    navigate('/register');
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-5 box-border p-7 rounded-lg border border-gray-400 w-1/3 bg-secondary">
        <TextField
          label={'Phone number'}
          value={values.phoneNumber}
          setValues={setValues}
          path={'phoneNumber'}
        />

        <TextField
          label={'Password'}
          value={values.password}
          setValues={setValues}
          path={'password'}
          type={'password'}
        />

        <div className="flex flex-col items-center text-xs">
          <p className="text-gray-400">Don't have an account yet?</p>
          <p
            className="cursor-pointer text-sky-500 underline"
            onClick={handleNavigate}
          >
            Create an account
          </p>
        </div>
        <Button label={'Login'} onClick={handleLogin} />
      </div>
    </div>
  );
}
