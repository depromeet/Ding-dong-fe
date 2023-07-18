import { useState } from 'react';

/**
 * 단순 실행만 할 경우 "OPEN"
 */
export type ConfirmType = 'OK' | 'CANCEL' | 'OPEN';

export const useConfirmPopup = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const [resolveFunc, setResolveFunc] = useState<((result: boolean) => void) | null>(null);

  const openPopup = () => {
    setIsOpen(true);

    return new Promise<boolean>(resolve => {
      setResolveFunc(() => resolve);
    });
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const confirm = (type: ConfirmType = 'OPEN') => {
    const isOk = type === 'OK';
    if (resolveFunc) {
      resolveFunc(isOk);
      setResolveFunc(null);
    }
  };

  return {
    isOpen,
    openPopup,
    closePopup,
    confirm,
  };
};
