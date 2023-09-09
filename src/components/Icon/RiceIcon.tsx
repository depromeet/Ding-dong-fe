import { ComponentProps } from 'react';

import { Svg } from '~/components/Svg';

export const RiceIcon = ({ ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      width={36}
      height={37}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <ellipse cx="18.4714" cy="17.9449" rx="12.5563" ry="12.3404" fill="white" />
      <rect x="13.3184" y="30.7793" width="10.095" height="2.75003" rx="0.519053" fill="#5445FF" />
      <circle cx="7.18017" cy="16.5522" r="2.40478" fill="white" />
      <circle cx="8.42236" cy="13.3179" r="2.40478" fill="white" />
      <circle cx="10.4473" cy="10.9133" r="2.40478" fill="white" />
      <circle cx="12.4336" cy="9.17529" r="2.40478" fill="white" />
      <circle cx="14.9766" cy="7.8623" r="2.40478" fill="white" />
      <circle cx="18.0605" cy="7.09277" r="2.40478" fill="white" />
      <circle cx="21.3071" cy="7.67236" r="2.40478" fill="white" />
      <circle cx="23.8413" cy="8.83837" r="2.40478" fill="white" />
      <circle cx="26.2466" cy="10.4819" r="2.40478" fill="white" />
      <circle cx="28.1216" cy="12.8872" r="2.40478" fill="white" />
      <circle cx="29.1265" cy="15.5005" r="2.40478" fill="white" />
      <circle cx="29.519" cy="17.9438" r="2.40478" fill="white" />
      <path
        d="M6.07524 17.5881C4.92858 17.5881 3.98362 18.5225 4.14872 19.6572C4.59188 22.7028 6.00537 25.5461 8.20744 27.7481C10.902 30.4427 14.5567 31.9565 18.3674 31.9565C22.1782 31.9565 25.8328 30.4427 28.5274 27.7481C30.7295 25.5461 32.143 22.7028 32.5861 19.6572C32.7513 18.5225 31.8063 17.5881 30.6596 17.5881L18.3674 17.5881L6.07524 17.5881Z"
        fill="#5445FF"
      />
    </Svg>
  );
};
