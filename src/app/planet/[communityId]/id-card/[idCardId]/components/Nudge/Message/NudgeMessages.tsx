import { motion } from 'framer-motion';

import { NudgeIconSelector } from '~/components/NudgeIconSelector';
import { nudgeMessages, NudgeModel } from '~/types/nudge';
import { twMerge } from '~/utils/tailwind.util';

type NudgeMessageProps = {
  className?: string;
  activeNudgeType: NudgeModel;
  onMessageClick: (NudgeType: NudgeModel) => void;
};

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

export const NudgeMessages = ({
  className,
  activeNudgeType,
  onMessageClick,
}: NudgeMessageProps) => (
  <motion.ul
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="closed"
    className={twMerge('flex flex-col gap-12pxr', className)}
  >
    {nudgeMessages.map(({ id, text }) => {
      return (
        <motion.li
          key={id}
          variants={messageVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={twMerge(
            'flex w-180pxr items-center justify-between rounded-[44px] bg-[#E7EAFF] px-16pxr py-7pxr text-15pxr font-bold',
            id === activeNudgeType && 'bg-[#8C82FF]',
          )}
          onClick={() => onMessageClick(id)}
        >
          <NudgeIconSelector nudgeType={id} />
          <div>{text}</div>
        </motion.li>
      );
    })}
  </motion.ul>
);
