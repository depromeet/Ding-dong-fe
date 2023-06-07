'use client';

import { ChangeEvent, KeyboardEvent, MouseEvent, useRef, useState } from 'react';

import { Chip } from '@/components/Chip/Chip';

import { OptionType } from './keywordInput.type';
import { useInputAutoSize } from './useInputAutoSize';

type KeywordInputProps = {
  label: string;
  placeholder: string;
  keywordLabel: string;
  keywordOptions: OptionType[];
  onChange: (...event: any[]) => void; // rhf의 onChange타입입니다.
};

export const KeywordInput = ({
  label,
  placeholder,
  keywordLabel,
  keywordOptions,
  onChange,
}: KeywordInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [activeKeywordList, setActiveKeywordList] = useState<OptionType[]>([]);

  const isEmptyKeywordList = activeKeywordList.length === 0;

  useInputAutoSize({
    inputRef,
    inputValue,
    activeKeywordListLength: activeKeywordList.length,
  });

  // function

  const shouldFocusInput = () => {
    inputRef.current?.focus();
  };

  const resetInputValue = () => {
    setInputValue('');
  };

  const addKeyword = (keyword: string) => {
    if (keyword === '') return;
    setActiveKeywordList(prev => addKeywordListAvoidDuplicate(keyword, prev));
    resetInputValue();
  };

  const deleteKeyword = (keyword: string) => {
    setActiveKeywordList(prev => deleteKeywordListAvoidDuplicate(keyword, prev));
  };

  // event handler

  const handleClickBackground = () => {
    shouldFocusInput();
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = event.target.value;

    if (isOverMaxInputValue(currentInputValue.length)) return;

    setInputValue(currentInputValue);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    // rn으로 실행했을 때도 정상적으로 작동했습니다.
    if (event.key === 'Enter') {
      addKeyword(inputValue);
      return;
    }
  };

  return (
    <div className="mx-20px flex w-full flex-col">
      <h3 className="py-24px text-h2 text-black">{label}</h3>
      <div
        onClick={handleClickBackground}
        className="mb-28px flex min-h-[56px] bg-grey-50 px-20px py-12px"
      >
        <ul className="flex w-full flex-wrap items-center gap-x-4px gap-y-8px">
          {activeKeywordList.map(({ text }) => (
            <Chip
              key={text}
              text={text}
              isSelected={true}
              themeType="close"
              onClick={(event: MouseEvent) => event.stopPropagation()} // handleClickBackground이 자식 요소로 전파되는 걸 막습니다.
              handleClickIcon={() => deleteKeyword(text)}
            />
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onKeyUp={handleKeyUp}
            onChange={onChangeInput}
            placeholder={placeholder}
            className={`active:none h-[30px] bg-inherit text-b3 text-grey-900 placeholder:text-b3 placeholder:text-grey-400 ${
              isEmptyKeywordList || 'placeholder:text-transparent'
            }`}
          />
        </ul>
      </div>
      <div>
        <label className="text-b2 text-grey-400">{keywordLabel}</label>
        <ul className="flex flex-wrap gap-x-8px gap-y-12px py-16px">
          {keywordOptions.map(({ text }) => (
            <Chip key={text} text={text} onClick={() => addKeyword(text)} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const isOverMaxKeywordListLength = (len: number) => len > 7;
const isOverMaxInputValue = (len: number) => len > 8;

const createKeyword = (text: string) => {
  return {
    text,
  };
};

const addKeywordListAvoidDuplicate = (keyword: string, keywordList: OptionType[]) => {
  if (isOverMaxKeywordListLength(keywordList.length)) return keywordList;
  const newKeywordList = keywordList
    .filter(({ text }) => text !== keyword)
    .concat(createKeyword(keyword));

  return newKeywordList;
};

const deleteKeywordListAvoidDuplicate = (keyword: string, keywordList: OptionType[]) => {
  const newKeywordList = keywordList.filter(({ text }) => text !== keyword);

  return newKeywordList;
};
