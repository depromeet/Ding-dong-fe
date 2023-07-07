import 'server-only';

import { getProviders } from 'next-auth/react';

const SignInProviders = async () => {
  const providers = await getProviders();
  if (!providers) return <></>;
  return <div></div>;
};

export { SignInProviders };
