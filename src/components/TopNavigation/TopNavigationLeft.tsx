import { PropsWithChildren } from 'react';

import { tw } from '~/utils/tailwind.util';

type TopNavigationLeftProps = {
  className?: string;
};

export const TopNavigationLeft = ({
  children,
  className,
}: PropsWithChildren<TopNavigationLeftProps>) => {
  return (
    <div className={tw('flex min-w-[33%] max-w-full justify-start', className)}>{children}</div>
  );
};
