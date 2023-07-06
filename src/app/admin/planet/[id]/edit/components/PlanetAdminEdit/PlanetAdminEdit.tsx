import 'server-only';

import { Suspense } from 'react';

import { getCommunityDetailServer } from '~/api/domain/community.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { CommunityAdminEdit } from '~/modules/CommunityAdmin/CommunityAdminEdit.client';

type PlanetAdminEditProps = {
  planetId: number;
};

const PlanetAdminEditComponent = async ({ planetId }: PlanetAdminEditProps) => {
  const { communityDetailsDto } = await getCommunityDetailServer(planetId);

  return <CommunityAdminEdit {...communityDetailsDto} />;
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
