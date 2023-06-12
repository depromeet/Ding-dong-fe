'use client';

import Button from '@/components/Button/Button';
import TextButton from '@/components/Button/TextButton';

export const PlanetEnterButtons = () => {
  return (
    <div className="-mt-10">
      <TextButton
        className="w-full text-center text-b1 text-primary-500"
        onClick={() => console.log('딩동행성 둘러보기')}
      >
        딩동행성 둘러보기
      </TextButton>
      <div className="mt-[60px] flex flex-col gap-4">
        <Button color="primary" size="large" onClick={() => console.log('행성 만들기')}>
          행성 만들기
        </Button>
        <Button color="secondary" size="large" onClick={() => console.log('초대코드 입력하기')}>
          초대코드 입력하기
        </Button>
      </div>
    </div>
  );
};
