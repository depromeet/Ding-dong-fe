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
      className={`fixed left-0 right-0 top-0 z-top1 flex h-t-nav w-full items-center px-[14px] py-[22px] ${borderBottomStyle} ${bgColor}`}
    >
      {children}
    </nav>
  );
};
