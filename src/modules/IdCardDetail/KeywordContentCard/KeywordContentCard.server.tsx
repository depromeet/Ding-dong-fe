import Image from 'next/image';

import { KeywordType } from '@/types/idCard';

export const KeywordContentCard = ({ keywordId, title, imageUrl, content }: KeywordType) => {
  // TODO: 이미지 사진 사이즈 조절
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-xl bg-grey-100 px-3.5 py-2.5">
      <p className="text-base font-semibold text-grey-900">{title}</p>
      <div className="flex flex-col gap-2">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={308}
            height={192}
            className="rounded-xl object-cover"
          />
        )}
        <p className="text-[15px] font-normal text-grey-800">{content}</p>
      </div>
    </div>
  );
};
