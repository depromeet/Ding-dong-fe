'use client';

import { UseBottomSheetReturn } from '~/components/BottomSheet';
import BottomSheet from '~/components/BottomSheet/BottomSheet';

type BellListProps = {
  bottomSheetHandlers: UseBottomSheetReturn;
};

export const BellList = ({ bottomSheetHandlers }: BellListProps) => {
  return (
    <div className="w-full">
      <BottomSheet {...bottomSheetHandlers}>
        <BottomSheet.Header>받은 딩동</BottomSheet.Header>
        <BottomSheet.Content></BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};
