import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';
import { tw } from '~/utils/tailwind.util';

export const ThreeDotsVerticalIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      className={tw('fill-grey-800', className)}
      size={size}
      width={width || 16}
      height={height || 16}
      {...rest}
    >
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </Svg>
  );
};
