import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';

export const RiceIcon = ({ ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      width={36}
      height={37}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_3268_24751)">
        <circle cx="22.6544" cy="13.0753" r="0.826323" fill="white" />
        <ellipse cx="13.6083" cy="17.6895" rx="13.1083" ry="12.2139" fill="white" />
        <rect
          x="8.23047"
          y="30.3936"
          width="10.5388"
          height="2.72185"
          rx="0.519053"
          fill="#5445FF"
        />
        <ellipse cx="1.82122" cy="16.3108" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="3.11693" cy="13.1087" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="5.23119" cy="10.7297" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="7.30443" cy="9.00904" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="9.96068" cy="7.71022" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="13.1804" cy="6.9485" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="16.5691" cy="7.52076" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="19.2136" cy="8.67701" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="21.7244" cy="10.304" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="23.6824" cy="12.6848" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="24.7322" cy="15.2688" rx="2.51049" ry="2.38014" fill="white" />
        <ellipse cx="25.1413" cy="17.6887" rx="2.51049" ry="2.38014" fill="white" />
        <path
          d="M0.576215 17.3365C-0.570445 17.3365 -1.51626 18.2714 -1.3406 19.4046C-0.874477 22.4113 0.599681 25.2177 2.8934 27.3923C5.70645 30.0593 9.52175 31.5576 13.5 31.5576C17.4782 31.5576 21.2936 30.0593 24.1066 27.3923C26.4003 25.2177 27.8745 22.4113 28.3406 19.4046C28.5163 18.2714 27.5704 17.3365 26.4238 17.3365L13.5 17.3365L0.576215 17.3365Z"
          fill="#5445FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_3268_24751">
          <rect width="36" height="36" fill="white" transform="translate(0 0.115234)" />
        </clipPath>
      </defs>
    </Svg>
  );
};
