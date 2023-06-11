/* eslint-disable react/prop-types */
'use client';
import {
  ChangeEvent,
  forwardRef,
  memo,
  TextareaHTMLAttributes,
  useCallback,
  useState,
} from 'react';

import { ClassNameType } from '@/types/util';
import { tw } from '@/utils/tailwind.util';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  labelClassName?: ClassNameType;
  inputClassName?: ClassNameType;
  errorMessage?: string;
  infoMessage?: string;
  value?: string; // Text Input이기 때문에 타입을 한정하였습니다. (기본 InputHTMLAttributes의 value 타입: string | number | readonly string[] | undefined)
};

export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
        disabled,
        maxLength,
        children,
        ...rest
      },
      ref,
    ) => {
      const [textCount, setTextCount] = useState(0);

      const onChangeHandler = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
          onChange && onChange(e);
          e.target.value = e.target.value.slice(0, maxLength);
          setTextCount(e.target.value.length);
        },
        [maxLength, onChange],
      );

      const requiredPseudoCss =
        required &&
        'after:content-[" "] after:inline-block after:w-[4px] after:h-[4px] after:rounded-full after:bg-[#FF5555] after:absolute after:top-0 after:right-[-10px] ';
      const errorCss =
        errorMessage && 'border-[1px] border-error focus-within:border-error caret-error';
      const infoCss =
        infoMessage && 'border-[1px] border-blue-500 focus-within:border-blue-500 caret-blue-500';
      const disabledCss = disabled && 'cursor-not-allowed';

      const isMaxInputLengthProvided = !!maxLength;

      return (
        <div className="flex w-full flex-col">
          {label && (
            <label
              className={tw(
                'font-b2 relative mb-8pxr w-fit text-grey-500',
                labelClassName,
                requiredPseudoCss,
              )}
              htmlFor={`text-area-${name}`}
            >
              {label}
            </label>
          )}
          <div
            className={tw(
              'text-grey-90 mt-2pxr flex w-full flex-col rounded-[6px] border-[0.5px] border-solid border-grey-100 bg-grey-50 px-12pxr py-14pxr text-b1',
              'focus-within:border-[1px] focus-within:border-primary-500 focus-within:caret-primary-500',
              infoCss,
              errorCss,
              disabledCss,
              inputClassName,
            )}
          >
            <textarea
              id={`text-area-${name}`}
              ref={ref}
              className="mt-8pxr w-full bg-inherit"
              placeholder={placeholder}
              value={value}
              onChange={onChangeHandler}
              onBlur={onBlur}
              disabled={disabled}
              autoComplete="off"
              {...rest}
            />
          </div>
          <div className="mt-8pxr flex justify-between">
            <div className="">
              {errorMessage && <p className="text-detail text-error">{errorMessage}</p>}
              {infoMessage && <p className="text-detail text-blue-500">{infoMessage}</p>}
            </div>
            {isMaxInputLengthProvided && (
              <div className="flex justify-end gap-1pxr text-detail text-grey-500">
                <span>{textCount}</span>
                <span>/</span>
                <span>{maxLength}</span>
              </div>
            )}
          </div>
        </div>
      );
    },
  ),
);
