import { ButtonHTMLAttributes, ReactNode } from 'react';

import {
  CelebrationIcon,
  EyeIcon,
  HeartExchangeIcon,
  NudgeCloseIcon,
  NudgeIcon,
  RiceIcon,
} from '~/components/Icon';
import { NudgeType } from '~/types/nudge';
import { twMerge } from '~/utils/tailwind.util';

type NudgeIconType = 'default' | NudgeType;
const NudgeIconMap: Record<NudgeIconType, ReactNode> = {
  default: <NudgeIcon />,
  MEET: <CelebrationIcon />,
  FRIENDLY: <EyeIcon />,
  SIMILARITY: <HeartExchangeIcon />,
  TALKING: <RiceIcon />,
};

type NudgeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  NudgeType: NudgeIconType;
  onClick?: () => void;
  isOpen?: boolean;
};
export const NudgeButton = ({
  className,
  NudgeType,
  onClick,
  isOpen,
  ...props
}: NudgeButtonProps) => (
  <button
    className={twMerge(
      'flex h-56pxr w-56pxr items-center justify-center rounded-full border-[2px] border-[#C6CFFF] bg-[#EBEEFF]',
      className,
    )}
    onClick={onClick}
    {...props}
    type="button"
  >
    {isOpen ? <NudgeCloseIcon /> : NudgeIconMap[NudgeType]}
  </button>
);
