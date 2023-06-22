import { ReactNode } from 'react';

import { Button } from '~/components/Button/Button';
import { tw } from '~/utils/tailwind.util';

type TemplateButtonProps = {
  children: ReactNode | string;
  className?: string;
};

export const TemplateButton = ({ children, className }: TemplateButtonProps) => {
  return (
    <Button size="large" color="primary" className={tw('mb-15pxr', className)}>
      {children}
    </Button>
  );
};
