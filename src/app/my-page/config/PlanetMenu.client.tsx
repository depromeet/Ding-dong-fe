'use client';
import { Menu } from '~/components/Menu';
import { useCommunityStore } from '~/stores/community.store';

export const PlanetMenu = () => {
  const { communityId } = useCommunityStore();

  const onClickEscapePlanet = () => {
    console.log('행성 떠나기 로직 추가 예정', communityId);
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
