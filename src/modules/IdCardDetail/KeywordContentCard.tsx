import { ReactNode } from 'react';

import { tw } from '~/utils/tailwind.util';

type KeywordContentCardProps = {
  title: ReactNode | string;
  image: ReactNode | null;
  content: ReactNode | string;
  className?: string;
  onClick?: () => void;
};

export const KeywordContentCard = ({
  title,
  image,
  content,
  className,
  onClick,
  ...props
}: KeywordContentCardProps) => {
  return (
    <div className={tw('w-full', className)} onClick={onClick} {...props}>
      <p className="mb-3 h-5 font-semibold text-grey-900">{title}</p>
      <div className="flex flex-col gap-2 pb-[20px]">
        {image}
        <p className="text-[15px] font-normal text-grey-800">{content}</p>
      </div>
      <div className="-ml-5 w-[420px] border-[0.5px] border-solid border-grey-100" />
    </div>
  );
};
