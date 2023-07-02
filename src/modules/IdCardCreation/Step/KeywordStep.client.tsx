'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { KeywordInput } from '~/components/KeywordInput';
import { DEFAULT_RECOMMEND_KEYWORD_OPTIONS } from '~/constant/recommendKeyword';
import { IdCardCreationFormModel } from '~/types/idCard';

const title = '이웃 주민에게 자신을 소개할\n 키워드를 적어주세요!';

export const KeywordStep = () => {
  const { control } = useFormContext<IdCardCreationFormModel>();

  return (
    <div>
      <h1 className="px-layout-sm text-h1">{title}</h1>
      <Controller
        name="keywords"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <KeywordInput
            id={name}
            placeholder="1개 이상의 키워드를 추가해주세요."
            keywordLabel="이런 키워드는 어때요?"
            activeKeywordList={value}
            keywordOptions={DEFAULT_RECOMMEND_KEYWORD_OPTIONS}
            onChange={onChange} // rhf onchange handler
            maxActiveKeywordListLength={7}
            maxInputLength={8}
            className="mt-24pxr"
          />
        )}
      />
    </div>
  );
};
