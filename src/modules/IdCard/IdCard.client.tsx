'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { ChatBubbleIcon } from '~/components/Icon';
import Tag from '~/components/Tag/Tag';
import { CharacterNameModel } from '~/types/idCard';
import { tw } from '~/utils/tailwind.util';

type IdCardProps = {
  profileImageUrl: string;
  idCardId: number;
  nickname: string;
  aboutMe: string;
  characterType: CharacterNameModel;
  keywordTitles: string[];
  commentCount?: number;
  className?: string;
};
const bgColors: Record<CharacterNameModel, string> = {
  BUDDY: 'bg-buddy-400',
  TOBBY: 'bg-tobby-400',
  PIPI: 'bg-pipi-400',
  TRUE: 'bg-true-400',
};

export const IdCard = ({
  idCardId,
  profileImageUrl,
  nickname,
  aboutMe,
  characterType,
  keywordTitles,
  className,
  commentCount,
}: IdCardProps) => {
  const bgColor = bgColors[characterType];
  const router = useRouter();
  const pathname = usePathname();

  const handleClickIdCard = () => {
    const planetIdPathname = pathname.replace('/id-card/create', '').replace('/my-page', '/planet');
    router.push(`${planetIdPathname}/id-card/${idCardId}`);
  };

  return (
    <div className={tw('w-full', className)} onClick={handleClickIdCard}>
      <div className={`${bgColor} rounded-t-2xl p-20pxr`}>
        <div className="flex gap-8pxr">
          <div className="h-36pxr w-36pxr flex-shrink-0 overflow-hidden rounded-full">
            <Image
              width={36}
              height={36}
              src={profileImageUrl}
              alt="profile image"
              className="max-h-[36px] min-h-[36px] min-w-[36px] max-w-[36px] rounded-full object-cover"
            />
          </div>
          <p className="text-h1">{nickname}</p>
        </div>
        <p className="mt-14pxr text-b2">{aboutMe}</p>
        <div className="mt-12pxr flex max-h-14 flex-wrap gap-1.5 overflow-hidden">
          {keywordTitles.map(keywordTitle => (
            //TODO: 태그 2줄 이상 길어지면 ... 처리 필요
            <Tag key={keywordTitle} type={characterType} label={keywordTitle} />
          ))}
        </div>
      </div>
      <div className={`${bgColor} relative w-full rounded-b-2xl pb-[83%]`}>
        <Image
          src={`/assets/images/${characterType}.png`}
          alt="character image"
          fill
          object-fit="contain"
          object-position="center"
        />
        {commentCount !== undefined && (
          <div className="absolute bottom-[33px] left-[22px] flex items-center gap-2pxr text-detail font-medium text-grey-900">
            <ChatBubbleIcon />
            <span>{commentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};
