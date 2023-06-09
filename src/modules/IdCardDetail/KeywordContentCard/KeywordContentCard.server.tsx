import { ReactNode } from 'react';

type KeywordContentCardProps = {
  title: ReactNode | string;
  image: ReactNode | null;
  content: ReactNode | string;
};

export const KeywordContentCard = ({ title, image, content }: KeywordContentCardProps) => {
  // TODO: 이미지 사진 사이즈 조절
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-xl bg-grey-100 px-3.5 py-2.5">
      <p className="text-base font-semibold text-grey-900">{title}</p>
      <div className="flex flex-col gap-2">
        {image}
        <p className="text-[15px] font-normal text-grey-800">{content}</p>
      </div>
    </div>
  );
};
