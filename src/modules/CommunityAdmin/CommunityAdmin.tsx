import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

import { Button } from '~/components/Button';
import { KakaoIcon } from '~/components/Icon/KakaoIcon';
import { TopNavigation } from '~/components/TopNavigation';
import { CommunityBgImage, CommunityProfile } from '~/modules/CommunityProfile';
import { CommunityDetailModel } from '~/types/community';

type CommunityAdminProps = Omit<CommunityDetailModel, 'invitationCode'>;

export const CommunityAdmin = ({
  communityId,
  logoImageUrl,
  coverImageUrl,
  title,
  idCardCount,
  description,
}: Omit<CommunityAdminProps, 'invitationCode'>) => {
  const router = useRouter();
  const { id } = useParams();

  const onEditClick = () => {
    router.push(`/admin/planet/${id}/edit`);
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
      </TopNavigation>
      <CommunityBgImage coverImageUrl={coverImageUrl} isEditable communityId={communityId} />
      <div className="mt-16pxr px-20pxr">
        <CommunityProfile
          logoImageUrl={logoImageUrl}
          idCardCount={idCardCount}
          description={description}
          top={
            <div className="mt-6pxr flex items-center justify-between py-10pxr">
              <h1 className="text-h1 font-bold text-gray-800">{title}</h1>
              <Button
                size="small"
                color="secondary"
                className="w-fit  px-12pxr py-8pxr"
                onClick={onEditClick}
              >
                수정
              </Button>
            </div>
          }
        />
        <div className="mt-28pxr flex flex-col gap-16pxr">
          <Button color="primary" size="xLarge">
            초대 링크 공유하기
          </Button>
          <Button
            color="primary"
            size="medium"
            className="flex justify-center gap-4pxr bg-[#F9DF4A] pb-15pxr pt-17pxr text-[#391B1B]"
          >
            <KakaoIcon className="mt-1pxr" />
            카카오톡으로 초대하기
          </Button>
        </div>
      </div>
    </div>
  );
};
