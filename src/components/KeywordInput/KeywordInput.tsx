'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { Chip } from '@/components/Chip/Chip';

type KeywordInputProps = object;

const addKeywordListAvoidDuplicate = (keyword: string, keywordList: string[]) => {
  if (keywordList.length > 7) return keywordList;
  const newKeywordList = keywordList.filter(item => item !== keyword).concat(keyword);

  return newKeywordList;
};

// eslint-disable-next-line no-empty-pattern
export const KeywordInput = ({}: KeywordInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [activeKeywordList, setActiveKeywordList] = useState<string[]>([]);

  const isEmptyKeywordList = activeKeywordList.length === 0;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = event.target.value;
    if (currentInputValue.length > 8) return;
    setInputValue(currentInputValue);
  };

  const resetInputValue = () => {
    setInputValue('');
  };

  const addKeyword = (keyword: string) => {
    if (keyword === '') return;
    setActiveKeywordList(prev => addKeywordListAvoidDuplicate(keyword, prev));
    resetInputValue();
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    // rn으로 실행했을 때도 정상적으로 작동했습니다.
    if (event.key === 'Enter') {
      addKeyword(inputValue);
    }
  };

  return (
    <div className="flex w-full flex-col px-20px">
      <h3>라벨</h3>
      <div className="flex min-h-[56px] bg-grey-50 px-20px py-12px ">
        <ul className="flex w-full flex-wrap gap-x-4px gap-y-8px">
          {activeKeywordList.map(selectedKeyword => (
            <Chip key={selectedKeyword} text={selectedKeyword} isSelected={true} />
          ))}
          <input
            type="text"
            value={inputValue}
            onKeyUp={handleKeyUp}
            onChange={onChange}
            placeholder="1개 이상의 키워드를 입력해주세요."
            className={`active:none bg-inherit text-b3 text-grey-900 placeholder:text-b3 placeholder:text-grey-400 ${
              isEmptyKeywordList || 'placeholder:text-transparent'
            }`}
          />
        </ul>
      </div>
      <div>
        <label className="text-b2 text-grey-400">이런 키워드는 어때요?</label>
        <ul className="flex flex-wrap gap-x-8px gap-y-12px py-16px">
          {TEMP_RECOMMEND_KEYWORD_LIST.map(recommendKeyword => (
            <Chip
              key={recommendKeyword}
              text={recommendKeyword}
              onClick={() => addKeyword(recommendKeyword)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const TEMP_RECOMMEND_KEYWORD_LIST = [
  '재치 발랄',
  '엽기 떡볶이',
  '맛집투어',
  'FE 짱짱',
  '7팀 최고',
  '디프만 최고~',
];
