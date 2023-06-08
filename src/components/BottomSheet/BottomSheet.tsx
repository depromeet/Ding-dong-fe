'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

import { BottomSheetContent } from '@/components/BottomSheet/BottomSheetContent';
import { BottomSheetFooter } from '@/components/BottomSheet/BottomSheetFooter';
import { BottomSheetHeader } from '@/components/BottomSheet/BottomSheetHeader';
import { BottomSheetWrapper } from '@/components/BottomSheet/BottomSheetWrapper';
import { UseBottomSheetReturn } from '@/components/BottomSheet/useBottomSheet';
import { Portal } from '@/components/Portal';

const WrapperVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.7 } },
};

const SheetVariants = {
  initial: { y: 300, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5, delay: 0.1, ease: [0, 0.71, 0.2, 1.01] },
  exit: { y: 300, opacity: 0, transition: { duration: 0.5 } },
};

export type BottomSheetProps = PropsWithChildren & UseBottomSheetReturn;
const BottomSheet = ({ children, isOpen, onClose }: BottomSheetProps) => {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div key="wrapper" {...WrapperVariants}>
            <BottomSheetWrapper onClose={onClose}></BottomSheetWrapper>
            <motion.div
              key="sheet"
              {...SheetVariants}
              className={`fixed bottom-0 left-0 flex max-h-[calc(100vh-212px)] w-full flex-col rounded-t-[20px] bg-white px-5 py-6`}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Content = BottomSheetContent;
BottomSheet.Footer = BottomSheetFooter;
export default BottomSheet;
