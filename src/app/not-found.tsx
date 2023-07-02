import Image from 'next/image';
import Link from 'next/link';

import { Button } from '~/components/Button';

const NotFound = () => {
  return (
    <div className="relative flex h-[calc(100vh-50px)] flex-col items-center">
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
      <Link className="absolute top-[calc(100vh-50px)] w-full translate-y-[-160%]" href="/">
        <Button color="primary" size="large">
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
