'use client';
import { AnimatePresence, motion } from 'framer-motion';

import { Portal } from '~/components/Portal';
import { ToastMessage } from '~/components/ToastMessage/ToastMessage';
import { useToastMessageStore } from '~/stores/toastMessage.store';

export const ToastMessageProvider = () => {
  const { toastMessageList } = useToastMessageStore();
  return (
    <Portal documentId="toast-portal">
      <AnimatePresence initial={false}>
        {toastMessageList.map(({ toastId, message, type }, index) => (
          <motion.div
            key={toastId}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '100%',
              position: 'absolute',
              zIndex: toastMessageList.length - index,
            }}
          >
            <ToastMessage type={type} message={message} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Portal>
  );
};
