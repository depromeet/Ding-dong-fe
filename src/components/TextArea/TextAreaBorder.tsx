'use client';
import { PropsWithChildren } from 'react';

import { tw } from '~/utils/tailwind.util';

type TextAreaBorderProps = {
  errorMessage?: string;
  infoMessage?: string;
  textCount?: number;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
};

export const TextAreaBorder = ({
  errorMessage,
  infoMessage,
  disabled,
  textCount,
  maxLength,
  children,
  className,
}: PropsWithChildren<TextAreaBorderProps>) => {
  const errorCss =
    errorMessage && 'border-[1px] border-error focus-within:border-error caret-error';
  const infoCss =
    infoMessage && 'border-[1px] border-blue-500 focus-within:border-blue-500 caret-blue-500';
  const disabledCss = disabled && 'cursor-not-allowed';
  return (
    <>
      <div
        className={tw(
          'text-grey-90 mt-2pxr flex h-fit w-full flex-col rounded-[6px] border-[0.5px] border-solid border-grey-100 bg-grey-50 px-12pxr py-14pxr text-b1',
          'focus-within:border-[1px] focus-within:border-primary-500 focus-within:caret-primary-500',
          infoCss,
          errorCss,
          disabledCss,
          className,
        )}
      >
        {children}
      </div>
      <div className="mt-8pxr flex justify-between">
        <div>
          {errorMessage && <p className="text-detail text-error">{errorMessage}</p>}
          {infoMessage && <p className="text-detail text-blue-500">{infoMessage}</p>}
        </div>
        {maxLength && (
          <div className="flex justify-end gap-1pxr text-detail text-grey-500">
            <span>{textCount}</span>
            <span>/</span>
            <span>{maxLength}</span>
          </div>
        )}
      </div>
    </>
  );
};
