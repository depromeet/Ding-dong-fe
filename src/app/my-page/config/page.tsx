'use client';
import { Divider } from '~/components/Divider';
import { ChevronRightIcon } from '~/components/Icon';

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
    <main className="pt-[50px]">
      <div>
        <h4 className="text-b2 text-grey-500">행성 관리</h4>
        <ul>
          <li
            className="flex w-full justify-between text-b1 text-grey-800"
            onClick={onClickEscapePlanet}
          >
            <span>행성 떠나기</span>
            <ChevronRightIcon />
          </li>
        </ul>
      </div>
      <Divider />
      <div>
        <h4 className="text-b2 text-grey-500">계정 관리</h4>
        <ul>
          <li className="flex w-full justify-between text-b1 text-grey-800" onClick={onClickLogout}>
            <span> 로그아웃</span>
            <ChevronRightIcon />
          </li>
          <li
            className="flex w-full justify-between text-b1 text-grey-800"
            onClick={onClickSignOut}
          >
            <span> 회원 탈퇴</span>
            <ChevronRightIcon />
          </li>
        </ul>
      </div>
    </main>
  );
};

export default MyPageConfig;
