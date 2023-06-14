'use client';
import { Divider } from '~/components/Divider';
import { Menu } from '~/components/Menu';
import { TopNavigation } from '~/components/TopNavigation';

const MyPageConfig = () => {
  // leavePlanet, exitPlanet
  const onClickEscapePlanet = () => {
    console.log('행성 떠나기 로직 추가 예정');
  };

  const onClickLogout = () => {
    console.log('로그 아웃 로직 추가 예정');
  };

  const onClickSignOut = () => {
    console.log('회원 탈퇴로직 추가 예정');
  };

  return (
    <main>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton />
        </TopNavigation.Left>
        <TopNavigation.Title>
          <h1 className="text-h5 font-semibold text-black">설정</h1>
        </TopNavigation.Title>
      </TopNavigation>
      <div className="pt-[50px]">
        <Menu>
          <Menu.Header>행성 관리</Menu.Header>
          <Menu.Element onClick={onClickEscapePlanet}>
            <span>행성 떠나기</span>
          </Menu.Element>
        </Menu>
        <Divider />
        <Menu>
          <Menu.Header>계정 관리</Menu.Header>
          <Menu.Element onClick={onClickLogout}>
            <span>로그아웃</span>
          </Menu.Element>
          <Menu.Element onClick={onClickSignOut}>
            <span>회원 탈퇴</span>
          </Menu.Element>
        </Menu>
      </div>
    </main>
  );
};

export default MyPageConfig;
