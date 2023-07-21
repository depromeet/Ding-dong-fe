'use client';
import Image from 'next/image';

import { useToastMessageStore } from '~/stores/toastMessage.store';

const Error = () => {
  const { infoToast } = useToastMessageStore();
  const onClickHere = () => {
    infoToast('아직 준비중이에요...');
  };
  return (
    <div className="relative flex h-real-screen flex-col items-center">
      <Image
        src="/assets/images/error-ufo.png"
        width={235}
        height={216}
        className="mt-80pxr object-contain"
        alt="error-ufo"
      />
      <h1 className="mt-36pxr text-h1 text-black">문제가 발생했습니다</h1>
      <div className="mt-8pxr text-center text-b1 text-grey-500">
        <p>지금 서비스에 문제가 발생했습니다.</p>
        <p>문제를 해결하기 위해 열심히 노력하고 있습니다.</p>
        <p>잠시 후 다시 확인해 주세요.</p>
      </div>
      <div className="top- absolute w-full translate-y-[-160%] text-center text-b1 text-grey-500">
        <p>
          문제가 계속된다면,{' '}
          <button className="underline underline-offset-2" onClick={onClickHere}>
            여기
          </button>
          로 연락해주세요.
        </p>
      </div>
    </div>
  );
};

export default Error;
