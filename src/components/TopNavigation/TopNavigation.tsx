'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { ArrowLeftIcon, CancelIcon, ChevronLeftIcon } from '@/components/Icon';

const BackButton = {
  chevron: ChevronLeftIcon,
  cancel: CancelIcon,
  arrow: ArrowLeftIcon,
};

type BackButtonType = keyof typeof BackButton;

type TopNavigationProps = {
  /**
   * 좌측 아이콘 타입
   * @default 'chevron'
   */
  backButtonType?: BackButtonType;
  /**
   * 좌측 아이콘을 클릭할 때 동작하는 함수, 값을 넣지 않으면 기본적으로 router.back이 실행됩니다.
   */
  onClickBackButton?: VoidFunction;
  titleElement?: ReactNode;
  /**
   * 이벤트가 등록된 ReactNode를 넘겨야 합니다.
   */
  rightButtonElement?: ReactNode;
  backLink?: string;
};

const TopNavigation = ({
  backButtonType = 'chevron',
  onClickBackButton,
  titleElement,
  rightButtonElement,
  backLink,
}: TopNavigationProps) => {
  const router = useRouter();

  const handleClickBackButton = () => {
    if (onClickBackButton) {
      onClickBackButton();
      return;
    }
    if (backLink) {
      router.push(backLink);
      return;
    }
    router.back();
  };

  const BackButtonComponent = BackButton[backButtonType];

  return (
    <nav className="flex h-[44px] items-center bg-white">
      <button className="flex w-1/3 justify-start" onClick={handleClickBackButton}>
        <BackButtonComponent />
      </button>
      {titleElement && <h1 className="flex w-1/3 justify-center">{titleElement}</h1>}
      {rightButtonElement && <div className="flex w-1/3 justify-end">{rightButtonElement}</div>}
    </nav>
  );
};

export default TopNavigation;
