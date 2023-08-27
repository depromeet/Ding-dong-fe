import { ReactNode } from 'react';

import { CelebrationIcon, EyeIcon, HeartExchangeIcon, RiceIcon } from '~/components/Icon';
import { twMerge } from '~/utils/tailwind.util';

type BellType = 'celebration' | 'eye' | 'heart' | 'rice';
type BellMessageProps = {
  className?: string;
  activeBellType: BellType;
  onMessageClick: (bellType: BellType) => void;
};

type BellMessagesType = { icon: ReactNode; text: string; id: BellType }[];
const bellMessages: BellMessagesType = [
  {
    icon: <CelebrationIcon />,
    text: '만나서 반가워요',
    id: 'celebration',
  },
  {
    icon: <EyeIcon />,
    text: '친해지고 싶어요',
    id: 'eye',
  },
  {
    icon: <HeartExchangeIcon />,
    text: '저와 비슷해요',
    id: 'heart',
  },
  {
    icon: <RiceIcon />,
    text: '같이 밥 한끼 해요',
    id: 'rice',
  },
];

export const BellMessages = ({ className, activeBellType, onMessageClick }: BellMessageProps) => (
  <div className={twMerge('flex flex-col gap-12pxr', className)}>
    {bellMessages.map(({ icon, text, id }) => {
      return (
        <div
          key={id}
          className={twMerge(
            'flex w-180pxr items-center justify-between rounded-[44px] bg-[#E7EAFF] px-16pxr py-7pxr text-15pxr font-bold',
            id === activeBellType && 'bg-[#8C82FF]',
          )}
          onClick={() => onMessageClick(id)}
        >
          {icon}
          <div>{text}</div>
        </div>
      );
    })}
  </div>
);
