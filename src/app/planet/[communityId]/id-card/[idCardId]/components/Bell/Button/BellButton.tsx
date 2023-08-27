import { ButtonHTMLAttributes, ReactNode } from 'react';

import {
  BellCloseIcon,
  BellIcon,
  CelebrationIcon,
  EyeIcon,
  HeartExchangeIcon,
  RiceIcon,
} from '~/components/Icon';
import { twMerge } from '~/utils/tailwind.util';

type BellIconType = 'bell' | 'celebration' | 'eye' | 'heart' | 'rice';
const bellIconMap: Record<BellIconType, ReactNode> = {
  bell: <BellIcon />,
  celebration: <CelebrationIcon />,
  eye: <EyeIcon />,
  heart: <HeartExchangeIcon />,
  rice: <RiceIcon />,
};

type BellButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  bellType: BellIconType;
  onClick?: () => void;
  isClose?: boolean;
};
export const BellButton = ({
  className,
  bellType,
  onClick,
  isClose,
  ...props
}: BellButtonProps) => (
  <button
    className={twMerge(
      'border-2pxr flex h-56pxr w-56pxr items-center justify-center rounded-full border-[#DFE3FF] bg-[#E7EAFF]',
      className,
    )}
    onClick={onClick}
    {...props}
  >
    {isClose ? <BellCloseIcon /> : bellIconMap[bellType]}
  </button>
);
