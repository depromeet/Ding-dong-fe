import { ComponentProps } from 'react';

import { Svg } from '@/components/Svg';

export const ChevronLeftIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg className={className} size={size} width={width} height={height} {...rest}>
      <path
        d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
        fill="currentColor"
      />
    </Svg>
  );
};
