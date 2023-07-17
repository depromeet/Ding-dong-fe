'use client';
import { forwardRef, TextareaHTMLAttributes, useRef } from 'react';

import { useAutoHeightTextArea } from '~/components/TextArea/useAutoHeightTextArea';
import { tw } from '~/utils/tailwind.util';

type TextAreaContentProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isAutoSize?: boolean;
};

// eslint-disable-next-line react/display-name
export const TextAreaContent = forwardRef<HTMLTextAreaElement, TextAreaContentProps>(
  ({ name, placeholder, value, onChange, onBlur, disabled, isAutoSize = false, ...rest }, ref) => {
    const disabledCss = disabled && 'cursor-not-allowed';
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    useAutoHeightTextArea({
      isAutoSize,
      value,
      ref: innerRef,
    });

    return (
      <textarea
        id={`text-area-${name}`}
        name={name}
        ref={e => {
          // rhf's ref is function that type RefCallback
          if (typeof ref === 'function') {
            ref(e);
            innerRef.current = e;
          }
        }}
        className={tw('mt-8pxr w-full resize-none bg-inherit', disabledCss)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete="off"
        {...rest}
      />
    );
  },
);
