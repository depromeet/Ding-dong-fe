'use client';
import { Suspense } from 'react';

import { useGetCommunityMyIdCardDetail } from '~/api/domain/idCard.api';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { IdCard } from '~/modules/IdCard';
import { IdCardEditButton } from '~/modules/IdCardEditButton';

type MyPageProps = {
  communityId: number;
};

const MyPageIdCardComponent = ({ communityId }: MyPageProps) => {
  const { data: idCardDetailsDto } = useGetCommunityMyIdCardDetail(communityId);

  if (!idCardDetailsDto?.idCardDetailsDto) {
    return <div></div>;
  }

  const {
    idCardId,
    nickname,
    aboutMe,
    characterType,
    keywords,
    commentCount,
    profileImageUrl,
    toNudgeType,
  } = idCardDetailsDto.idCardDetailsDto;
  const keywordTitles = keywords?.map(keyword => keyword.title);

  return (
    <div>
      <div className="mb-16pxr flex w-full justify-between">
        <h2 className="text-h3 text-grey-800">내 주민증</h2>
        <IdCardEditButton />
      </div>
      <IdCard
        idCardId={idCardId}
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        aboutMe={aboutMe}
        characterType={characterType}
        keywordTitles={keywordTitles}
        commentCount={commentCount}
        toNudgeType={toNudgeType}
      />
    </div>
  );
};

export const MyPageIdCard = ({ communityId }: MyPageProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        <MyPageIdCardComponent communityId={communityId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
