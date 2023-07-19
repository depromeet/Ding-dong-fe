import { PropsWithChildren } from 'react';

type TopNavigationWrapperProps = {
  /**
   * border-bottom 컬러 값이 주어지면 표시합니다. ex) color-primary
   */
  bottomBorderColor?: string;
  bgColor?: string;
};
export const TopNavigationWrapper = ({
  bottomBorderColor,
  bgColor = 'bg-white',
  children,
}: PropsWithChildren<TopNavigationWrapperProps>) => {
  const borderBottomStyle = bottomBorderColor ? `border-b-${bottomBorderColor} border-b-[1px]` : '';
  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-top2 mx-auto flex h-t-nav w-full max-w-[420px] items-center justify-between px-layout-sm ${borderBottomStyle} ${bgColor}`}
    >
      {children}
    </nav>
  );
};
