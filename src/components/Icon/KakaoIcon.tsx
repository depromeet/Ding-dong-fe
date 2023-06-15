import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';

export const KakaoIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} width={width} height={height} className={className} {...rest}>
      <path
        d="M14.9993 2.5C10.0282 2.5 6 5.38943 6 8.95385C6 11.274 7.70754 13.307 10.2698 14.4447C10.0833 15.0825 9.58806 16.7547 9.48921 17.1121C9.36751 17.5562 9.66873 17.5502 9.86597 17.4305C10.0208 17.3371 12.3326 15.9118 13.33 15.2965C13.8831 15.3708 14.4415 15.4081 15.0007 15.4081C19.9718 15.4081 24 12.5178 24 8.95385C24 5.38985 19.9704 2.5 15.0007 2.5"
        fill="#391B1B"
      />
    </Svg>
  );
};
