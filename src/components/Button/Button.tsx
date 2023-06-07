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
  secondary: 'bg-grey-200 text-grey-700',
};

const sizes: Record<ButtonSize, string> = {
  small: 'h-[30px] text-xs rounded-lg',
  medium: 'h-11 text-sm rounded-xl',
  large: 'h-[52px] text-base rounded-xl',
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
      className={`${buttonColor} ${buttonSize} ${width} font-bold active:bg-grey-600 active:text-white disabled:bg-grey-100 disabled:text-grey-300 ${
        className ?? ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
