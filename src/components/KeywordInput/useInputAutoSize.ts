import { RefObject, useEffect } from 'react';

type UseInputAutoSizeProps = {
  inputRef: RefObject<HTMLInputElement>;
  inputValue: string;
  activeKeywordListLength: number;
};

// TODO: 외부에서 주입 받을 수 있게 수정하기
const DEFAULT_INPUT_WIDTH = 32; // 동적으로 input width를 정할 때 최소 너비
const DEFAULT_WORD_WIDTH = 15; // 한 글자당 최소 너비

export const useInputAutoSize = ({
  inputRef,
  inputValue,
  activeKeywordListLength,
}: UseInputAutoSizeProps) => {
  const isEmptyKeywordList = activeKeywordListLength === 0;

  const resetWidth = (inputElement: HTMLInputElement) => {
    inputElement.style.width = 'auto';
  };

  const setInputWidth = (inputElement: HTMLInputElement) => {
    const inputLength =
      inputValue.length === 0 ? DEFAULT_INPUT_WIDTH : inputValue.length * DEFAULT_WORD_WIDTH;

    if (isEmptyKeywordList) {
      inputElement.style.width = '100%';
    } else {
      inputElement.style.width = `${inputLength}px`; // Set the width to match the content
    }
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    resetWidth(inputElement);
    setInputWidth(inputElement);
  }, [inputValue, activeKeywordListLength]);
};
