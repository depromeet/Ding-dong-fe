'use client';
import { PropsWithChildren } from 'react';

export const TopNavigationRight = ({ children }: PropsWithChildren) => {
  return <div className="flex w-1/3 justify-end">{children}</div>;
};
