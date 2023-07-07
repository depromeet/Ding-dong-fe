import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';
import { tw } from '~/utils/tailwind.util';

export const CancelIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      size={size}
      width={width ?? 12}
      height={height ?? 12}
      className={tw('stroke-black', className)}
      {...rest}
    >
      <path d="M2.25 2L9.75 10" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9.75 2L2.25 10" strokeWidth="1.3" strokeLinecap="round" />
    </Svg>
  );
};

export const CancelBoldIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      size={size}
      width={width ?? 24}
      height={height ?? 24}
      className={tw('stroke-black', className)}
      {...rest}
    >
      <path d="M4.5 4L19.5 20" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M19.5 4L4.5 20" strokeWidth="1.7" strokeLinecap="round" />
    </Svg>
  );
};
