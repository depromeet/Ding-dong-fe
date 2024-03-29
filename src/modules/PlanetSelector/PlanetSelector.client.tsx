'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { useGetCommunityList } from '~/api/domain/community.api';
import { useBottomSheet } from '~/components/BottomSheet';
import BottomSheet from '~/components/BottomSheet/BottomSheet';
import { ArrowVerticalIcon, PlusIcon } from '~/components/Icon';
import { usePlanetNavigate } from '~/hooks/usePlanetNavigate';
import { CommunityList } from '~/modules/PlanetSelector/CommunityList.client';
import { useCommunityStore } from '~/stores/community.store';
import { getUserIdClient } from '~/utils/auth/getUserId.client';
import { getCookie } from '~/utils/cookie.util';
import { tw } from '~/utils/tailwind.util';
import { DINGDONG_PLANET } from '~/utils/variable';

export const PlanetSelector = () => {
  const bottomSheetHandlers = useBottomSheet();
  const pathname = usePathname();
  const userId = getUserIdClient();
  const { data: communityList } = useGetCommunityList(userId ?? -1);
  const { communityId: communityIdInStore, switchCommunity } = useCommunityStore();
  const { extractPlanetIdFromPathname } = usePlanetNavigate();

  const communityIdCookey = getCookie('communityId');
  const communityIdCookeyValue = communityIdCookey ? Number(communityIdCookey) : undefined;
  const communityId =
    communityIdInStore > 0
      ? communityIdInStore
      : communityIdCookeyValue ?? communityList?.communityListDtos.slice(-1)[0]?.communityId;

  const router = useRouter();

  const onClickCreateButton = () => {
    router.push('/admin/planet/create');
  };

  const switchPlanetIdByPathname = useCallback(
    (planetId?: number) => {
      const isSamePlanetIdFromPathname = (pathPlanetId: number) => pathPlanetId === planetId;

      const pathPlanetId = extractPlanetIdFromPathname(pathname);

      if (!pathPlanetId) {
        switchCommunity(DINGDONG_PLANET.DINGDONG_PLANET_ID);
        return;
      }

      if (isSamePlanetIdFromPathname(pathPlanetId)) {
        return;
      }

      switchCommunity(pathPlanetId);
    },
    [extractPlanetIdFromPathname, pathname, switchCommunity],
  );

  useEffect(() => {
    switchPlanetIdByPathname(communityId);
  }, [pathname, communityId, switchPlanetIdByPathname]);

  const defaultCommunity = communityList?.communityListDtos.find(
    community => community.communityId === communityId,
  );

  return (
    <div className="w-full">
      <div
        className="flex w-full cursor-pointer items-center gap-8pxr"
        onClick={bottomSheetHandlers.onOpen}
      >
        <p className="mix-w-[70%] overflow-hidden text-ellipsis whitespace-nowrap text-h1 text-grey-800">
          {defaultCommunity?.title}
        </p>
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
