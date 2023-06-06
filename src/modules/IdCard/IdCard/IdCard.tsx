'use client';

import Image from 'next/image';

import Tag from '@/components/Tag/Tag';
import { CharacterType } from '@/types/user';

type IdCardProps = {
  idCardId: number;
  nickname: string;
  aboutMe: string;
  characterType: CharacterType;
  keywordTitles: string[];
};

const bgColors: Record<CharacterType, string> = {
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
    <div className={`${bgColor} rounded-2xl p-5`}>
      <p className="text-h1">{nickname}</p>
      <p className="mb-3 mt-3.5 text-b2">{aboutMe}</p>
      <div className="flex gap-1.5">
        {keywordTitles.map(keywordTitle => (
          <Tag key={keywordTitle} type={characterType} label={keywordTitle} />
        ))}
      </div>
      <Image
        src={`/assets/images/${characterType}.png`}
        alt="character image"
        width={300}
        height={310}
        priority
      />
    </div>
  );
};
