import 'server-only';

import { Suspense } from 'react';

import { getCommunityMyIdCardDetailServer } from '~/api/domain/idCard.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { IdCard } from '~/modules/IdCard';
import { IdCardEditButton } from '~/modules/IdCardEditButton';

type MyPageProps = {
  communityId: number;
};

const MyPageIdCardComponent = async ({ communityId }: MyPageProps) => {
  const { idCardDetailsDto } = await getCommunityMyIdCardDetailServer(communityId);
  const { idCardId, nickname, aboutMe, characterType, keywords } = idCardDetailsDto;
  const keywordTitles = keywords.map(keyword => keyword.title);

  return (
    <div>
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
  );
};

export const MyPageIdCard = ({ communityId }: MyPageProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <MyPageIdCardComponent communityId={communityId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
