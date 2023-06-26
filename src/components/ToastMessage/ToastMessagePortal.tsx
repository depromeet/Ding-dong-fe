'use client';
import { Portal } from '~/components/Portal';
import { ToastMessage } from '~/components/ToastMessage/ToastMessage';
import { useToastMessageStore } from '~/stores/toastMessage.store';

export const ToastMessagePortal = () => {
  const { toastMessageList } = useToastMessageStore();
  return (
    // TODO: toast message용 portal id 삽입할 수 있게 리패곹링하기
    <Portal>
      <div className="px-layout-sm pt-t-nav">
        {toastMessageList.map(({ toastId, message }) => (
          <ToastMessage key={toastId} message={message} />
        ))}
      </div>
    </Portal>
  );
};
