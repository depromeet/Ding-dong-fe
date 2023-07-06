import 'server-only';

import { Suspense } from 'react';

import { getCommunityDetailServer } from '~/api/domain/community.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { CommunityAdmin } from '~/modules/CommunityAdmin/CommunityAdmin';

type AdminPlanetDetailProps = {
  planetId: number;
};

const AdminPlanetDetailComponent = async ({ planetId }: AdminPlanetDetailProps) => {
  const { communityDetailsDto } = await getCommunityDetailServer(planetId);

  return <CommunityAdmin {...communityDetailsDto} />;
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
