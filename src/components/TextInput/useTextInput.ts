'use client';
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

export type UseTextInputProps = {
  initCount?: number;
  onChange: ChangeEventHandler;
  maxLength?: number;
};

export const useTextInput = ({ initCount = 0, onChange, maxLength }: UseTextInputProps) => {
  const [textCount, setTextCount] = useState(initCount);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value.slice(0, maxLength);
      onChange && onChange(e);
      setTextCount(e.target.value.length);
    },
    [maxLength, onChange],
  );

  return { textCount, onChangeHandler };
};
