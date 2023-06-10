import { forwardRef, InputHTMLAttributes, memo } from 'react';

import { ClassNameType } from '@/types/util';
import { tw } from '@/utils/tailwind.util';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  labelClassName?: ClassNameType;
  errorMessage?: string;
  infoMessage?: string;
};

export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(
    (
      {
        label,
        labelClassName,
        required = false,
        id,
        placeholder,
        value,
        onChange,
        onBlur,
        errorMessage,
        infoMessage,
        type = 'text',
        disabled,
        ...rest
      },
      ref,
    ) => {
      const requiredPseudoCss =
        required &&
        'after:content-[" "] after:inline-block after:w-[4px] after:h-[4px] after:rounded-full after:bg-[#FF5555] after:absolute after:top-0 after:right-[-10px] ';
      const errorCss = errorMessage && 'border-[1px] border-error focus:border-error caret-error';
      const infoCss =
        infoMessage && 'border-[1px] border-blue-500 focus:border-blue-500 caret-blue-500';
      const disabledCss = disabled && 'cursor-not-allowed';

      return (
        <div className="flex w-full flex-col p-2">
          <label
            className={tw(
              'font-b2 relative mb-8pxr w-fit text-grey-500',
              labelClassName,
              requiredPseudoCss,
            )}
            htmlFor={id}
          >
            {label}
          </label>
          <div className="flex items-center">
            <input
              id={id}
              ref={ref}
              type={type}
              className={tw(
                'mt-2px text-grey-90 w-full rounded-[6px] border-[0.5px] border-solid border-grey-100 bg-grey-50 px-12pxr py-14pxr text-b1',
                'focus:border-[1px] focus:border-primary-500 focus:caret-primary-500',
                errorCss,
                infoCss,
                disabledCss,
              )}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              autoComplete="off"
              {...rest}
            />
          </div>
          {errorMessage && <p className="mt-8pxr text-detail text-error">{errorMessage}</p>}
          {infoMessage && <p className="mt-8pxr text-detail text-blue-500">{infoMessage}</p>}
        </div>
      );
    },
  ),
);
