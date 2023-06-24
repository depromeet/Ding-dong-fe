import { ReactNode } from 'react';

type TemplateDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export const TemplateDescription = ({ children, className }: TemplateDescriptionProps) => {
  return <div className={`text-b1 ${className}`}>{children}</div>;
};
