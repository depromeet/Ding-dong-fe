/* eslint-disable react/prop-types */
'use client';
import { forwardRef, memo, TextareaHTMLAttributes } from 'react';

import { tw } from '@/utils/tailwind.util';

type TextAreaContentProps = TextareaHTMLAttributes<HTMLTextAreaElement> & object;

export const TextAreaContent = memo(
  forwardRef<HTMLTextAreaElement, TextAreaContentProps>(
    ({ name, placeholder, value, onChange, onBlur, disabled, ...rest }, ref) => {
      const disabledCss = disabled && 'cursor-not-allowed';
      return (
        <textarea
          id={`text-area-${name}`}
          ref={ref}
          className={tw('mt-8pxr w-full bg-inherit', disabledCss)}
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
  ),
);
