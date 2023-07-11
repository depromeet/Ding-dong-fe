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

const PlanetAdminEditComponent = async ({ planetId }: PlanetAdminEditProps) => {
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
        <CommunityAdminEdit {...communityDetailsDto} />;
      </HydrationProvider>
    </>
  );
};

export const PlanetAdminEdit = ({ planetId }: PlanetAdminEditProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <PlanetAdminEditComponent planetId={planetId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
