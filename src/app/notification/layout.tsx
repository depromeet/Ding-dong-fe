import { BottomNavigation } from '@/components/BottomNavigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;
