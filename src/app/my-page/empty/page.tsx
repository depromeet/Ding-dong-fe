import { PlanetCreationButton } from '~/modules/PlanetCreationButton';

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
