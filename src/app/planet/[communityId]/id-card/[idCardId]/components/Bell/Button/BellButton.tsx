import { ButtonHTMLAttributes, ReactNode } from 'react';

import {
  BellCloseIcon,
  BellIcon,
  CelebrationIcon,
  EyeIcon,
  HeartExchangeIcon,
  RiceIcon,
} from '~/components/Icon';
import { NudgeType } from '~/types/nudge';
import { twMerge } from '~/utils/tailwind.util';

type BellIconType = 'default' | NudgeType;
const bellIconMap: Record<BellIconType, ReactNode> = {
  default: <BellIcon />,
  MEET: <CelebrationIcon />,
  FRIENDLY: <EyeIcon />,
  SIMILARITY: <HeartExchangeIcon />,
  TALKING: <RiceIcon />,
};

type BellButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  bellType: BellIconType;
  onClick?: () => void;
  isOpen?: boolean;
};
export const BellButton = ({ className, bellType, onClick, isOpen, ...props }: BellButtonProps) => (
  <button
    className={twMerge(
      'border-2pxr flex h-56pxr w-56pxr items-center justify-center rounded-full border-[#DFE3FF] bg-[#E7EAFF]',
      className,
    )}
    onClick={onClick}
    {...props}
    type="button"
  >
    {isOpen ? <BellCloseIcon /> : bellIconMap[bellType]}
  </button>
);
