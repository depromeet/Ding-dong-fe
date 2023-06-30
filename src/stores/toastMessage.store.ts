import _ from 'lodash';
import { create } from 'zustand';

export type ToastMessageType = 'error' | 'success' | 'info';

export type ToastMessageModel = {
  toastId: string;
  message: string;
  type: ToastMessageType;
};

type ToastMessageStore = {
  toastMessageList: ToastMessageModel[];
  errorToast: (message: string, duration?: number) => void;
  successToast: (message: string, duration?: number) => void;
  infoToast: (message: string, duration?: number) => void;
  removeToast: (toastId: string) => void;
};

const DEFAULT_DURATION = 3000;

export const useToastMessageStore = create<ToastMessageStore>(set => {
  const fireToast = (
    message: string,
    type: ToastMessageType,
    duration: number = DEFAULT_DURATION,
  ) => {
    const toastId = Date.now().toString();
    set(state => ({
      toastMessageList: [...state.toastMessageList, { toastId, message, type }],
    }));

    _.delay(() => {
      set(state => ({
        toastMessageList: state.toastMessageList.filter(toast => toast.toastId !== toastId),
      }));
    }, duration);
  };
  return {
    toastMessageList: [],
    errorToast: (message: string, duration: number = DEFAULT_DURATION) => {
      fireToast(message, 'error', duration);
    },
    successToast: (message: string, duration: number = DEFAULT_DURATION) => {
      fireToast(message, 'success', duration);
    },
    infoToast: (message: string, duration: number = DEFAULT_DURATION) => {
      fireToast(message, 'info', duration);
    },
    removeToast: (toastId: string) => {
      set(state => ({
        toastMessageList: state.toastMessageList.filter(toast => toast.toastId !== toastId),
      }));
    },
  };
});
