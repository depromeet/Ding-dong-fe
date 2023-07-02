'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useGetCommunityList } from '~/api/domain/community.api';
import { useBottomSheet } from '~/components/BottomSheet';
import BottomSheet from '~/components/BottomSheet/BottomSheet';
import { ArrowVerticalIcon, PlusIcon } from '~/components/Icon';
import { CommunityList } from '~/modules/PlanetSelector/CommunityList.client';
import { useCommunityStore } from '~/stores/community.store';
import { getUserIdClient } from '~/utils/auth/getUserId.client';
import { tw } from '~/utils/tailwind.util';

export const PlanetSelector = () => {
  const bottomSheetHandlers = useBottomSheet();
  const userId = getUserIdClient();
  const { data: communityList } = useGetCommunityList(userId ?? -1);
  const { communityId, switchCommunity } = useCommunityStore();

  const router = useRouter();

  const onClickCreateButton = () => {
    router.push('/admin/community/create');
  };

  useEffect(() => {
    if (!communityId && communityList?.communityListDtos[0]) {
      switchCommunity(communityList?.communityListDtos[0].communityId);
    }
  }, [communityId, communityList?.communityListDtos, switchCommunity]);

  const defaultCommunity = communityList?.communityListDtos.find(
    community => community.communityId === communityId,
  );

  return (
    <div>
      <div className="flex items-center gap-8pxr" onClick={bottomSheetHandlers.onOpen}>
        <p className="text-h1 text-grey-800">{defaultCommunity?.title}</p>
        <ArrowVerticalIcon />
      </div>
      <BottomSheet {...bottomSheetHandlers}>
        <BottomSheet.Header>내 행성</BottomSheet.Header>
        <BottomSheet.Content>
          <div className="flex flex-col gap-20pxr">
            <CommunityList onClick={bottomSheetHandlers.onClose} />
            <div className="rounded-xl border border-grey-200 bg-grey-50">
              <button className="flex items-center gap-20pxr px-20pxr py-16pxr">
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-3xl bg-grey-100">
                  <PlusIcon />
                </div>
                <p
                  onClick={onClickCreateButton}
                  className={`${tw('text-b1 text-[#282828]', 'font-bold')}`}
                >
                  행성 만들기
                </p>
              </button>
            </div>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};
