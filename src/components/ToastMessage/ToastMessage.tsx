import { ToastMessageModel, ToastMessageType } from '~/stores/toastMessage.store';
import { tw } from '~/utils/tailwind.util';

type ToastMessageProps = Omit<ToastMessageModel, 'toastId'>;

const colors: Record<ToastMessageType, string> = {
  error: 'bg-grey-500 text-white',
  success: 'bg-grey-500 text-white',
  info: 'bg-grey-500 text-white',
};

export const ToastMessage = ({ message, type }: ToastMessageProps) => {
  return (
    <div
      className={tw(
        'absolute left-1/2 top-60pxr w-[calc(100vw-40px)] max-w-[calc(theme(maxWidth.content)-40px)] -translate-x-1/2 transform',
        'rounded-[12px] p-16pxr text-b2',
        colors[type],
      )}
    >
      {message}
    </div>
  );
};
