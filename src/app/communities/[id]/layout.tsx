import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return <div className="p-[27px]">{children}</div>;
};

export default Layout;
