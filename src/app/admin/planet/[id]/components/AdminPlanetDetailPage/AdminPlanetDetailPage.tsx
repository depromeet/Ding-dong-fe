import 'server-only';

import { Suspense } from 'react';

import { communityQueryKey } from '~/api/domain/community.api';
import { getCommunityDetailServer } from '~/api/domain/community.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { HydrationProvider } from '~/components/HydrationProvider';
import { CommunityAdmin } from '~/modules/CommunityAdmin/CommunityAdmin';

type AdminPlanetDetailProps = {
  planetId: number;
};

const AdminPlanetDetailComponent = ({ planetId }: AdminPlanetDetailProps) => {
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
        <CommunityAdmin communityId={planetId} />
      </HydrationProvider>
    </>
  );
};

export const AdminPlanetDetail = ({ planetId }: AdminPlanetDetailProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        <AdminPlanetDetailComponent planetId={planetId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
