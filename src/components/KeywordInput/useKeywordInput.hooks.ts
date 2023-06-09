import { ChangeEvent, useState } from 'react';

import { OptionType } from './keywordInput.type';

type UseKeywordInputProps = {
  id: string;
  activeKeywordList: OptionType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void; // rhf의 onChange타입입니다.
  maxActiveKeywordListLength: number;
  maxInputLength: number;
};

export const useKeywordInput = ({
  id,
  activeKeywordList,
  onChange,
  maxActiveKeywordListLength,
  maxInputLength,
}: UseKeywordInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const isOverMaxInputValue = (len: number) => len > maxInputLength;
  const isOverMaxKeywordListLength = (len: number) => len >= maxActiveKeywordListLength;

  const resetInputValue = () => {
    setInputValue('');
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = event.target.value;

    if (isOverMaxInputValue(currentInputValue.length)) return;

    setInputValue(currentInputValue);
  };

  const createKeyword = (title: string) => {
    return {
      title,
      imageUrl: '',
      content: '',
    };
  };

  const addKeywordListAvoidDuplicate = (keyword: string, keywordList: OptionType[]) => {
    if (isOverMaxKeywordListLength(keywordList.length)) return keywordList;
    const newKeywordList = [
      ...keywordList.filter(({ title }) => title !== keyword),
      createKeyword(keyword),
    ];

    return newKeywordList;
  };

  const deleteKeywordListAvoidDuplicate = (keyword: string, keywordList: OptionType[]) => {
    const newKeywordList = keywordList.filter(({ title }) => title !== keyword);

    return newKeywordList;
  };

  const addKeyword = (keyword: string) => {
    if (keyword === '') return;
    const filteredKeywordList = addKeywordListAvoidDuplicate(keyword, activeKeywordList);
    onChange({
      target: {
        id,
        value: filteredKeywordList,
      },
    });
    resetInputValue();
  };

  const deleteKeyword = (keyword: string) => {
    const filteredKeywordList = deleteKeywordListAvoidDuplicate(keyword, activeKeywordList);
    onChange({
      target: {
        id,
        value: filteredKeywordList,
      },
    });
  };

  return {
    inputValue,
    onChangeInput,
    addKeyword,
    deleteKeyword,
  };
};
