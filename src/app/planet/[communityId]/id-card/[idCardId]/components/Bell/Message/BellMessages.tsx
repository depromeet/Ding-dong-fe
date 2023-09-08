import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { CelebrationIcon, EyeIcon, HeartExchangeIcon, RiceIcon } from '~/components/Icon';
import { NudgeType } from '~/types/nudge';
import { twMerge } from '~/utils/tailwind.util';

type BellMessageProps = {
  className?: string;
  activeBellType: NudgeType;
  onMessageClick: (bellType: NudgeType) => void;
};

type BellMessagesType = { icon: ReactNode; text: string; id: NudgeType }[];
const bellMessages: BellMessagesType = [
  {
    icon: <CelebrationIcon />,
    text: '만나서 반가워요',
    id: 'MEET',
  },
  {
    icon: <EyeIcon />,
    text: '친해지고 싶어요',
    id: 'FRIENDLY',
  },
  {
    icon: <HeartExchangeIcon />,
    text: '저와 비슷해요',
    id: 'SIMILARITY',
  },
  {
    icon: <RiceIcon />,
    text: '같이 밥 한끼 해요',
    id: 'TALKING',
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.01,
      staggerDirection: 1,
    },
  },
};

const messageVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -50 },
};

export const BellMessages = ({ className, activeBellType, onMessageClick }: BellMessageProps) => (
  <motion.ul
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="closed"
    className={twMerge('flex flex-col gap-12pxr', className)}
  >
    {bellMessages.map(({ icon, text, id }) => {
      return (
        <motion.li
          key={id}
          variants={messageVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={twMerge(
            'flex w-180pxr items-center justify-between rounded-[44px] bg-[#E7EAFF] px-16pxr py-7pxr text-15pxr font-bold',
            id === activeBellType && 'bg-[#8C82FF]',
          )}
          onClick={() => onMessageClick(id)}
        >
          {icon}
          <div>{text}</div>
        </motion.li>
      );
    })}
  </motion.ul>
);
