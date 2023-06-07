import Image from 'next/image';

import SignIn from '@/app/api/auth/signin/page';
import SessionRedirect from '@/app/api/auth/signin/sessionRedirect';
import Button from '@/components/Button/Button';
import TextButton from '@/components/Button/TextButton';

const Home = () => {
  const isLogin = true;

  // TODO : 로그인 로직 완성되면 수정 해야함
  return isLogin ? (
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
  ) : (
    <>
      <SessionRedirect />
      <div className="flex h-screen flex-col justify-between px-6 pb-20 pt-28">
        <div>
          <div className="text-4xl">LOGO</div>
          <div className="mt-8 flex h-72 w-full items-center justify-center rounded-full bg-gray-100 text-center">
            graphic
          </div>
        </div>
        {/* @ts-expect-error Server Component */}
        <SignIn />
      </div>
    </>
  );
};

export default Home;
