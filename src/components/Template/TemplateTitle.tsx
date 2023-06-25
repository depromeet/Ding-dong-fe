import { ReactNode } from 'react';

type TemplateTitleProps = {
  children: ReactNode;
  className?: string;
};

export const TemplateTitle = ({ children, className }: TemplateTitleProps) => {
  return <div className={`text-h2 ${className}`}>{children}</div>;
};
