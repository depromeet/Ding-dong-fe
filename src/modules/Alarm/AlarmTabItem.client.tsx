import { CommunityLogoImage } from '~/modules/CommunityProfile';
import { twMerge } from '~/utils/tailwind.util';

import { CommunityAlarm } from './AlarmTab.client';

type AlarmTabProps = {
  community: CommunityAlarm;
  isActive: boolean;
  onClick: (communityId: number) => void;
};
export const AlarmTabItem = ({ community, isActive, onClick }: AlarmTabProps) => {
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
      {community.hasNewAlarm && (
        <div
          className={twMerge('absolute right-0 top-0 h-6pxr w-6pxr rounded-full bg-blue-500')}
        ></div>
      )}
    </li>
  );
};
