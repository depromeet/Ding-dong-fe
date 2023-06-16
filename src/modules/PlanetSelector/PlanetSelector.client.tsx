'use client';

import { useBottomSheet } from '~/components/BottomSheet';
import BottomSheet from '~/components/BottomSheet/BottomSheet';
import { ArrowIcon, PlusIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';
import { CommunityList } from '~/modules/PlanetSelector/CommunityList';
import { useCommunityStore } from '~/stores/community.store';
import { tw } from '~/utils/tailwind.util';

export const PlanetSelector = () => {
  const bottomSheetHandlers = useBottomSheet();
  const { communityTitle } = useCommunityStore();

  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          <div className="flex items-center gap-8pxr" onClick={bottomSheetHandlers.onOpen}>
            <p className="text-h1 text-grey-800">{communityTitle}</p>
            <ArrowIcon />
          </div>
        </TopNavigation.Left>
      </TopNavigation>
      <BottomSheet {...bottomSheetHandlers}>
        <BottomSheet.Header>내 행성</BottomSheet.Header>
        <BottomSheet.Content>
          <div className="flex flex-col gap-20pxr">
            <CommunityList />
            <div className="rounded-xl border border-grey-200 bg-grey-50">
              <button className="flex items-center gap-20pxr px-20pxr py-16pxr">
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-3xl bg-grey-100">
                  <PlusIcon />
                </div>
                <p className={`${tw('text-b1 text-[#282828]', 'font-bold')}`}>행성 만들기</p>
              </button>
            </div>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};
