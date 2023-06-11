import { ComponentProps } from 'react';

import { Svg } from '@/components/Svg';

export const HomeIcon = ({
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
        clipRule="evenodd"
        d="M13.7631 2.25924C12.4856 1.078 10.5145 1.078 9.23701 2.25924L2.57034 8.4237C1.88801 9.05463 1.50005 9.94177 1.50005 10.8711V18.5C1.50005 20.341 2.99243 21.8334 4.83338 21.8334H11.5H18.1667C20.0077 21.8334 21.5 20.341 21.5 18.5V10.8711C21.5 9.94177 21.1121 9.05463 20.4297 8.4237L13.7631 2.25924Z"
        strokeWidth="1.66667"
      />
    </Svg>
  );
};
