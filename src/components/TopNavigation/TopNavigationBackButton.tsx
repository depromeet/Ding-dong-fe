'use client';
import { useRouter } from 'next/navigation';

import { ArrowLeftIcon, CancelIcon, ChevronLeftIcon } from '~/components/Icon';

const BackButton = {
  chevron: ChevronLeftIcon,
  cancel: CancelIcon,
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
};

export const TopNavigationBackButton = ({
  backButtonType = 'chevron',
  backLink,
  onClickBackButton,
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
    <button className="flex w-1/3 justify-start" onClick={handleClickBackButton}>
      <BackButtonComponent />
    </button>
  );
};
