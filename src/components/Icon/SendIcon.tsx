import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';

export const SendIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} width={width} height={height} className={className} {...rest}>
      <path
        d="M13.4066 7.09967L8.31915 12.2415L2.53283 8.62238C1.70378 8.10368 1.87624 6.84439 2.81397 6.57016L16.5522 2.5469C17.4109 2.29523 18.2067 3.09807 17.9516 3.95955L13.8872 17.6882C13.6087 18.6273 12.3566 18.7951 11.8428 17.9625L8.31645 12.2424"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
