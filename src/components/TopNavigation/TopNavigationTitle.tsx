'use client';
import { PropsWithChildren } from 'react';

export const TopNavigationTitle = ({ children }: PropsWithChildren) => {
  return <div className="flex w-1/3 justify-center">{children}</div>;
};
