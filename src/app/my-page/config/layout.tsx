import { PropsWithChildren } from 'react';

import { TopNavigation } from '~/components/TopNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton />
        </TopNavigation.Left>
        <TopNavigation.Title>
          <h1 className="text-h5 font-semibold text-black">설정</h1>
        </TopNavigation.Title>
      </TopNavigation>
      {children}
    </div>
  );
};

export default Layout;
