import { ReactNode } from 'react';

import { tw } from '~/utils/tailwind.util';

type TemplateTitleProps = {
  children: ReactNode;
  className?: string;
};

export const TemplateTitle = ({ children, className }: TemplateTitleProps) => {
  return <div className={tw('text-h1', className)}>{children}</div>;
};
