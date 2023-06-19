'use client';
import { Menu } from '~/components/Menu';

export const UserMenu = () => {
  const onClickLogout = () => {
    console.log('로그 아웃 로직 추가 예정');
  };

  const onClickSignOut = () => {
    console.log('회원 탈퇴로직 추가 예정');
  };

  return (
    <Menu className="px-layout-sm">
      <Menu.Header>계정 관리</Menu.Header>
      <Menu.Element onClick={onClickLogout}>
        <span>로그아웃</span>
      </Menu.Element>
      <Menu.Element onClick={onClickSignOut}>
        <span>회원 탈퇴</span>
      </Menu.Element>
    </Menu>
  );
};
