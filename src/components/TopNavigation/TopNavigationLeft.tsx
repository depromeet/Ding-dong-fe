'use client';
import { PropsWithChildren } from 'react';

export const TopNavigationLeft = ({ children }: PropsWithChildren) => {
  return <div className="flex w-1/3 justify-start">{children}</div>;
};
