'use client';

import Image from 'next/image';

import Tag from '@/components/Tag/Tag';
import { CharacterNameModel } from '@/types/idCard';

type IdCardProps = {
  idCardId: number;
  nickname: string;
  aboutMe: string;
  characterType: CharacterNameModel;
  keywordTitles: string[];
};

const bgColors: Record<CharacterNameModel, string> = {
  BUDDY: 'bg-buddy-400',
  TOBBY: 'bg-tobby-400',
  PIPI: 'bg-pipi-400',
  TRUE: 'bg-true-400',
};

export const IdCard = ({
  idCardId,
  nickname,
  aboutMe,
  characterType,
  keywordTitles,
}: IdCardProps) => {
  const bgColor = bgColors[characterType];

  return (
    <div className="w-full">
      <div className={`${bgColor} rounded-t-2xl p-5`}>
        <p className="text-h1">{nickname}</p>
        <p className="mb-3 mt-3.5 text-b2">{aboutMe}</p>
        <div className="flex max-h-14 flex-wrap gap-1.5 overflow-hidden">
          {keywordTitles.map(keywordTitle => (
            // TODO: 태그 2줄 이상 길어지면 ... 처리 필요
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
      </div>
    </div>
  );
};
