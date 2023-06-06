'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

import { BottomSheetContent } from '@/components/BottomSheet/BottomSheetContent';
import { BottomSheetFooter } from '@/components/BottomSheet/BottomSheetFooter';
import { BottomSheetHeader } from '@/components/BottomSheet/BottomSheetHeader';
import { BottomSheetWrapper } from '@/components/BottomSheet/BottomSheetWrapper';
import { UseBottomSheetReturn } from '@/components/BottomSheet/useBottomSheet';
import Portal from '@/components/Portal';

export type BottomSheetProps = PropsWithChildren & UseBottomSheetReturn;
const BottomSheet = ({ children, isOpen, onClose }: BottomSheetProps) => {
  return (
    <Portal>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            key="wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BottomSheetWrapper onClose={onClose}></BottomSheetWrapper>
          </motion.div>
          <motion.div
            key="sheet"
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
      )}
    </Portal>
  );
};

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Content = BottomSheetContent;
BottomSheet.Footer = BottomSheetFooter;
export default BottomSheet;
