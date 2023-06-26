import { CommunityLogoImage } from '~/modules/CommunityProfile';
import { twMerge } from '~/utils/tailwind.util';

import { CommunityNotification } from './NotificationTab.client';

type NotificationTabProps = {
  community: CommunityNotification;
  isActive: boolean;
  onClick: (communityId: number) => void;
};
export const NotificationTabItem = ({ community, isActive, onClick }: NotificationTabProps) => {
  return (
    <li
      onClick={() => onClick(community.communityId)}
      className={twMerge(
        'relative mr-24pxr flex items-center gap-4pxr border-b-2 border-b-white pb-10pxr pr-8pxr text-gray-400',
        isActive && 'border-b-black text-black',
      )}
    >
      {community.logoImageUrl && (
        <CommunityLogoImage logoImageUrl={community.logoImageUrl} size="small" />
      )}
      <span className="text-h5 font-semibold">{community.title}</span>
      {community.hasNewNotification && (
        <div
          className={twMerge('absolute right-0 top-0 h-6pxr w-6pxr rounded-full bg-blue-500')}
        ></div>
      )}
    </li>
  );
};
