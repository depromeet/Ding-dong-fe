'use client';

import { PropsWithChildren } from 'react';

export const BottomSheetContent = ({ children }: PropsWithChildren) => {
  return <div className="mb-5 overflow-auto">{children}</div>;
};
