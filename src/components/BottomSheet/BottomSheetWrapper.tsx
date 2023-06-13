'use client';

import { BottomSheetProps } from '~/components/BottomSheet/BottomSheet';

export const BottomSheetWrapper = ({
  children,
  onClose,
}: Pick<BottomSheetProps, 'children' | 'onClose'>) => {
  return (
    <div onClick={onClose} className="fixed left-0 top-0 z-top2 h-full w-full bg-gray-900/70">
      {children}
    </div>
  );
};
