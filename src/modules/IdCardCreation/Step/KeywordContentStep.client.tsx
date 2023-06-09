'use client';
import { useFormContext } from 'react-hook-form';
import { KeywordContentEditCard } from '@/modules/IdCardCreation/Card';

const title = '나를 소개하는 키워드의\n 설명을 적어주세요!';

export const KeywordContentStep = () => {
  const { watch } = useFormContext();
  const { keywords } = watch();

  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      <div className="mt-[26px] flex flex-col gap-[22px]">
        {keywords.map((keyword, index) => {
          return <KeywordContentEditCard keyword={keyword} index={index} />;
        })}
      </div>
    </div>
  );
};
