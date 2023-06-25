import Image from 'next/image';
import { MouseEvent } from 'react';

import { tw } from '~/utils/tailwind.util';

import { CharacterAlphabetType } from '../CharacterCreation.type';
// eslint-disable-next-line import/order
import { QuestionDetail } from './CharacterQuestion.type';

type CharacterQuestionProps = Omit<QuestionDetail, 'fieldName'> & {
  onQuestionButtonClick: (e: MouseEvent<HTMLButtonElement>) => void;
  selectedFieldValue?: CharacterAlphabetType;
};

export const CharacterQuestion = ({
  title,
  image,
  firstOption,
  secondOption,
  onQuestionButtonClick,
  selectedFieldValue,
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
          const { fieldValue, content } = option;
          const selectedStyle =
            selectedFieldValue === fieldValue && 'border-primary-500 bg-primary-100';
          return (
            <button
              key={fieldValue}
              name={fieldValue}
              className={tw(
                'rounded-[12px] border-[1px] border-solid border-grey-200 bg-grey-50 px-24pxr py-27pxr text-left text-b1 text-gray-800',
                selectedStyle,
              )}
              type="button"
              onClick={onQuestionButtonClick}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
};
