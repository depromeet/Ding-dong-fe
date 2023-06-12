'use client';

import { PropsWithChildren } from 'react';

export const TextInputWrapper = ({ children }: PropsWithChildren) => {
  return <div className="flex w-full flex-col">{children}</div>;
};
