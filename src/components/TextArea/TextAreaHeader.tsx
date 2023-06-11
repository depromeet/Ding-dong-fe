'use client';

import { PropsWithChildren } from 'react';

import { tw } from '@/utils/tailwind.util';

type TextAreaHeaderProps = {
  className?: string;
};

export const TextAreaHeader = ({ className, children }: PropsWithChildren<TextAreaHeaderProps>) => {
  return <h3 className={tw('pb-10pxr text-h5 text-grey-900', className)}>{children}</h3>;
};
