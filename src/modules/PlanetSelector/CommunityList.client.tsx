'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { useGetCommunityList } from '~/api/domain/community.api';
import { Divider } from '~/components/Divider';
import { useCommunityStore } from '~/stores/community.store';
import { CommunityListModel } from '~/types/community';
import { getUserIdClient } from '~/utils/auth/getUserId.client';
import { tw } from '~/utils/tailwind.util';

export const CommunityList = ({ ...rest }) => {
  const userId = getUserIdClient();
  const { data: communityList } = useGetCommunityList(userId ?? -1);
  const pathname = usePathname();
  const router = useRouter();
  const { switchCommunity } = useCommunityStore();

  const replaceIdInRoute = (newId: number) => {
    const pathIdRegex = /\/\d+$/; //  문자열의 끝에 슬래시로 시작하고 이어서 하나 이상의 연속된 숫자가 있는 패턴 ex) /123
    const replacedRoute = pathname.replace(pathIdRegex, `/${newId}`);
    router.push(replacedRoute);
  };

  const handlePlanetSwitch = (title: string, id: number) => {
    replaceIdInRoute(id);
    switchCommunity(id);
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
