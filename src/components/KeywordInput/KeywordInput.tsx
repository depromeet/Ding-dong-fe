'use client';

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import { Chip } from '@/components/Chip/Chip';

type KeywordInputProps = object;

const DEFAULT_INPUT_WIDTH = 32; // 동적으로 input width를 정할 때 최소 너비
const DEFAULT_WORD_WIDTH = 15; // 한 글자당 최소 너비
const isOverMaxKeywordListLength = (len: number) => len > 7;
const isOverMaxInputValue = (len: number) => len > 8;

const addKeywordListAvoidDuplicate = (keyword: string, keywordList: string[]) => {
  if (isOverMaxKeywordListLength(keywordList.length)) return keywordList;
  const newKeywordList = keywordList.filter(item => item !== keyword).concat(keyword);

  return newKeywordList;
};

// eslint-disable-next-line no-empty-pattern
export const KeywordInput = ({}: KeywordInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [activeKeywordList, setActiveKeywordList] = useState<string[]>([]);

  const isEmptyKeywordList = activeKeywordList.length === 0;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = event.target.value;
    if (isOverMaxInputValue(currentInputValue.length)) return;
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

  useEffect(() => {
    const inputLength =
      inputValue.length === 0 ? DEFAULT_INPUT_WIDTH : inputValue.length * DEFAULT_WORD_WIDTH;
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.style.width = 'auto'; // Reset the width to auto
      if (isEmptyKeywordList) {
        inputElement.style.width = '100%';
      } else {
        inputElement.style.width = `${inputLength}px`; // Set the width to match the content
      }
    }
  }, [inputValue, activeKeywordList.length]);

  return (
    <div className="flex w-full flex-col px-20px">
      <h3>라벨</h3>
      <div className="flex min-h-[56px] bg-grey-50 px-20px py-12px ">
        <ul className="flex w-full flex-wrap items-center gap-x-4px gap-y-8px">
          {activeKeywordList.map(selectedKeyword => (
            <Chip key={selectedKeyword} text={selectedKeyword} isSelected={true} />
          ))}
          <input
            ref={inputRef}
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
