'use client';
import { useRouter } from 'next/navigation';

import { PlusIcon } from '~/components/Icon';
import { PlanetCreationButton } from '~/modules/PlanetCreationButton';
import { useCommunityStore } from '~/stores/community.store';

const EmptyPlanet = () => {
  const { communityId } = useCommunityStore();
  const router = useRouter();

  // TODO: communityId가 없는 경우 에러 처리가 필요해요( ex. 홈이나 다른 페이지로 보내기)
  const onClickCreateIdCardButton = () => {
    router.push(`/planet/${communityId}/id-card/create`);
  };

  return (
    <main className="pt-35pxr">
      <div className="mx-layout-l">
        <h1 className="text-h3 text-grey-800">내 주민증</h1>
        <div className="mt-16pxr flex h-[404px] w-full items-center justify-center rounded-[16px] border border-dashed border-primary-500 bg-blue-100">
          <div className="flex flex-col items-center gap-8pxr">
            <button
              onClick={onClickCreateIdCardButton}
              className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-blue-200"
            >
              <PlusIcon className="fill-primary-500 stroke-2" />
            </button>
            <span className="text-b1 text-primary-500">주민증 만들기</span>
          </div>
        </div>
      </div>
      <div className="mx-layout-sm mt-28pxr">
        <PlanetCreationButton />
      </div>
    </main>
  );
};

export default EmptyPlanet;
