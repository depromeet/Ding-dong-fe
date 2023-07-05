import 'server-only';

import { Suspense } from 'react';

import { getCommunityMyIdCardDetailServer } from '~/api/domain/idCard.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { IdCardEditor } from '~/modules/IdCardEditor';

type EditMyPageProps = {
  communityId: number;
};

const MyPageEditCardComponent = async ({ communityId }: EditMyPageProps) => {
  const { idCardDetailsDto } = await getCommunityMyIdCardDetailServer(communityId);
  const { idCardId, nickname, aboutMe, profileImageUrl, keywords } = idCardDetailsDto;

  return (
    <IdCardEditor
      idCardId={idCardId}
      nickname={nickname}
      aboutMe={aboutMe}
      profileImageUrl={profileImageUrl}
      keywords={keywords}
    />
  );
};

export const MyPageEditIdCard = ({ communityId }: EditMyPageProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <MyPageEditCardComponent communityId={communityId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
