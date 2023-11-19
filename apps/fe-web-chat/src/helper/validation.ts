import dayjs from 'dayjs';

type TErrorType = 'phone' | 'iin' | 'email' | 'numbers' | 'date';

export type TValidationForm<T> = {
  value: T;
  required?: boolean;
  error_message?: string;
  error_type?: TErrorType;
  max?: number;
  min?: number;
  time?: number;
};

type IConfig = {
  exception?: string[];
  inclusion?: string[];
};

export function isValid(
  state: any,
  setState: React.Dispatch<React.SetStateAction<any>>,
  config?: IConfig
) {
  let valid = true;
  let clonedState = structuredClone(state);

  for (let key in state) {
    const e: TValidationForm<any> = state[key];
    if (
      !e?.required ||
      (config?.exception && config.exception.includes(key)) ||
      (config?.inclusion && !config.inclusion.includes(key))
    ) {
      // clonedState[key]['error_message'] = '';
      continue;
    }

    const value = e.value ?? '';
    switch (true) {
      case value.length < 1:
        clonedState[key]['error_message'] = 'Обязательное поле';
        valid = false;
        break;
      case e.min && value.length < e.min:
        clonedState[key]['error_message'] = `Минимальная длина ${e.min}`;
        valid = false;
        break;
      case e.max && value.length > e.max:
        clonedState[key]['error_message'] = `Максимальная длина ${e.max}`;
        valid = false;
        break;
      case e.error_type === 'email' &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value as string):
        clonedState[key]['error_message'] = 'Неверный формат почты';
        valid = false;
        break;
      case e.error_type === 'phone' && value.length < 11:
        clonedState[key]['error_message'] = 'Неверный формат телефона';
        valid = false;
        break;
      case e.error_type === 'iin' && value.length < 12:
        // &&
        // !/^\d+$/.test(value as string)
        clonedState[key]['error_message'] = 'Неверный формат ИИН';
        valid = false;
        break;
      case e.error_type === 'numbers' && !/^\d+$/.test(value as string):
        clonedState[key]['error_message'] = 'Неверный формат цифр';
        valid = false;
        break;
      case e.error_type === 'date' &&
        dayjs(value as string).format('DD/MM/YYYY').length !== 10:
        clonedState[key]['error_message'] = 'Неверный формат даты';
        valid = false;
        break;
      default:
        clonedState[key]['error_message'] = '';
        break;
    }
  }
  setState(clonedState);
  return valid;
}
