import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

export type UseTextAreaProps = {
  onChange: ChangeEventHandler;
  maxLength?: number;
};

export const useTextArea = ({ onChange, maxLength }: UseTextAreaProps) => {
  const [textCount, setTextCount] = useState(0);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange && onChange(e);
      e.target.value = e.target.value.slice(0, maxLength);
      setTextCount(e.target.value.length);
    },
    [maxLength, onChange],
  );

  return { textCount, onChangeHandler };
};
