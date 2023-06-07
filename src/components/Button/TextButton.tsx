import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const TextButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren) => {
  return <button {...props}>{children}</button>;
};

export default TextButton;
