'use client';
import { useSearchParams } from 'next/navigation';

import { useWithdrawalCommunity } from '~/api/domain/community.api';
import { Menu } from '~/components/Menu';

export const PlanetMenu = () => {
  const searchParams = useSearchParams();
  const communityIdParam = searchParams.get('communityId');
  const communityId = isNaN(Number(communityIdParam)) ? -1 : Number(communityIdParam);
  const { mutate } = useWithdrawalCommunity(communityId);

  const onClickEscapePlanet = () => {
    mutate();
  };
  return (
    <Menu className="px-layout-sm">
      <Menu.Header>행성 관리</Menu.Header>
      <Menu.Element onClick={onClickEscapePlanet}>
        <span>행성 떠나기</span>
      </Menu.Element>
    </Menu>
  );
};
