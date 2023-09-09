import { ButtonHTMLAttributes } from 'react';

import { NudgeCloseIcon } from '~/components/Icon';
import { NudgeIconSelector } from '~/components/NudgeIconSelector';
import { NudgeIconSelectorType } from '~/types/nudge';
import { twMerge } from '~/utils/tailwind.util';

type NudgeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  nudgeType: NudgeIconSelectorType;
  onClick?: () => void;
  isOpen?: boolean;
};
export const NudgeButton = ({
  className,
  nudgeType,
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
    {isOpen ? <NudgeCloseIcon /> : <NudgeIconSelector nudgeType={nudgeType} />}
  </button>
);
