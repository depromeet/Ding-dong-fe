import { ComponentProps } from 'react';

import { Svg } from '@/components/Svg';

export const PersonIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} width={width} height={height} className={className} {...rest}>
      <path
        d="M1.16669 20.0338C1.16669 16.1009 4.4524 12.9127 11.1667 12.9127C17.881 12.9127 21.1667 16.1009 21.1667 20.0338C21.1667 20.6595 20.7102 21.1667 20.1471 21.1667H2.18629C1.62318 21.1667 1.16669 20.6595 1.16669 20.0338Z"
        strokeWidth="1.66667"
      />
      <path
        d="M14.9167 4.91669C14.9167 6.98776 13.2378 8.66669 11.1667 8.66669C9.09562 8.66669 7.41669 6.98776 7.41669 4.91669C7.41669 2.84562 9.09562 1.16669 11.1667 1.16669C13.2378 1.16669 14.9167 2.84562 14.9167 4.91669Z"
        strokeWidth="1.66667"
      />
    </Svg>
  );
};
