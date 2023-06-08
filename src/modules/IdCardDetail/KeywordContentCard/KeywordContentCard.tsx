import Image from 'next/image';

import { KeywordType } from '@/types/id-cards.type';

export const KeywordContentCard = ({ keywordId, title, imageUrl, content }: KeywordType) => {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-xl bg-grey-100 px-3.5 py-2.5">
      <p className="text-base font-semibold text-grey-900">{title}</p>
      <div className="flex flex-col gap-2">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={300}
            className="rounded-xl object-cover"
          />
        )}
        <p className="text-[15px] font-normal text-grey-800">{content}</p>
      </div>
    </div>
  );
};
