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
    <div className="px-21pxr pb-25pxr pt-8pxr">
      <div className={`${bgColor} flex flex-col items-center`}>
        <div className="mb-10pxr h-80pxr w-80pxr flex-shrink-0 overflow-hidden rounded-full">
          <Image
            width={80}
            height={80}
            src={profileImageUrl}
            alt="profile image"
            className="max-h-[88px] min-h-[88px] min-w-[88px] max-w-[88px] rounded-full border-[1px] border-solid border-grey-100 object-cover"
          />
        </div>
        <p className="mb-2 text-h4">{nickname}</p>
        <p className="mb-4 text-center text-b3 text-grey-600">{aboutMe}</p>
        <div className="flex max-h-14 flex-wrap gap-6pxr overflow-hidden">
          {keywords.map(keyword => (
            <Tag key={keyword.title} type={characterType} label={keyword.title} />
          ))}
        </div>
      </div>
    </div>
  );
};
