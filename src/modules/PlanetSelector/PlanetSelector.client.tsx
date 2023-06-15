'use client';
import Image from 'next/image';

import { useGetCommunityList } from '~/api/domain/community.api';
import { useBottomSheet } from '~/components/BottomSheet';
import BottomSheet from '~/components/BottomSheet/BottomSheet';
import { Divider } from '~/components/Divider';
import { TopNavigation } from '~/components/TopNavigation';
import { CommunityListModel } from '~/types/community';
import { tw } from '~/utils/tailwind.util';

export const PlanetSelector = () => {
  // TODO: userId 수정 필요
  const userId = '1';
  const bottomSheetHandlers = useBottomSheet();
  const { data: communityList } = useGetCommunityList(userId);

  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          <p className="text-h1 text-grey-800" onClick={bottomSheetHandlers.onOpen}>
            planet
          </p>
        </TopNavigation.Left>
      </TopNavigation>
      <BottomSheet {...bottomSheetHandlers}>
        <BottomSheet.Header>내 행성</BottomSheet.Header>
        <BottomSheet.Content>
          <ul className="rounded-xl border border-grey-200 bg-grey-50">
            {communityList &&
              communityList.communityListDtos.map((community: CommunityListModel) => (
                <li key={community.communityId}>
                  <div className="flex items-center gap-20pxr p-20pxr">
                    <Image
                      width={36}
                      height={36}
                      src={community.logoImageUrl}
                      alt={`${community.title} logo image`}
                      style={{
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="flex flex-col gap-4pxr">
                      <p className={`${tw('text-b1 text-[#282828]', 'font-bold')}`}>
                        {community.title}
                      </p>
                      <p className="text-b2 text-[#848484]">{community.idCardCount} 주민</p>
                    </div>
                  </div>
                  <Divider />
                </li>
              ))}
          </ul>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};
