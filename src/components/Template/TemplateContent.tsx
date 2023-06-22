import { ReactNode } from 'react';

import { tw } from '~/utils/tailwind.util';

type TemplateContentProps = {
  children: ReactNode;
  className?: string;
};

export const TemplateContent = ({ children, className }: TemplateContentProps) => {
  return <div className={tw('flex flex-1 items-center justify-center', className)}>{children}</div>;
};
