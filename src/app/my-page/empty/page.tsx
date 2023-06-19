import { PlanetCreationButton } from '~/modules/PlanetCreationButton';

// TODO: 임시 페이지, 디자인팀에게 요청한 상태, 홈화면의 소속 없는 경우 활용 가능성 있어요~
const EmptyPlanet = () => {
  return (
    <main className="pt-35pxr">
      <div className="mx-layout-l">소속된 커뮤니티니가 없어요</div>
      <div className="mx-layout-sm mt-28pxr">
        <PlanetCreationButton />
      </div>
    </main>
  );
};

export default EmptyPlanet;
