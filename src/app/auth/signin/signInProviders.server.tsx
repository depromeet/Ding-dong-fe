import 'server-only';

import { getProviders } from 'next-auth/react';

import Kakao from './kakaoLoginButton.client';

const SignInProviders = async () => {
  const providers = await getProviders();
  if (!providers) return <></>;
  return (
    <div>
      {Object.values(providers).map(provider => {
        if (provider.id === 'kakao') {
          return <Kakao provider={provider} key={provider.id} />;
        }
      })}
    </div>
  );
};

export { SignInProviders };