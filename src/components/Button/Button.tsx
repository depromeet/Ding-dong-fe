import { ButtonHTMLAttributes, ReactNode } from 'react';

import { twMerge } from '~/utils/tailwind.util';

type ButtonSize = 'small' | 'medium' | 'large' | 'xLarge';
type ButtonColor = 'primary' | 'secondary';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: ButtonSize;
  color: ButtonColor;
  disabled?: boolean;
  width?: string;
  children: ReactNode;
};

const colors: Record<ButtonColor, string> = {
  primary: 'bg-black text-white',
  secondary: 'bg-grey-200 text-grey-700',
};

const sizes: Record<ButtonSize, string> = {
  small: 'py-8pxr text-xs rounded-lg',
  medium: 'py-13pxr text-sm rounded-xl',
  large: 'py-16pxr text-base rounded-xl',
  xLarge: 'py-17pxr text-[15px] rounded-xl',
};

export const Button = ({
  size,
  color,
  disabled = false,
  width = 'w-full',
  className,
  children,
  ...props
}: ButtonProps) => {
  const buttonColor = colors[color];
  const buttonSize = sizes[size];

  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(
        buttonColor,
        buttonSize,
        width,
        'font-bold active:bg-grey-600 active:text-white disabled:bg-grey-100 disabled:text-grey-300',
        className,
      )}
    >
      {children}
    </button>
  );
};
