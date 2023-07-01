`use client`;

import { useRouter } from 'next/navigation';

import { useGetUserInfo } from '~/api/domain/user.api';
import PlanetPage from '~/app/planet/page';
import { getUserIdClient } from '~/utils/auth/getUserId.client';

const Home = () => {
  const router = useRouter();
  const userId = getUserIdClient();
  const { data: userInfo } = useGetUserInfo({
    enabled: !!userId,
  });

  if (userId) {
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
      <PlanetPage />
    </main>
  );
};

export default Home;
