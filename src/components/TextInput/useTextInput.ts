'use client';
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

export type UseTextInputProps = {
  initValue?: string;
  onChange: ChangeEventHandler;
  maxLength?: number;
};

export const useTextInput = ({ initValue = '', onChange, maxLength }: UseTextInputProps) => {
  const [value, setValue] = useState(initValue);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value.slice(0, maxLength);
      onChange(e);
      setValue(e.target.value);
    },
    [maxLength, onChange],
  );

  return { value, onChangeHandler };
};
