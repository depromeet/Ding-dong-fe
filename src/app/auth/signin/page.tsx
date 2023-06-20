import { KAKAO_PROVIDER } from '~/utils/auth/loginProviders';

import KakaoLoginButton from './kakaoLoginButton.client';

const SignInPage = async () => {
  return (
    <>
      <div className="flex h-screen flex-col justify-between px-6 pb-20 pt-28">
        <div>
          <div className="text-4xl">LOGO</div>
          <div className="mt-8 flex h-72 w-full items-center justify-center rounded-full bg-gray-100 text-center">
            graphic
          </div>
        </div>
        <KakaoLoginButton provider={KAKAO_PROVIDER} />
      </div>
    </>
  );
};

export default SignInPage;
