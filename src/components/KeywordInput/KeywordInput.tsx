'use client';

import { KeyboardEvent, MouseEvent, useRef } from 'react';

import { Chip } from '@/components/Chip/Chip';
import { useKeywordInput } from '@/components/KeywordInput/useKeywordInput.hooks';

import { OptionType } from './keywordInput.type';
import { useInputAutoSize } from './useInputAutoSize';

type KeywordInputProps = {
  id: string;
  placeholder: string;
  keywordLabel: string;
  keywordOptions: OptionType[];
  activeKeywordList: OptionType[];
  onChange: (...event: any[]) => void; // rhf의 onChange타입입니다.
  maxActiveKeywordListLength: number;
  maxInputLength: number;
};

export const KeywordInput = ({
  id,
  placeholder,
  keywordLabel,
  keywordOptions,
  activeKeywordList,
  onChange,
  maxActiveKeywordListLength,
  maxInputLength,
}: KeywordInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const isEmptyKeywordList = activeKeywordList.length === 0;

  const { inputValue, onChangeInput, addKeyword, deleteKeyword } = useKeywordInput({
    id,
    activeKeywordList,
    onChange,
    maxActiveKeywordListLength,
    maxInputLength,
  });

  useInputAutoSize({
    inputRef,
    inputValue,
    activeKeywordListLength: activeKeywordList.length,
  });

  const shouldFocusInput = () => {
    inputRef.current?.focus();
  };

  // event handler

  const handleClickBackground = () => {
    shouldFocusInput();
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    // rn으로 실행했을 때도 정상적으로 작동했습니다.
    if (event.key === 'Enter') {
      addKeyword(inputValue);
      return;
    }
  };

  return (
    <div className="flex w-full flex-col">
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
      <div className="mx-20px">
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
