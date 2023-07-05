'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Button } from '~/components/Button';
import { TopNavigation } from '~/components/TopNavigation';
import { CommunityBgImage, CommunityProfile } from '~/modules/CommunityProfile';
import { InvitationButtons } from '~/modules/InvitationButtons/InvitationButtons.client';
import { CommunityDetailModel } from '~/types/community';

type CommunityAdminProps = Omit<CommunityDetailModel, 'invitationCode'>;

export const CommunityAdmin = ({
  communityId,
  logoImageUrl,
  coverImageUrl,
  title,
  userCount,
  description,
}: Omit<CommunityAdminProps, 'invitationCode'>) => {
  const router = useRouter();

  const pathname = usePathname();
  const goEdit = () => {
    router.push(`${pathname}/edit`);
  };

  const onClickDoneButton = () => {
    // TODO: 커버 사진 변경 api 요청 로직 추가
    router.push(`/planet/${communityId}`);
  };

  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton backLink="" />
        </TopNavigation.Left>
        <TopNavigation.Title>
          <p className="text-h5">행성 관리</p>
        </TopNavigation.Title>
        <TopNavigation.Right>
          <button onClick={onClickDoneButton} className="text-h5 text-primary-500">
            완료
          </button>
        </TopNavigation.Right>
      </TopNavigation>
      <CommunityBgImage coverImageUrl={coverImageUrl} isEditable communityId={communityId} />
      <div className="mt-16pxr px-20pxr">
        <CommunityProfile
          logoImageUrl={logoImageUrl}
          userCount={userCount}
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
      </div>
    </div>
  );
};
