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

  const onClickBackground = () => {
    shouldFocusInput();
  };

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    // rn으로 실행했을 때도 정상적으로 작동했습니다.
    if (event.key === 'Enter') {
      addKeyword(inputValue);
      return;
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div
        onClick={onClickBackground}
        className="mb-28pxr flex min-h-[56px] bg-grey-50 px-20pxr py-12pxr"
      >
        <ul className="flex w-full flex-wrap items-center gap-x-4pxr gap-y-8pxr">
          {activeKeywordList.map(({ title }) => (
            <Chip
              key={title}
              text={title}
              isSelected={true}
              themeType="close"
              onClick={(event: MouseEvent) => event.stopPropagation()} // handleClickBackground이 자식 요소로 전파되는 걸 막습니다.
              handleClickIcon={() => deleteKeyword(title)}
            />
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onKeyUp={onKeyUp}
            onChange={onChangeInput}
            placeholder={placeholder}
            className={`active:none h-[30px] bg-inherit text-b3 text-grey-900 placeholder:text-b3 placeholder:text-grey-400 ${
              isEmptyKeywordList || 'placeholder:text-transparent'
            }`}
          />
        </ul>
      </div>
      <div className="mx-20pxr">
        <label className="text-b2 text-grey-400">{keywordLabel}</label>
        <ul className="flex flex-wrap gap-x-8pxr gap-y-12pxr py-16pxr">
          {keywordOptions.map(({ title }) => (
            <Chip key={title} text={title} onClick={() => addKeyword(title)} />
          ))}
        </ul>
      </div>
    </div>
  );
};
