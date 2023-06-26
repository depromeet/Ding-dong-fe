import { create } from 'zustand';

type ToastMessageModel = {
  toastId: string;
  message: string;
};

type ToastMessageStore = {
  toastMessageList: ToastMessageModel[];
  fireToast: (message: string, duration?: number) => void;
  removeToast: (toastId: string) => void;
};

const DEFAULT_DURATION = 3000;

export const useToastMessageStore = create<ToastMessageStore>(set => ({
  toastMessageList: [],
  fireToast: (message: string, duration: number = DEFAULT_DURATION) => {
    const toastId = Date.now().toString();
    set(state => ({
      toastMessageList: [...state.toastMessageList, { toastId, message }],
    }));
    // 3초뒤에 제거
    setTimeout(() => {
      set(state => ({
        toastMessageList: state.toastMessageList.filter(toast => toast.toastId !== toastId),
      }));
    }, duration);
  },
  removeToast: (toastId: string) => {
    set(state => ({
      toastMessageList: state.toastMessageList.filter(toast => toast.toastId !== toastId),
    }));
  },
}));
