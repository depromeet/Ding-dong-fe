'use client';
import { AnimatePresence, motion } from 'framer-motion';

import { Portal } from '~/components/Portal';
import { ToastMessage } from '~/components/ToastMessage/ToastMessage';
import { useToastMessageStore } from '~/stores/toastMessage.store';

export const ToastMessageProvider = () => {
  const { toastMessageList } = useToastMessageStore();
  return (
    <Portal documentId="toast-portal">
      <div className="fixed left-0 right-0 top-0 z-toast px-layout-sm">
        <div className="relative w-full">
          <AnimatePresence initial={false}>
            {toastMessageList.map(({ toastId, message, type }) => (
              <motion.div
                key={toastId}
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                exit={{ y: -200 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <ToastMessage type={type} message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Portal>
  );
};
