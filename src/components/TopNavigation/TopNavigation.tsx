'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { ChevronLeftIcon } from '@/components/Icon';

type TopNavigationProps = {
  title?: string;
  /**
   * 좌측 아이콘을 클릭할 때 동작하는 함수, 값을 넣지 않으면 기본적으로 router.back이 실행됩니다.
   */
  onClickBackButton?: VoidFunction;
  /**
   * 이벤트가 등록된 ReactNode를 넘겨야 합니다.
   */
  rightButtonElement?: ReactNode;
};

const TopNavigation = ({ title, onClickBackButton, rightButtonElement }: TopNavigationProps) => {
  const router = useRouter();

  const handleClickBackButton = () => {
    if (onClickBackButton) {
      onClickBackButton();
      return;
    }
    // backLink
    router.back();
  };

  return (
    <nav className="flex h-[44px] items-center bg-white">
      <button className="flex w-1/3 justify-start" onClick={handleClickBackButton}>
        <ChevronLeftIcon />
      </button>
      {title && <h1 className="flex w-1/3 justify-center">{title}</h1>}
      {rightButtonElement && <div className="flex w-1/3 justify-end">{rightButtonElement}</div>}
    </nav>
  );
};

export default TopNavigation;
