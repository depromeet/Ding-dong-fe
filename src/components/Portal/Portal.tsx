'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import useIsMounted from '@/hooks/useIsMounted';

const Portal = ({ children }: PropsWithChildren) => {
  const ref = useRef<Element | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    ref.current = document.getElementById('portal');
  }, [isMounted]);

  if (!(isMounted && ref.current)) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {children}
      </motion.div>
    </AnimatePresence>,
    ref.current,
  );
};

export default Portal;
