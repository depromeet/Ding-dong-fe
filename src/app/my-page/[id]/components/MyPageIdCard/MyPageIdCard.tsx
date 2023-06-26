import 'server-only';

import { Suspense } from 'react';

import { getCommunityMyIdCardDetailServer } from '~/api/domain/idCard.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { IdCard } from '~/modules/IdCard';

type MyPageProps = {
  id: number;
};

const MyPageIdCardComponent = async ({ id }: MyPageProps) => {
  const { idCardDetailsDto } = await getCommunityMyIdCardDetailServer(id);
  const { idCardId, nickname, aboutMe, characterType, keywords } = idCardDetailsDto;
  const keywordTitles = keywords.map(keyword => keyword.title);

  return (
    <IdCard
      idCardId={idCardId}
      nickname={nickname}
      aboutMe={aboutMe}
      characterType={characterType}
      keywordTitles={keywordTitles}
    />
  );
};

export const MyPageIdCard = ({ id }: MyPageProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <MyPageIdCardComponent id={id} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
