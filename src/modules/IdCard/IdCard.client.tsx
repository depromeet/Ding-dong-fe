'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { ChatBubbleIcon } from '~/components/Icon';
import { SpeechBubble } from '~/components/SpeechBubble';
import Tag from '~/components/Tag/Tag';
import { CommunityIdCardsModel } from '~/types/community';
import { CharacterNameModel } from '~/types/idCard';
import { NudgeModel } from '~/types/nudge';
import { ClassNameType } from '~/types/util';
import { tw } from '~/utils/tailwind.util';
import { DINGDONG_PLANET } from '~/utils/variable';

type IdCardProps = Omit<CommunityIdCardsModel, 'commentCount' | 'toNudgeType'> & {
  className?: ClassNameType;
  commentCount?: number;
  toNudgeType?: NudgeModel;
};

const bgColors: Record<CharacterNameModel, string> = {
  BUDDY: 'bg-buddy-100',
  TOBBY: 'bg-tobby-100',
  PIPI: 'bg-pipi-100',
  TRUE: 'bg-true-100',
};

// NOTE: 이미지 캐시를 무시하기 위한 랜덤값
const ignoreCache = () => Math.random();

export const IdCard = ({
  idCardId,
  profileImageUrl,
  nickname,
  aboutMe,
  characterType,
  keywordTitles,
  className,
  commentCount,
  toNudgeType,
}: IdCardProps) => {
  const bgColor = bgColors[characterType];
  const router = useRouter();
  const pathname = usePathname();
  const planetIdPathname = pathname.replace('/id-card/create', '').replace('/my-page', '/planet');

  const handleClickIdCard = () => {
    router.push(`${planetIdPathname}/id-card/${idCardId}`);
  };

  const isShowCommentCount = !(Number(planetIdPathname) === DINGDONG_PLANET.DINGDONG_PLANET_ID);

  return (
    <div
      className={tw(
        'w-full rounded-xl border border-gray-200 shadow-[0_2px_24px_0px_rgba(0,0,0,0.05)]',
        className,
      )}
      onClick={handleClickIdCard}
    >
      <div className="rounded-t-xl bg-white p-20pxr">
        {toNudgeType && <SpeechBubble.Thumbnail nudgeType={toNudgeType} />}
        <div className="mt-20pxr flex items-center gap-6pxr">
          <div className="h-36pxr w-36pxr flex-shrink-0 overflow-hidden rounded-full">
            <Image
              width={36}
              height={36}
              src={profileImageUrl}
              alt="profile image"
              className="max-h-[36px] min-h-[36px] min-w-[36px] max-w-[36px] rounded-full object-cover"
            />
          </div>
          <p className="text-h4">{nickname}</p>
        </div>
        <p className="mt-14pxr text-b2 font-medium text-gray-800">{aboutMe}</p>
        <div className="mt-12pxr flex max-h-14 flex-wrap gap-1.5 overflow-hidden">
          {keywordTitles.map(keywordTitle => (
            //TODO: 태그 2줄 이상 길어지면 ... 처리 필요
            <Tag key={keywordTitle} type={characterType} label={keywordTitle} />
          ))}
        </div>
      </div>
      <div className={`${bgColor} relative w-full rounded-b-xl pb-[83%]`}>
        <Image
          src={`/assets/images/${characterType}.png?${ignoreCache()}`}
          alt="character image"
          fill
          sizes="100vw"
          style={{
            paddingTop: 16,
          }}
        />
        {commentCount !== undefined && isShowCommentCount && (
          <div className="absolute bottom-[33px] left-[22px] flex items-center gap-2pxr rounded-xl bg-[rgba(239,239,239,0.50)] px-2 py-2pxr text-detail font-medium text-grey-900">
            <ChatBubbleIcon />
            <span>{commentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};
