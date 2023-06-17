import { ReactNode } from 'react';

import { tw } from '~/utils/tailwind.util';

type TopNavigationRightProps = {
  children: ReactNode;
  className?: string;
};

export const TopNavigationRight = ({ children, className }: TopNavigationRightProps) => {
  return <div className={tw('flex w-1/3 justify-end', className)}>{children}</div>;
};
