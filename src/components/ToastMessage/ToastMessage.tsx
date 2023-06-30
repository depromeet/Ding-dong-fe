import { ToastMessageModel, ToastMessageType } from '~/stores/toastMessage.store';
import { tw } from '~/utils/tailwind.util';

type ToastMessageProps = Omit<ToastMessageModel, 'toastId'>;

const colors: Record<ToastMessageType, string> = {
  error: 'bg-grey-700 text-white',
  success: 'bg-grey-700 text-white',
  info: 'bg-grey-700 text-white',
};

export const ToastMessage = ({ message, type }: ToastMessageProps) => {
  return <div className={tw('rounded-[12px]  p-16pxr text-b2', colors[type])}>{message}</div>;
};
