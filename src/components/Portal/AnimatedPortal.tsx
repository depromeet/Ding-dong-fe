'use client';

import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { PropsWithChildren } from 'react';

import Portal from '@/components/Portal';

type AnimatedPortalProps = {
  motionProps: MotionProps;
} & PropsWithChildren;

const AnimatedPortal = ({ children, motionProps }: AnimatedPortalProps) => {
  return (
    <Portal>
      <AnimatePresence>
        <motion.div {...motionProps}>{children}</motion.div>
      </AnimatePresence>
    </Portal>
  );
};

export default AnimatedPortal;
