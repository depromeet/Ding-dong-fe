'use client';

import { usePathname, useRouter } from 'next/navigation';

import { HomeIcon, NotificationIcon, PersonIcon } from '~/components/Icon';
import { usePlanetNavigate } from '~/hooks/usePlanetNavigate';
import { NewNotificationBadge } from '~/modules/Notification/NewNotificationBadge.client';
import { useCommunityStore } from '~/stores/community.store';

type BottomNavigationPath = '/planet' | '/notification' | '/my-page' | '/';

export const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { extractPlanetIdFromPathname } = usePlanetNavigate();
  const { communityId: planetId, isInitPlanetId } = useCommunityStore();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const getPlanetId = () => {
    const pathPlanetId = extractPlanetIdFromPathname(pathname);
    if (pathPlanetId) return pathPlanetId;
    if (!isInitPlanetId()) return planetId;
    return null;
  };

  const getSvgColor = (bottomNavigationPath: BottomNavigationPath) => {
    if (pathname.includes(bottomNavigationPath)) {
      return 'fill-primary-500 stroke-primary-500';
    } else {
      return 'fill-none stroke-grey-400';
    }
  };

  const onClickHome = () => {
    const targetPlanetId = getPlanetId();
    if (targetPlanetId) {
      handleNavigation(`/planet/${targetPlanetId}`);
      return;
    }
    handleNavigation('/');
  };

  const onClickMyPage = () => {
    const targetPlanetId = getPlanetId();
    if (targetPlanetId) {
      handleNavigation(`/my-page/${targetPlanetId}`);
      return;
    }
    handleNavigation('/my-page');
  };

  const onClickNotification = () => {
    handleNavigation('/notification');
  };

  return (
    <nav className="fixed bottom-0 left-0 flex w-full justify-center">
      <ul className="flex h-b-nav w-full max-w-content items-center justify-evenly border-t border-grey-100 bg-white">
        <li>
          <button onClick={onClickHome}>
            <HomeIcon className={getSvgColor('/planet')} />
          </button>
        </li>
        <li>
          <button onClick={onClickMyPage}>
            <PersonIcon className={getSvgColor('/my-page')} />
          </button>
        </li>
        <li>
          <button onClick={onClickNotification} className="relative">
            <NewNotificationBadge />
            <NotificationIcon height={26} className={getSvgColor('/notification')} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
