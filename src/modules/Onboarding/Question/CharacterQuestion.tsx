import Image from 'next/image';
import { MouseEvent } from 'react';

import { CharacterAlphabetType } from '~/modules/Onboarding/CharacterCreation.type';
import { QuestionDetail } from '~/modules/Onboarding/Question/CharacterQuestion.type';
import { tw } from '~/utils/tailwind.util';

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
    <>
      <main>
        <h1 className="text-h2">{title}</h1>
        <Image
          width={375}
          height={812}
          src={image}
          alt="character question image"
          className="mx-auto mt-17pxr"
        />
        <div className="mt-[24px] flex flex-col gap-20pxr">
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
      </main>
      <div className="h-[26px] bg-white" />
    </>
  );
};
