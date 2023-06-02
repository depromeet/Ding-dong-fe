'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

import useIsMounted from '@/hooks/useIsMounted';

const Portal = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted();
  const element = document.querySelector('#portal');

  if (!element || !isMounted) return null;
  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {children}
      </motion.div>
    </AnimatePresence>,
    element,
  );
};

export default Portal;
