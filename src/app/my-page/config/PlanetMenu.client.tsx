'use client';
import { Menu } from '~/components/Menu';

export const PlanetMenu = () => {
  const onClickEscapePlanet = () => {
    console.log('행성 떠나기 로직 추가 예정');
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
