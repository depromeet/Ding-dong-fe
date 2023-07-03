import 'server-only';

import { Suspense } from 'react';

import { getCommunityMyIdCardDetailServer } from '~/api/domain/idCard.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { IdCardEditor } from '~/modules/IdCardEditor';

type EditMyPageProps = {
  id: number;
};

const MyPageEditCardComponent = async ({ id }: EditMyPageProps) => {
  const { idCardDetailsDto } = await getCommunityMyIdCardDetailServer(id);
  const { idCardId, nickname, aboutMe, profileImageUrl, keywords } = idCardDetailsDto;

  return (
    <main>
      <IdCardEditor
        idCardId={idCardId}
        nickname={nickname}
        aboutMe={aboutMe}
        profileImageUrl={profileImageUrl}
        keywords={keywords}
      />
    </main>
  );
};

export const MyPageEditIdCard = ({ id }: EditMyPageProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <MyPageEditCardComponent id={id} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
