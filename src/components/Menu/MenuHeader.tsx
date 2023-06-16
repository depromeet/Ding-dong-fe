import { HTMLAttributes, PropsWithChildren } from 'react';

import { tw } from '~/utils/tailwind.util';

export const MenuHeader = ({
  className,
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLHeadElement>>) => {
  return (
    <h3 className={tw('pb-8pxr pt-20pxr text-b2 text-grey-500', className)} {...rest}>
      {children}
    </h3>
  );
};
