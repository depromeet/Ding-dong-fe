import { ForwardedRef, useEffect, useRef } from 'react';

/**
 * forwardRef의 ref를 사용하기 위한 custom hooks
 * https://github.com/facebook/react/issues/24722
 */
export const useForwardRef = <T>(ref: ForwardedRef<T>, initialValue: any = null) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};
