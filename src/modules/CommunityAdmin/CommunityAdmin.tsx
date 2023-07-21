'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useGetCommunityDetail } from '~/api/domain/community.api';
import { Button } from '~/components/Button';
import { TopNavigation } from '~/components/TopNavigation';
import { CommunityBgImage, CommunityProfile } from '~/modules/CommunityProfile';
import { InvitationButtons } from '~/modules/InvitationButtons/InvitationButtons.client';
import { CommunityDetailModel } from '~/types/community';
import { DINGDONG_PLANET } from '~/utils/variable';

type CommunityAdminProps = Pick<CommunityDetailModel, 'communityId'>;

export const CommunityAdmin = ({ communityId }: CommunityAdminProps) => {
  const router = useRouter();

  const pathname = usePathname();
  const goEdit = () => {
    router.push(`${pathname}/edit`);
  };
  const isDingDongPlanet = communityId === DINGDONG_PLANET.DINGDONG_PLANET_ID;
  const { data } = useGetCommunityDetail(communityId);

  if (!data?.communityDetailsDto) {
    return <div></div>;
  }

  const { userCount, title, logoImageUrl, description } = data.communityDetailsDto;
  const finalUserCount = isDingDongPlanet ? 4 : userCount ?? 0;

  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton />
        </TopNavigation.Left>
        <TopNavigation.Title>
          <p className="text-h5">행성 관리</p>
        </TopNavigation.Title>
        <TopNavigation.Right></TopNavigation.Right>
      </TopNavigation>
      <CommunityBgImage isEditable community={data.communityDetailsDto} />
      <main className="mt-16pxr px-20pxr">
        <CommunityProfile
          logoImageUrl={logoImageUrl}
          userCount={finalUserCount}
          description={description}
          top={
            <div className="mt-6pxr flex items-center justify-between gap-12pxr py-10pxr">
              <h1 className="text-h1 font-bold text-gray-800">{title}</h1>
              <Button
                onClick={goEdit}
                size="small"
                color="secondary"
                width="min-w-fit"
                className="px-12pxr py-8pxr text-detail font-bold"
              >
                수정
              </Button>
            </div>
          }
        />
        <div className="mt-28pxr ">
          <InvitationButtons communityId={communityId} />
        </div>
      </main>
      <div className="h-[50px] bg-white" />
    </div>
  );
};
