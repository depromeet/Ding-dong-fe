import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { getCommunityDetailServer } from '~/api/domain/community.api.server';

type AdminCommunityDetailLayoutProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: AdminCommunityDetailLayoutProps): Promise<Metadata> {
  const communityId = Number(params.id);

  try {
    const { communityDetailsDto } = await getCommunityDetailServer(communityId);
    const title = `${communityDetailsDto.title} / 관리자 페이지`;
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

const AdminCommunityDetailLayout = ({
  children,
}: PropsWithChildren<AdminCommunityDetailLayoutProps>) => {
  return <div>{children}</div>;
};

export default AdminCommunityDetailLayout;
