'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { KeywordInput, OptionType } from '~/components/KeywordInput';
import { IdCardCreationFormModel } from '~/types/idCard';

const title = '이웃 주민에게 자신을 소개할\n 키워드를 적어주세요!';

export const KeywordStep = () => {
  const { control } = useFormContext<IdCardCreationFormModel>();

  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      <Controller
        name="keywords"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, name } }) => (
          <KeywordInput
            id={name}
            placeholder="1개 이상의 키워드를 추가해주세요."
            keywordLabel="이런 키워드는 어때요?"
            activeKeywordList={value}
            keywordOptions={TEMP_RECOMMEND_KEYWORD_LIST}
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

const TEMP_RECOMMEND_KEYWORD_LIST: OptionType[] = [
  {
    title: '재치 발랄',
    imageUrl: '',
    content: '',
  },
  {
    title: '엽기 떡볶이',
    imageUrl: '',
    content: '',
  },
  {
    title: '맛집투어',
    imageUrl: '',
    content: '',
  },
  {
    title: 'FE 짱짱',
    imageUrl: '',
    content: '',
  },
  {
    title: '7팀 최고',
    imageUrl: '',
    content: '',
  },
  {
    title: '디프만 최고~',
    imageUrl: '',
    content: '',
  },
];
