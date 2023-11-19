import React, { useState } from 'react';
import { TValidationForm, isValid } from '../../../helper/validation';
import TextField from '../../atoms/textField';
import Button from '../../atoms/button';
import { useNavigate } from 'react-router-dom';

interface FLogin {
  phoneNumber: TValidationForm<string>;
  firstName: TValidationForm<string>;
  lastName: TValidationForm<string>;
  password: TValidationForm<string>;
}

interface Props {}

export default function registration({}: Props) {
  const initialValues: FLogin = {
    phoneNumber: { value: '', required: true },
    firstName: { value: '', required: true },
    lastName: { value: '', required: true },
    password: { value: '', required: true },
  };

  const [values, setValues] = useState<FLogin>(initialValues);
  const navigate = useNavigate();

  function handleLogin() {
    if (!isValid(values, setValues)) return;

    navigate('/');
  }

  function handleNavigate() {
    navigate('/login');
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
          label={'First name'}
          value={values.firstName}
          setValues={setValues}
          path={'firstName'}
        />

        <TextField
          label={'Last name'}
          value={values.lastName}
          setValues={setValues}
          path={'lastName'}
        />

        <TextField
          label={'Password'}
          value={values.password}
          setValues={setValues}
          path={'password'}
        />

        <div className="flex flex-col items-center text-xs">
          <p className="text-gray-400">Already have an account yet?</p>
          <p
            className="cursor-pointer text-sky-500 underline"
            onClick={handleNavigate}
          >
            Login
          </p>
        </div>
        <Button label={'Register'} onClick={handleLogin} />
      </div>
    </div>
  );
}
