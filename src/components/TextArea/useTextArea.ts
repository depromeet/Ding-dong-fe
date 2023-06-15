'use client';
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

export type UseTextAreaProps = {
  initCount?: number;
  onChange: ChangeEventHandler;
  maxLength?: number;
};

export const useTextArea = ({ initCount = 0, onChange, maxLength }: UseTextAreaProps) => {
  const [textCount, setTextCount] = useState(initCount);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.target.value = e.target.value.slice(0, maxLength);
      onChange && onChange(e);
      setTextCount(e.target.value.length);
    },
    [maxLength, onChange],
  );

  return { textCount, onChangeHandler };
};
