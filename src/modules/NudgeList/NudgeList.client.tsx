'use client';

import { useGetNudgeList } from '~/api/domain/nudge.api.client';
import { UseBottomSheetReturn } from '~/components/BottomSheet';
import BottomSheet from '~/components/BottomSheet/BottomSheet';
import { NudgeItem } from '~/modules/NudgeItem';

type NudgeListProps = {
  bottomSheetHandlers: UseBottomSheetReturn;
  idCardsId: number;
  communityId: number;
};

export const NudgeList = ({ bottomSheetHandlers, idCardsId, communityId }: NudgeListProps) => {
  const { data } = useGetNudgeList(idCardsId);
  return (
    <div className="w-full">
      <BottomSheet {...bottomSheetHandlers}>
        <BottomSheet.Header>받은 딩동</BottomSheet.Header>
        <BottomSheet.Content>
          <ul className="flex flex-col gap-24pxr">
            {data?.nudgeInfoDtos.map((nudge, idx) => (
              <NudgeItem communityId={communityId} key={idx} {...nudge} />
            ))}
          </ul>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};
