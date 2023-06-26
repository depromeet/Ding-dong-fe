type ToastMessageProps = {
  message: string;
};

export const ToastMessage = ({ message }: ToastMessageProps) => {
  return <div className="rounded-[12px] bg-grey-700 p-16pxr text-b2 text-white">{message}</div>;
};
