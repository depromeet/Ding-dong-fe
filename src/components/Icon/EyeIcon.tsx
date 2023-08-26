import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';

export const EyeIcon = ({ ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      width={37}
      height={37}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="28.1129" cy="13.0753" r="0.826323" fill="white" />
      <ellipse cx="25.9965" cy="18.1152" rx="7.96184" ry="15" fill="white" />
      <ellipse cx="11.9203" cy="18.1152" rx="7.96184" ry="15" fill="white" />
      <ellipse cx="24.1914" cy="17.6002" rx="4.4546" ry="4.61583" fill="#5445FF" />
      <ellipse cx="10.1143" cy="17.6002" rx="4.4546" ry="4.61583" fill="#5445FF" />
      <ellipse cx="25.3067" cy="16.0849" rx="1.1158" ry="1.15618" fill="white" />
      <ellipse cx="11.2305" cy="16.0849" rx="1.1158" ry="1.15618" fill="white" />
    </Svg>
  );
};
