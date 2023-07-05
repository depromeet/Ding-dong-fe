import Image from 'next/image';

import Tag from '~/components/Tag/Tag';
import { CharacterNameModel, IdCardDetailModel } from '~/types/idCard';

const bgColors: Record<CharacterNameModel, string> = {
  BUDDY: 'bg-buddy-100',
  TOBBY: 'bg-tobby-100',
  PIPI: 'bg-pipi-100',
  TRUE: 'bg-true-100',
};

type IntroProps = Omit<IdCardDetailModel, 'idCardId' | 'userId'>;

export const Intro = ({
  nickname,
  profileImageUrl,
  aboutMe,
  keywords,
  characterType,
}: IntroProps) => {
  const bgColor = bgColors[characterType];

  return (
    <div className="flex justify-between gap-10pxr px-21pxr pb-25pxr pt-8pxr">
      <div className={`${bgColor} flex flex-col gap-[9px]`}>
        <p className="text-h3">{nickname}</p>
        <p className="text-b3 text-grey-600">{aboutMe}</p>
        <div className="flex max-h-14 flex-wrap gap-6pxr overflow-hidden">
          {keywords.map(keyword => (
            <Tag key={keyword.title} type={characterType} label={keyword.title} />
          ))}
        </div>
      </div>
      <div className="h-80pxr w-80pxr flex-shrink-0 overflow-hidden rounded-full">
        <Image width={80} height={80} src={profileImageUrl} alt="profile image" />
      </div>
    </div>
  );
};
