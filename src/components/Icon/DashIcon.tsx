import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';

export const DashIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} width={width ?? 16} height={height ?? 16} className={className} {...rest}>
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
    </Svg>
  );
};
