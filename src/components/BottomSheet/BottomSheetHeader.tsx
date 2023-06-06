'use client';

import { PropsWithChildren } from 'react';

export const BottomSheetHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-6 w-full text-ellipsis text-center text-h5 font-semibold">{children}</div>
  );
};
