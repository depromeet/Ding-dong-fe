'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Divider } from '~/components/Divider';
import { BellIcon, HomeIcon, PersonIcon } from '~/components/Icon';
import { usePlanetNavigate } from '~/hooks/usePlanetNavigate';
import { NewNotificationBadge } from '~/modules/Notification/NewNotificationBadge.client';

type BottomNavigationPath = '/planet' | '/notification' | '/my-page' | '/';

export const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { extractPlanetIdFromPathname } = usePlanetNavigate();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const getSvgColor = (bottomNavigationPath: BottomNavigationPath) => {
    if (pathname.includes(bottomNavigationPath)) {
      return 'fill-primary-500 stroke-primary-500';
    } else {
      return 'fill-none stroke-grey-400';
    }
  };

  const onClickHome = () => {
    const planetId = extractPlanetIdFromPathname(pathname);
    if (planetId) {
      handleNavigation(`/planet/${planetId}`);
      return;
    }
    handleNavigation('/');
  };
  const onClickNotification = () => {
    handleNavigation('/notification');
  };
  const onClickMyPage = () => {
    const planetId = extractPlanetIdFromPathname(pathname);
    if (planetId) {
      handleNavigation(`/my-page/${planetId}`);
      return;
    }
    handleNavigation('/my-page');
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full">
      <Divider />
      <ul className="flex h-b-nav items-center justify-evenly bg-white">
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
            <BellIcon height={26} className={getSvgColor('/notification')} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
