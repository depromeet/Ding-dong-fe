import { ReactNode } from 'react';

import { Button, ButtonProps } from '~/components/Button/Button';
import { tw } from '~/utils/tailwind.util';

type TemplateButtonProps = Partial<Omit<ButtonProps, 'children'>> & {
  children: ReactNode | string;
  className?: string;
};

export const TemplateButton = ({ children, className, onClick, ...rest }: TemplateButtonProps) => {
  return (
    <Button
      {...rest}
      size="large"
      color="primary"
      className={tw('mb-15pxr', className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
