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
        onClick={() =>
          signIn(provider.id, {
            redirect: true,
            callbackUrl:
              'https://ding-dong-9o7e0l8nv-ding-dong-planet.vercel.app/auth/callback/kakao',
          })
        }
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
