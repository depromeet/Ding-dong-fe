import { ReactNode } from 'react';

import { tw } from '~/utils/tailwind.util';

type TemplateDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export const TemplateDescription = ({ children, className }: TemplateDescriptionProps) => {
  return <div className={tw('text-b1', className)}>{children}</div>;
};
