import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { getCommunityDetailServer } from '~/api/domain/community.api.server';

type PlanetLayoutProps = {
  params: {
    communityId: string;
  };
};

export async function generateMetadata({ params }: PlanetLayoutProps): Promise<Metadata> {
  const communityId = Number(params.communityId);

  try {
    const { communityDetailsDto } = await getCommunityDetailServer(communityId);
    const title = communityDetailsDto.title;
    return {
      title,
    };
  } catch (error) {
    console.error(error);
    return {
      title: '',
    };
  }
}

const PlanetLayout = ({ children }: PropsWithChildren<PlanetLayoutProps>) => {
  return <div>{children}</div>;
};

export default PlanetLayout;
