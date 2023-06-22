import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';

export const HeartFillIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} width={width} height={height} className={className} {...rest}>
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </Svg>
  );
};
