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
      <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
    </Svg>
  );
};
