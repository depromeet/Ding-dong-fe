import Image from 'next/image';

import { useGetCommunityUserInfo } from '~/api/domain/community.api';
import { NudgeMessageIcon } from '~/components/Icon';
import { NudgeIconSelector } from '~/components/NudgeIconSelector';
import { NudgeListModel, nudgeMessages } from '~/types/nudge';

type NudgeProps = NudgeListModel & {
  communityId: number;
};

export const NudgeItem = ({
  communityId,
  opponentUser,
  toUserNudgeType,
  fromUserNudgeType,
}: NudgeProps) => {
  const message = nudgeMessages.find(x => x.id === toUserNudgeType)?.text;
  const { data } = useGetCommunityUserInfo(communityId);

  return (
    <li className="flex flex-row justify-between">
      <div className="flex gap-12pxr">
        <div className="flex items-baseline">
          <Image
            width={44}
            height={44}
            src={opponentUser.profileImageUrl}
            alt="profile image"
            className="max-h-[44px] min-h-[44px] min-w-[44px] max-w-[44px] rounded-full border-[1px] border-solid border-grey-100 object-cover"
          />
          <div className="ml-[-10px] ">
            {fromUserNudgeType && data?.myInfoInInCommunityDto.profileImageUrl ? (
              <Image
                width={18}
                height={18}
                src={data.myInfoInInCommunityDto.profileImageUrl}
                alt="profile image"
                className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px] rounded-full border-[1px] border-solid border-grey-100 object-cover"
              />
            ) : (
              <div className="h-[18px] w-[18px]" />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-h5 text-[#282828]">{opponentUser.nickname}</p>
          <div className="flex gap-4pxr">
            <NudgeIconSelector nudgeType={toUserNudgeType} className="h-18pxr w-18pxr" />
            <p className="text-grey700 text-b3">{message}</p>
          </div>
        </div>
      </div>
      {fromUserNudgeType && (
        <div className="relative">
          <NudgeMessageIcon />
          <div className="absolute left-5pxr top-5pxr flex gap-4pxr">
            <NudgeIconSelector nudgeType={fromUserNudgeType} className="h-18pxr w-18pxr" />
            <p className="text-grey700 text-b3">{message}</p>
          </div>
        </div>
      )}
    </li>
  );
};
