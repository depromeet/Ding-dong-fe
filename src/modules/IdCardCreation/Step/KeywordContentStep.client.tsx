'use client';
import { useFormContext } from 'react-hook-form';

import { KeywordContentEditCard } from '~/modules/IdCardCreation/Card';
import { FormKeywordModel } from '~/types/idCard';

const title = '나를 소개하는 키워드의\n 설명을 적어주세요!';

export const KeywordContentStep = () => {
  const { watch } = useFormContext();
  const { keywords } = watch();

  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      <div className="mt-26pxr flex flex-col gap-22pxr">
        {keywords.map((keyword: FormKeywordModel, index: number) => {
          return <KeywordContentEditCard key={index} keyword={keyword} index={index} />;
        })}
      </div>
    </div>
  );
};
