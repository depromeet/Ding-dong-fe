import Image from 'next/image';

import Button from '@/components/Button/Button';
import TextButton from '@/components/Button/TextButton';

const Communities = () => {
  return (
    <div className="flex h-screen flex-col justify-center">
      <h1 className="mb-4 mt-1 text-h2 text-grey-900">아직 소속된 행성이 없네요!</h1>
      <p className="text-b2 text-grey-700">행성을 만들거나 초대된 행성으로 이동해보세요.</p>
      <Image src="/assets/images/planet.png" alt="planet" width={400} height={400} />
      <TextButton className="-mt-10 w-full text-center text-b1 text-primary-500">
        딩동행성 둘러보기
      </TextButton>
      <div className="mt-[30px] flex flex-col gap-4">
        <Button color="primary" size="large">
          {'행성 만들기'}
        </Button>
        <Button color="secondary" size="large">
          {'초대코드 입력하기'}
        </Button>
      </div>
    </div>
  );
};

export default Communities;
