'use client';
import { ReactNode } from 'react';

import { tw } from '~/utils/tailwind.util';

type TextAreaWrapperProps = {
  children: ReactNode;
  className?: string;
};

export const TextAreaWrapper = ({ children, className }: TextAreaWrapperProps) => {
  return <div className={tw('flex w-full flex-col', className)}>{children}</div>;
};
