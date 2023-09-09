'use client';

import { UseBottomSheetReturn } from '~/components/BottomSheet';
import BottomSheet from '~/components/BottomSheet/BottomSheet';

type NudgeListProps = {
  bottomSheetHandlers: UseBottomSheetReturn;
};

export const NudgeList = ({ bottomSheetHandlers }: NudgeListProps) => {
  return (
    <div className="w-full">
      <BottomSheet {...bottomSheetHandlers}>
        <BottomSheet.Header>받은 딩동</BottomSheet.Header>
        <BottomSheet.Content></BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};
