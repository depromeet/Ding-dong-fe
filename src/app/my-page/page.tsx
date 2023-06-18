'use client';
import { useGetCommunityMyIdCardDetail } from '~/api/domain/idCard.api';
import { IdCard } from '~/modules/IdCard';
import { IdCardEditButton } from '~/modules/IdCardEditButton';
import { PlanetCreationButton } from '~/modules/PlanetCreationButton';
import { useCommunityStore } from '~/stores/community.store';

export const dynamic = 'force-dynamic';

const MyPage = () => {
  const { communityId } = useCommunityStore();

  // TODO communityId가 없을 때 에러 처리 구체화

  const { data, isError, isLoading } = useGetCommunityMyIdCardDetail(communityId || 0);

  // TODO: suspense와 error boundary 정해지면 에러 및 로딩 처리 layout으로 이동
  if (isError || isLoading) {
    return <main>error</main>;
  }

  const { idCardId, nickname, aboutMe, characterType, keywords } = data.idCardDetailsDto;
  const keywordTitles = keywords.map(keyword => keyword.title);

  return (
    <main className="pt-35pxr">
      <div className="mx-layout-l">
        <div className="mb-16pxr flex w-full justify-between">
          <h2 className="text-h3 text-grey-800">내 주민증</h2>
          <IdCardEditButton />
        </div>
        <IdCard
          idCardId={idCardId}
          nickname={nickname}
          aboutMe={aboutMe}
          characterType={characterType}
          keywordTitles={keywordTitles}
        />
      </div>
      <div className="mx-layout-sm mt-28pxr">
        <PlanetCreationButton />
      </div>
    </main>
  );
};

export default MyPage;
