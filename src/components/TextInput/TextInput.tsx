'use client';
import { ChangeEvent, forwardRef, InputHTMLAttributes, memo, useCallback, useState } from 'react';

import { ClassNameType } from '@/types/util';
import { tw } from '@/utils/tailwind.util';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  labelClassName?: ClassNameType;
  inputClassName?: ClassNameType;
  errorMessage?: string;
  infoMessage?: string;
  value?: string; // Text Input이기 때문에 타입을 한정하였습니다. (기본 InputHTMLAttributes의 value 타입: string | number | readonly string[] | undefined)
};

export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(
    (
      {
        label,
        labelClassName,
        inputClassName,
        required,
        name,
        placeholder,
        value,
        onChange,
        onBlur,
        errorMessage,
        infoMessage,
        type = 'text',
        disabled,
        maxLength,
        ...rest
      },
      ref,
    ) => {
      const [textCount, setTextCount] = useState(0);

      const onChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
          onChange && onChange(e);
          e.target.value = e.target.value.slice(0, maxLength);
          setTextCount(e.target.value.length);
        },
        [maxLength, onChange],
      );

      const requiredPseudoCss =
        required &&
        'after:content-[" "] after:inline-block after:w-[4px] after:h-[4px] after:rounded-full after:bg-[#FF5555] after:absolute after:top-0 after:right-[-10px] ';
      const errorCss = errorMessage && 'border-[1px] border-error focus:border-error caret-error';
      const infoCss =
        infoMessage && 'border-[1px] border-blue-500 focus:border-blue-500 caret-blue-500';
      const disabledCss = disabled && 'cursor-not-allowed';

      const isMaxInputLengthProvided = !!maxLength;

      return (
        <div className="flex w-full flex-col">
          <label
            className={tw(
              'font-b2 relative mb-8pxr w-fit text-grey-500',
              labelClassName,
              requiredPseudoCss,
            )}
            htmlFor={`text-input-${name}`}
          >
            {label}
          </label>
          <div className="flex flex-col items-center">
            <input
              id={`text-input-${name}`}
              ref={ref}
              type={type}
              className={tw(
                'text-grey-90 mt-2pxr w-full rounded-[6px] border-[0.5px] border-solid border-grey-100 bg-grey-50 px-12pxr py-14pxr text-b1',
                'focus:border-[1px] focus:border-primary-500 focus:caret-primary-500',
                errorCss,
                infoCss,
                disabledCss,
                inputClassName,
              )}
              placeholder={placeholder}
              value={value}
              onChange={onChangeHandler}
              onBlur={onBlur}
              disabled={disabled}
              autoComplete="off"
              {...rest}
            />
            {isMaxInputLengthProvided && (
              <div className="mt-8pxr flex w-full justify-end gap-1pxr text-detail text-grey-500">
                <span>{textCount}</span>
                <span>/</span>
                <span>{maxLength}</span>
              </div>
            )}
          </div>
          {errorMessage && <p className="mt-8pxr text-detail text-error">{errorMessage}</p>}
          {infoMessage && <p className="mt-8pxr text-detail text-blue-500">{infoMessage}</p>}
        </div>
      );
    },
  ),
);
