import Image from 'next/image';
import { MouseEvent } from 'react';

import { QuestionDetail } from './CharacterQuestion.type';
type CharacterQuestionProps = Omit<QuestionDetail, 'fieldName'> & {
  onQuestionButtonClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const CharacterQuestion = ({
  title,
  image,
  firstOption,
  secondOption,
  onQuestionButtonClick,
}: CharacterQuestionProps) => {
  return (
    <div>
      <h1 className="text-h2">{title}</h1>
      <Image
        width={375}
        height={812}
        src={image}
        alt="character question image"
        className="mx-auto mt-17pxr"
      />
      <div className="mt-24pxr flex flex-col gap-20pxr">
        {[firstOption, secondOption].map(option => {
          const { name, value } = option;

          return (
            <button
              key={name}
              name={name}
              value={value}
              className="rounded-[12px] border-[1px] border-solid border-grey-200 bg-grey-50 px-24pxr py-27pxr text-b1 text-gray-800"
              type="button"
              onClick={onQuestionButtonClick}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};
