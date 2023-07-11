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

const AdminPlanetDetailComponent = async ({ planetId }: AdminPlanetDetailProps) => {
  const getCommunityDetailQuery = async () => {
    const { communityDetailsDto } = await getCommunityDetailServer(planetId);
    return communityDetailsDto;
  };
  const { communityDetailsDto } = await getCommunityDetailServer(planetId);

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <HydrationProvider
        queryKey={communityQueryKey.communityDetail(planetId)}
        queryFn={getCommunityDetailQuery}
      >
        <CommunityAdmin {...communityDetailsDto} />
      </HydrationProvider>
    </>
  );
};

export const AdminPlanetDetail = ({ planetId }: AdminPlanetDetailProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <AdminPlanetDetailComponent planetId={planetId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
