'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

import {
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetWrapper,
} from '@/components/BottomSheet';
import Portal from '@/components/Portal';

const BottomSheet = ({ children }: PropsWithChildren) => {
  return (
    <Portal>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <BottomSheetWrapper></BottomSheetWrapper>
        </motion.div>
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          exit={{ y: 300, opacity: 0 }}
          className="fixed bottom-0 left-0 w-full rounded-t-[20px] bg-white px-5 py-6"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
};

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Content = BottomSheetContent;
BottomSheet.Footer = BottomSheetFooter;
export default BottomSheet;
