import { ComponentProps } from 'react';

import { Svg } from '@/components/Svg';
import { tw } from '@/utils/tailwind.util';

export const CameraIcon = ({ width, height, className, ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg
      width={width || 16}
      height={height || 13}
      className={tw('fill-grey-700', className)}
      {...rest}
    >
      <path
        d="M0.6875 11.9922C0.6875 12.5445 1.13522 12.9922 1.6875 12.9922H14.3125C14.8648 12.9922 15.3125 12.5445 15.3125 11.9922V3.78516C15.3125 3.23287 14.8648 2.78516 14.3125 2.78516H12.5703C12.4449 2.78451 12.3215 2.75288 12.2112 2.69308C12.1009 2.63328 12.0071 2.54717 11.9381 2.44238L10.9326 0.943047C10.747 0.66615 10.4355 0.5 10.1021 0.5H5.8979C5.5645 0.5 5.25304 0.666149 5.06735 0.943047L4.06191 2.44238C3.99291 2.54717 3.8991 2.63328 3.7888 2.69308C3.67851 2.75288 3.55515 2.78451 3.42969 2.78516H1.6875C1.13522 2.78516 0.6875 3.23287 0.6875 3.78516V11.9922Z"
        fill="currentColor"
      />
      <path
        d="M6.38538 5.09135C6.86331 4.77201 7.4252 4.60156 8 4.60156C8.77079 4.60156 9.51 4.90776 10.055 5.45278C10.6001 5.99781 10.9063 6.73703 10.9063 7.50781C10.9063 8.08261 10.7358 8.64451 10.4165 9.12244C10.0971 9.60037 9.64322 9.97287 9.11217 10.1928C8.58113 10.4128 7.99678 10.4704 7.43302 10.3582C6.86926 10.2461 6.35142 9.96929 5.94497 9.56284C5.53853 9.15639 5.26173 8.63855 5.14959 8.07479C5.03746 7.51104 5.09501 6.92669 5.31498 6.39564C5.53494 5.86459 5.90745 5.4107 6.38538 5.09135Z"
        stroke="white"
        strokeWidth="1.5"
      />
    </Svg>
  );
};