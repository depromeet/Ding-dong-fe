import { ReactNode } from 'react';

import { tw } from '~/utils/tailwind.util';

type TemplateWrapperProps = {
  children: ReactNode;
  className?: string;
};

export const TemplateWrapper = ({ children, className }: TemplateWrapperProps) => {
  return <div className={tw('flex flex-col px-layout-sm ', className)}>{children}</div>;
};
