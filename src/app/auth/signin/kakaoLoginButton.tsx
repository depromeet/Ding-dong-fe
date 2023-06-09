'use client';
import Image from 'next/image';
import { ClientSafeProvider, signIn } from 'next-auth/react';

type KakaoLoginButtonProps = {
  provider: ClientSafeProvider;
};

const KakaoLoginButton = ({ provider }: KakaoLoginButtonProps) => {
  return (
    <div>
      <a
        // href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`}
        onClick={() => signIn(provider.id, { redirect: true, callbackUrl: '/auth/callback/kakao' })}
      >
        <Image
          src="/assets/images/kakao_login_large_wide.png"
          alt="KakaoButtonImage"
          width={400}
          height={200}
          priority
        />
      </a>
    </div>
  );
};
export default KakaoLoginButton;
