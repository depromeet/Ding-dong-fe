'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useGetUserInfo } from '~/api/domain/user.api';
import { getUserIdClient } from '~/utils/auth/getUserId.client';
import { STORAGE_REDIRECT_URI_KEY } from '~/utils/route/route';

const Home = () => {
  const router = useRouter();
  const userId = getUserIdClient();
  const { data: userInfo } = useGetUserInfo({
    enabled: !!userId,
  });
  const redirectUri = window.sessionStorage.getItem(STORAGE_REDIRECT_URI_KEY);

  if (userId) {
    if (redirectUri) {
      router.replace(redirectUri);
    }

    if (userInfo) {
      const { isCharacterCreated, planetIds } = userInfo;
      if (isCharacterCreated) {
        planetIds.length > 0 ? router.push(`/planet/${planetIds[0]}`) : router.push('/planet');
      } else {
        router.push('/onboarding');
      }
    }
  } else {
    router.push('/auth/signin');
  }

  return (
    <main>
      <Image
        src="/assets/images/splash.png"
        width={0}
        height={0}
        sizes="100vw"
        alt="splash"
        className="mt-none-t-nav max-h-[100vh] w-full object-cover"
      />
    </main>
  );
};

export default Home;
