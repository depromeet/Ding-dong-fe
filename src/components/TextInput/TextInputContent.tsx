'use client';
import { forwardRef, InputHTMLAttributes } from 'react';

import { ClassNameType } from '@/types/util';
import { tw } from '@/utils/tailwind.util';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputClassName?: ClassNameType;
};

// eslint-disable-next-line react/display-name
export const TextInputContent = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      inputClassName,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
      type = 'text',
      disabled,
      ...rest
    },
    ref,
  ) => {
    const disabledCss = disabled && 'cursor-not-allowed';
    return (
      <input
        id={`text-input-${name}`}
        ref={ref}
        type={type}
        className={tw('w-full bg-inherit', disabledCss, inputClassName)}
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
