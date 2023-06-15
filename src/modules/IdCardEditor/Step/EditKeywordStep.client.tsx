import { Controller, useFormContext } from 'react-hook-form';

import { KeywordInput } from '~/components/KeywordInput';
import {
  MAX_KEYWORD_INPUT_LENGTH,
  MAX_KEYWORD_LIST_LENGTH,
  TEMP_RECOMMEND_KEYWORD_LIST,
} from '~/modules/IdCardEditor/IdCardEditor.constant';
import { IdCardEditorFormModel } from '~/types/idCard';

export const EditKeywordStep = () => {
  const { control } = useFormContext<IdCardEditorFormModel>();

  return (
    <div>
      <h2 className="px-layout-sm text-h2 text-grey-900">나를 소개할 키워드를 적어주세요!</h2>
      <Controller
        name="keywords"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <KeywordInput
            id={name}
            placeholder="1개 이상의 키워드를 추가해주세요."
            keywordLabel="이런 키워드는 어때요?"
            activeKeywordList={value}
            keywordOptions={TEMP_RECOMMEND_KEYWORD_LIST}
            onChange={onChange}
            maxActiveKeywordListLength={MAX_KEYWORD_LIST_LENGTH}
            maxInputLength={MAX_KEYWORD_INPUT_LENGTH}
            className="mt-22pxr"
          />
        )}
      />
    </div>
  );
};
