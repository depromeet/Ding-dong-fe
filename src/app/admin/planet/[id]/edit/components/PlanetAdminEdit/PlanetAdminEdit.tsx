import 'server-only';

import { Suspense } from 'react';

import { communityQueryKey } from '~/api/domain/community.api';
import { getCommunityDetailServer } from '~/api/domain/community.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { HydrationProvider } from '~/components/HydrationProvider';
import { CommunityAdminEdit } from '~/modules/CommunityAdmin/CommunityAdminEdit.client';

type PlanetAdminEditProps = {
  planetId: number;
};

const PlanetAdminEditComponent = ({ planetId }: PlanetAdminEditProps) => {
  const getCommunityDetailQuery = async () => {
    const data = await getCommunityDetailServer(planetId);
    return data;
  };

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <HydrationProvider
        queryKey={communityQueryKey.communityDetail(planetId)}
        queryFn={getCommunityDetailQuery}
      >
        <CommunityAdminEdit communityId={planetId} />
      </HydrationProvider>
    </>
  );
};

export const PlanetAdminEdit = ({ planetId }: PlanetAdminEditProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        <PlanetAdminEditComponent planetId={planetId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
