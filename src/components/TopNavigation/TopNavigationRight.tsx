import { PropsWithChildren } from 'react';

import { tw } from '~/utils/tailwind.util';

type TopNavigationRightProps = {
  className?: string;
};

export const TopNavigationRight = ({
  children,
  className,
}: PropsWithChildren<TopNavigationRightProps>) => {
  return <div className={tw('flex w-1/3 justify-end', className)}>{children}</div>;
};
