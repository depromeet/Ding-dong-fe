import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';
import { tw } from '~/utils/tailwind.util';

export const ChatBubbleIcon = ({
  className,
  size,
  width,
  height,
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      className={tw('fill-none', className)}
      size={size}
      width={width || 24}
      height={height || 24}
      {...rest}
    >
      <g clipPath="url(#clip0_1140_15395)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.1578 17.0836C15.7129 19.5288 12.0926 20.0571 9.12987 18.6869C8.6925 18.5109 8.33392 18.3685 7.99303 18.3685C7.04352 18.3742 5.86166 19.2948 5.24742 18.6813C4.63318 18.067 5.55454 16.8842 5.55454 15.929C5.55454 15.588 5.41786 15.2359 5.24179 14.7976C3.871 11.8354 4.40002 8.21388 6.84494 5.7695C9.96601 2.64728 15.0367 2.64728 18.1578 5.7687C21.2845 8.89574 21.2789 13.9622 18.1578 17.0836Z"
          stroke="#2A2A2A"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.6522 11.7578H15.6594"
          stroke="#2A2A2A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.4451 11.7584H12.4523"
          stroke="#2A2A2A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.23783 11.7584H9.24503"
          stroke="#2A2A2A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1140_15395">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Svg>
  );
};
