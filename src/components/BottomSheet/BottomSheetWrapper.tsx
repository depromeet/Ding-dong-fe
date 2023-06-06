'use client';

import { PropsWithChildren } from 'react';

export const BottomSheetWrapper = ({ children }: PropsWithChildren) => {
  return <div className="fixed left-0 top-0 h-full w-full bg-gray-900/70">{children}</div>;
};
