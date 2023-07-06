import { Suspense } from 'react';

import { idCardQueryKey } from '~/api/domain/idCard.api';
import { getCommunityMyIdCardDetailServer } from '~/api/domain/idCard.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { HydrationProvider } from '~/components/HydrationProvider';
import { IdCardEditor } from '~/modules/IdCardEditor';

type EditMyPageProps = {
  communityId: number;
};

const MyPageEditCardComponent = ({ communityId }: EditMyPageProps) => {
  const getCommunityMyIdCardDetailQuery = async () => {
    const { idCardDetailsDto } = await getCommunityMyIdCardDetailServer(communityId);

    return {
      idCardDetailsDto,
    };
  };

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <HydrationProvider
        queryKey={idCardQueryKey.myCommunity(communityId)}
        queryFn={getCommunityMyIdCardDetailQuery}
      >
        <IdCardEditor communityId={communityId} />
      </HydrationProvider>
    </>
  );
};

export const MyPageEditIdCard = ({ communityId }: EditMyPageProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        <MyPageEditCardComponent communityId={communityId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
