'use client';
import { useFormContext } from 'react-hook-form';

import { KeywordContentEditCard } from '~/modules/KeywordContentEditCard';
import { FormKeywordModel, IdCardCreationFormModel } from '~/types/idCard';

const title = '나를 소개하는 키워드의\n 설명을 적어주세요!';

export const KeywordContentStep = () => {
  const { getValues } = useFormContext<IdCardCreationFormModel>();
  const keywords = getValues('keywords');

  return (
    <div className="px-layout-sm">
      <h1 className="text-h1">{title}</h1>
      <div className="mt-26pxr flex flex-col gap-22pxr">
        {keywords.map((keyword: FormKeywordModel, index: number) => {
          return <KeywordContentEditCard key={keyword.title} keyword={keyword} index={index} />;
        })}
      </div>
    </div>
  );
};
