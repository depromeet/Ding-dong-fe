'use client';
import { PropsWithChildren } from 'react';

export const TextAreaWrapper = ({ children }: PropsWithChildren) => {
  return <div className="flex w-full flex-col">{children}</div>;
};
