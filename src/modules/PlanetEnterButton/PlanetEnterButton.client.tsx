'use client';

import { useRouter } from 'next/navigation';

import { Button, TextButton } from '~/components/Button';
import { DINGDONG_PLANET } from '~/utils/variable';

export const PlanetEnterButton = () => {
  const router = useRouter();
  return (
    <div className="mt-6pxr">
      <TextButton
        className="w-full text-center text-b1 text-primary-500"
        onClick={() => router.push(`/planet/${DINGDONG_PLANET.DINGDONG_PLANET_ID}`)}
      >
        딩동행성 둘러보기
      </TextButton>
      <div className="mt-[60px] flex flex-col gap-4">
        <Button color="primary" size="large" onClick={() => router.push('/admin/planet/create')}>
          행성 만들기
        </Button>
      </div>
    </div>
  );
};
