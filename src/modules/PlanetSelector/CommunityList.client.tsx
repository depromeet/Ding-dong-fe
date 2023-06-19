'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { useGetCommunityList } from '~/api/domain/community.api';
import { Divider } from '~/components/Divider';
import { useCommunityStore } from '~/stores/community.store';
import { CommunityListModel } from '~/types/community';
import { tw } from '~/utils/tailwind.util';

export const CommunityList = ({ ...rest }) => {
  // TODO: userId 수정 필요
  const userId = '1';
  const { data: communityList } = useGetCommunityList(userId);
  const pathname = usePathname();
  const router = useRouter();
  const { switchCommunity } = useCommunityStore();

  const handlePlanetSwitch = (title: string, id: number) => {
    router.push(`${pathname}/${id}`);
    switchCommunity(title, id);
  };

  return (
    <ul className="rounded-xl border border-grey-200 bg-grey-50" {...rest}>
      {communityList &&
        communityList.communityListDtos.map((community: CommunityListModel) => (
          <li
            key={community.communityId}
            onClick={() => handlePlanetSwitch(community.title, community.communityId)}
          >
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
                <p className={`${tw('text-b1 text-[#282828]', 'font-bold')}`}>{community.title}</p>
                <p className="text-b2 text-[#848484]">{community.idCardCount} 주민</p>
              </div>
            </div>
            <Divider />
          </li>
        ))}
    </ul>
  );
};
