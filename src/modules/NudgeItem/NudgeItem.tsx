'use client';

import Image from 'next/image';

import { NudgeMessageIcon } from '~/components/Icon';
import { NudgeIconSelector } from '~/components/NudgeIconSelector';
import { NudgeListModel, nudgeMessages } from '~/types/nudge';

type NudgeProps = NudgeListModel;

export const NudgeItem = ({ opponentUser, toUserNudgeType, fromUserNudgeType }: NudgeProps) => {
  const message = nudgeMessages.find(x => x.id === toUserNudgeType)?.text;

  return (
    <li className="flex flex-row justify-between">
      <div className="flex gap-12pxr">
        <Image
          width={44}
          height={44}
          src={opponentUser.profileImageUrl}
          alt="profile image"
          className="max-h-[44px] min-h-[44px] min-w-[44px] max-w-[44px] rounded-full border-[1px] border-solid border-grey-100 object-cover"
        />
        <div className="flex flex-col">
          <p className="text-h5 text-[#282828]">{opponentUser.nickname}</p>
          <div className="flex gap-4pxr">
            <NudgeIconSelector nudgeType={toUserNudgeType} className="h-18pxr w-18pxr" />
            <p className="text-grey700 text-b3">{message}</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <NudgeMessageIcon />
        {fromUserNudgeType && (
          <div className="absolute left-5pxr top-5pxr flex gap-4pxr">
            <NudgeIconSelector nudgeType={toUserNudgeType} className="h-18pxr w-18pxr" />
            <p className="text-grey700 text-b3">{message}</p>
          </div>
        )}
      </div>
    </li>
  );
};
