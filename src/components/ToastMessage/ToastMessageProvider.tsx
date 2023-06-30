'use client';
import { AnimatePresence, motion } from 'framer-motion';

import { ToastMessage } from '~/components/ToastMessage/ToastMessage';
import { useToastMessageStore } from '~/stores/toastMessage.store';

export const ToastMessageProvider = () => {
  const { toastMessageList } = useToastMessageStore();
  return (
    <div>
      <AnimatePresence initial={false}>
        {toastMessageList.map(({ toastId, message }, index) => (
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
            <ToastMessage message={message} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
