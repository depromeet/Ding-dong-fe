'use client';
import { PropsWithChildren } from 'react';

import { ClassNameType } from '@/types/util';
import { tw } from '@/utils/tailwind.util';

type TextInputLabelProps = {
  required?: boolean;
  className?: ClassNameType;
};

export const TextInputLabel = ({
  required,
  className,
  children,
}: PropsWithChildren<TextInputLabelProps>) => {
  const requiredPseudoCss =
    required &&
    'after:content-[" "] after:inline-block after:w-[4px] after:h-[4px] after:rounded-full after:bg-[#FF5555] after:absolute after:top-0 after:right-[-10px] ';

  return (
    <label
      className={tw('font-b2 relative mb-8pxr w-fit text-grey-500', className, requiredPseudoCss)}
      htmlFor={`text-input-${name}`}
    >
      {children}
    </label>
  );
};
