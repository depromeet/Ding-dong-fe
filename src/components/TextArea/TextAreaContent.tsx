'use client';
import { forwardRef, TextareaHTMLAttributes } from 'react';

import { useAutoHeightTextArea } from '~/components/TextArea/useAutoHeightTextArea';
import { useForwardRef } from '~/hooks/useForwardRef.hooks';
import { tw } from '~/utils/tailwind.util';

type TextAreaContentProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isAutoSize?: boolean;
};

// eslint-disable-next-line react/display-name
export const TextAreaContent = forwardRef<HTMLTextAreaElement, TextAreaContentProps>(
  ({ name, placeholder, value, onChange, onBlur, disabled, isAutoSize = false, ...rest }, ref) => {
    const disabledCss = disabled && 'cursor-not-allowed';
    const textAreaRef = useForwardRef<HTMLTextAreaElement>(ref);

    useAutoHeightTextArea({
      isAutoSize,
      value,
      ref: textAreaRef,
    });

    return (
      <textarea
        id={`text-area-${name}`}
        name={name}
        ref={textAreaRef}
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
