import { HTMLAttributes, PropsWithChildren } from 'react';

export const MenuWrapper = ({
  className,
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) => {
  return (
    <ul className={className} {...rest}>
      {children}
    </ul>
  );
};
