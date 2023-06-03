'use client';
import Image from 'next/image';
import { ClientSafeProvider, signIn } from 'next-auth/react';

type KakaoLoginButtonProps = {
  provider: ClientSafeProvider;
};

const kakaoLoginButton = ({ provider }: KakaoLoginButtonProps) => {
  return (
    <div>
      <button onClick={() => signIn(provider.id, { redirect: true, callbackUrl: '/home' })}>
        <Image
          src="/assets/images/kakao_login_large_wide.png"
          alt="KakaoButtonImage"
          width={400}
          height={200}
          priority
        />
      </button>
    </div>
  );
};
export default kakaoLoginButton;
