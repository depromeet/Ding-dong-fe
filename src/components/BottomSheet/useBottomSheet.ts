'use client';

import { useState } from 'react';

type UseBottomSheetProps =
  | {
      defaultOpen?: boolean;
    }
  | undefined;
export type UseBottomSheetReturn = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};
export const useBottomSheet = (bottomProps?: UseBottomSheetProps): UseBottomSheetReturn => {
  const { defaultOpen = false } = bottomProps ?? {};
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};
