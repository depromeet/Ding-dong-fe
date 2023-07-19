import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';
import { tw } from '~/utils/tailwind.util';

export const CheckCircleFillIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      size={size}
      width={width || 16}
      height={height || 16}
      className={tw('fill-black', className)}
      {...rest}
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </Svg>
  );
};
