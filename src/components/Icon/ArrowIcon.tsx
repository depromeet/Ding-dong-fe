import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';
import { tw } from '~/utils/tailwind.util';

export const ArrowIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      size={size}
      width={size ?? width ?? 12}
      height={size ?? height ?? 22}
      viewBox="0 0 12 22"
      className={tw('fill-none', className)}
      {...rest}
    >
      <path
        d="M2.44209 7.56982L5.86069 4.15122L9.2793 7.56982"
        stroke="#2A2A2A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.28057 14.1509L5.86196 17.5695L2.44336 14.1509"
        stroke="#2A2A2A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
