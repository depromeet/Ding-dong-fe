'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '~/components/Button';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="h-real relative flex flex-col items-center">
      <Image
        src="/assets/images/error-ufo.png"
        width={235}
        height={216}
        className="mt-80pxr object-contain"
        alt="error-ufo"
      />
      <h1 className="mt-36pxr text-h1 text-black">찾을 수 없는 페이지예요</h1>
      <div className="mt-8pxr text-center text-b1 text-grey-500">
        <p>입력한 주소의 페이지를 찾을 수 없어요.</p>
        <p>주소를 다시 한 번 확인해 주세요.</p>
      </div>
      <div className="absolute top-[calc(100dvh-50px)] top-[calc(100vh-50px)] w-full translate-y-[-160%]">
        <Button color="primary" size="large" onClick={() => router.push('/')}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
