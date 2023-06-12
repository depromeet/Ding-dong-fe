'use client';

import Button, { ButtonProps } from '~/components/Button/Button';

export const BottomSheetFooterButton = ({
  size = 'large',
  color = 'primary',
  className = 'text-b1 h-[50px]',
  ...buttonProps
}: ButtonProps) => {
  return <Button size={size} color={color} className={className} {...buttonProps} />;
};
