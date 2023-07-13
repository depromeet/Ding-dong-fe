import { RefObject, useEffect } from 'react';

type UseAutoHeightTextAreaProps = {
  isAutoSize: boolean;
  ref: RefObject<HTMLTextAreaElement> | null;
  value: string | number | readonly string[] | undefined;
};

export const useAutoHeightTextArea = ({ isAutoSize, ref, value }: UseAutoHeightTextAreaProps) => {
  useEffect(() => {
    if (isAutoSize && ref && ref.current) {
      ref.current.style.height = '0px';
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = scrollHeight + 'px';
    }
  }, [ref, isAutoSize, value]);
};
