import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

export const TextButton = ({ children, ...props }: TextButtonProps) => {
  return <button {...props}>{children}</button>;
};
