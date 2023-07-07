'use client';
import Image from 'next/image';
import { ClientSafeProvider, signIn } from 'next-auth/react';

type KakaoLoginButtonProps = {
  provider: ClientSafeProvider;
};

const KakaoLoginButton = ({ provider }: KakaoLoginButtonProps) => {
  return (
    <div>
      <button
        onClick={() => signIn(provider.id, { redirect: true, callbackUrl: provider.callbackUrl })}
      >
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
export default KakaoLoginButton;
