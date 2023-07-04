import { PropsWithChildren } from 'react';

import { tw } from '~/utils/tailwind.util';

type TopNavigationTitleProps = {
  className?: string;
};

export const TopNavigationTitle = ({
  children,
  className,
}: PropsWithChildren<TopNavigationTitleProps>) => {
  return <div className={tw('flex w-1/3 justify-center', className)}>{children}</div>;
};
