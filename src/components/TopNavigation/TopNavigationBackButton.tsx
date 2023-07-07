'use client';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { ArrowLeftIcon, CancelBoldIcon, ChevronLeftIcon } from '~/components/Icon';

const BackButton = {
  chevron: ChevronLeftIcon,
  cancel: CancelBoldIcon,
  arrow: ArrowLeftIcon,
};

type BackButtonType = keyof typeof BackButton;

type TopNavigationBackButtonProps = {
  /**
   * 좌측 아이콘 타입
   * @default 'chevron'
   */
  backButtonType?: BackButtonType;
  /**
   * 좌측 아이콘을 클릭할 때 동작하는 함수, 값을 넣지 않으면 기본적으로 router.back이 실행됩니다.
   */
  onClickBackButton?: VoidFunction;
  backLink?: string;
  direction?: 'left' | 'right';
};

export const TopNavigationBackButton = ({
  backButtonType = 'chevron',
  backLink,
  onClickBackButton,
  direction = 'left',
}: TopNavigationBackButtonProps) => {
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
    <button
      className={twMerge(direction === 'left' ? 'justify-start' : 'justify-end')}
      onClick={handleClickBackButton}
    >
      <BackButtonComponent />
    </button>
  );
};
