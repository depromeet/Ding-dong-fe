import { HTMLAttributes, PropsWithChildren } from 'react';

import { ChevronRightIcon } from '~/components/Icon';
import { tw } from '~/utils/tailwind.util';

export const MenuElement = ({
  className,
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLLIElement>>) => {
  return (
    <li
      className={tw(
        'flex w-full justify-between py-13pxr text-b1 text-grey-800',
        'hover:cursor-pointer',
        className,
      )}
      {...rest}
    >
      {children}
      <ChevronRightIcon />
    </li>
  );
};
