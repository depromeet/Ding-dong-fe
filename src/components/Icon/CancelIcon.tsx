import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';

export const CancelIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} width={width ?? 16} height={height ?? 16} className={className} {...rest}>
      <path d="M16 1.4L14.6 0L8 6.6L1.4 0L0 1.4L6.6 8L0 14.6L1.4 16L8 9.4L14.6 16L16 14.6L9.4 8L16 1.4Z" />
    </Svg>
  );
};
