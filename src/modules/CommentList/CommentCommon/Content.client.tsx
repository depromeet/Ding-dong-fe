'use client';
import { useEffect, useRef, useState } from 'react';

import { CommentModel } from '~/types/comment';
import { tw } from '~/utils/tailwind.util';

type ContentProps = Pick<CommentModel, 'content'>;

const MAX_LINE = 5;

const isOverMaxHeight = (elementOffsetHeight: number, maxHeight: number) =>
  elementOffsetHeight > maxHeight;

export const Content = ({ content }: ContentProps) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [isShowDetail, setIsShowDetail] = useState(true); // Content의 line-height에 상관없이 우선 무조건 보여주기 (useEffect에서 MAX_LINE 넘으면 생략)
  const [isShowButton, setIsShowButton] = useState(false);
  const buttonLabel = isShowDetail ? '접기' : '자세히보기';
  const lineClampClass = isShowDetail ? '' : `line-clamp-5`; // FIXME: MAX_LINE 변수를 쓰고 싶은데 tailwind가 잘 안 먹혀요ㅠㅠ

  const shouldHideOverflowContent = () => {
    const contentElement = paragraphRef.current;

    if (contentElement) {
      const lineHeightString =
        // client 컴포넌트라 window가 Null이 될 수 없어요. 그래서 아래 lint rule을 off했어요
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        window.getComputedStyle(contentElement).getPropertyValue('line-height')!;

      const lineHeight = lineHeightString ? parseInt(lineHeightString, 10) : 0;
      const maxHeight = lineHeight * MAX_LINE;

      if (isOverMaxHeight(contentElement.offsetHeight, maxHeight)) {
        setIsShowButton(true);
        setIsShowDetail(false);
      }
    }
  };

  // line-clamp 속성만으로 MAX_LINE 이상이면 생략되게 가능하지만, content의 길이에 따라 다르게 설정해야하기 때문에 useEffect가 필요해요
  useEffect(() => {
    shouldHideOverflowContent();
  }, []);

  const handleShowDetail = () => {
    setIsShowDetail(prev => !prev);
  };

  return (
    <>
      <p ref={paragraphRef} className={tw('text-b3 text-black', `overflow-hidden`, lineClampClass)}>
        {content}
      </p>
      {isShowButton && (
        <button onClick={handleShowDetail} className="mt-4pxr text-b3 text-grey-600">
          {buttonLabel}
        </button>
      )}
    </>
  );
};
