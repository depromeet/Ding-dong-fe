'use client';
import { HTMLAttributes, PropsWithChildren } from 'react';

import { tw } from '~/utils/tailwind.util';

export const TextAreaWrapper = ({
  className,
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={tw('flex w-full flex-col', className)} {...rest}>
      {children}
    </div>
  );
};
