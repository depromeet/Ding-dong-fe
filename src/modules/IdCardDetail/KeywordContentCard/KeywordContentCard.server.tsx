import { ReactNode } from 'react';

import { tw } from '@/utils/tailwind.util';

type KeywordContentCardProps = {
  title: ReactNode | string;
  image: ReactNode | null;
  content: ReactNode | string;
  className?: string;
};

export const KeywordContentCard = ({
  title,
  image,
  content,
  className,
}: KeywordContentCardProps) => {
  return (
    <div className={tw('w-full rounded-xl bg-grey-100', className)}>
      <p className="px-[14px] py-[10px] text-base  font-semibold text-grey-900">{title}</p>
      <div className="border-[0.5px] border-solid border-grey-200" />
      <div className="flex flex-col gap-2 px-[14px] pb-[20px] pt-[8px] ">
        {image}
        <p className="text-[15px] font-normal text-grey-800">{content}</p>
      </div>
    </div>
  );
};
