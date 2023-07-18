'use client';
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

export type UseTextAreaProps = {
  initValue?: string;
  onChange: ChangeEventHandler;
  maxLength?: number;
};

export const useTextArea = ({ initValue = '', onChange, maxLength }: UseTextAreaProps) => {
  const [value, setValue] = useState(initValue);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.target.value = e.target.value.slice(0, maxLength);
      onChange(e);
      setValue(e.target.value);
    },
    [maxLength, onChange],
  );

  return { value, onChangeHandler };
};
