import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSize = 'small' | 'medium' | 'large';
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
  secondary: 'bg-neutral-200 text-gray-600',
};

const sizes: Record<ButtonSize, string> = {
  small: 'h-7 text-xs rounded-lg',
  medium: 'h-11 text-sm rounded-xl',
  large: 'h-12 text-base rounded-xl',
};

const Button = ({
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
      className={`${buttonColor} ${buttonSize} ${width} font-bold active:bg-gray-500 active:text-white disabled:bg-slate-100 disabled:text-slate-200 ${
        className ?? ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
