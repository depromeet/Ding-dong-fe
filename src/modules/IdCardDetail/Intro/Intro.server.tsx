import Tag from '@/components/Tag/Tag';
import { CharacterType, IdCardType } from '@/types/id-cards.type';

const bgColors: Record<CharacterType, string> = {
  BUDDY: 'bg-buddy-100',
  TOBBY: 'bg-tobby-100',
  PIPI: 'bg-pipi-100',
  TRUE: 'bg-true-100',
};

export const Intro = ({
  idCardId,
  nickname,
  profileImageUrl,
  aboutMe,
  keywords,
  characterType,
}: IdCardType) => {
  const bgColor = bgColors[characterType];

  return (
    <div className={`${bgColor} flex flex-col gap-[9px] px-[21px] pb-[25px] pt-[8px]`}>
      <p className="text-h3">{nickname}</p>
      <p className="text-b3 text-grey-600">{aboutMe}</p>
      <div className="flex max-h-14 flex-wrap gap-1.5 overflow-hidden">
        {keywords.map(keyword => (
          <Tag key={keyword.title} type={characterType} label={keyword.title} />
        ))}
      </div>
    </div>
  );
};