import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';

export const CelebrationIcon = ({ ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      width={36}
      height={37}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_3268_24685)">
        <path
          d="M6.93424 34.7268C4.27858 35.6489 1.73022 33.1006 2.65236 30.4449L9.28509 11.3433L26.0358 28.0941L6.93424 34.7268Z"
          fill="#9D95FF"
        />
        <ellipse
          cx="18.024"
          cy="19.356"
          rx="11.918"
          ry="4.44008"
          transform="rotate(45 18.024 19.356)"
          fill="#5445FF"
        />
        <circle cx="14.5958" cy="4.43859" r="2.22863" fill="#675AFF" />
        <circle cx="31.6963" cy="13.8203" r="1.57126" fill="#9D95FF" />
        <circle cx="27.1544" cy="13.0753" r="0.826323" fill="white" />
        <path
          d="M15.6901 18.7058C19.7979 16.3487 22.3906 10.6741 20.2387 6.36552"
          stroke="#B4B4FF"
          strokeWidth="2.07042"
          strokeLinecap="round"
        />
        <path
          d="M22.0814 22.6048C25.2132 19.6979 28.6414 20.1188 30.1253 20.2619"
          stroke="white"
          strokeWidth="1.81162"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3268_24685">
          <rect width="36" height="36" fill="white" transform="translate(0 0.115234)" />
        </clipPath>
      </defs>
    </Svg>
  );
};
