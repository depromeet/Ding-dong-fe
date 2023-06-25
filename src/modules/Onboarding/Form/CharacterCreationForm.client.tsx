'use client';
import { MouseEvent } from 'react';
import { useForm } from 'react-hook-form';

import { usePostCharacterCreate } from '~/api/domain/user.api';
import { TopNavigation } from '~/components/TopNavigation';
import {
  CharacterAlphabetType,
  CharacterCreationFormType,
  CharacterCreationStepsType,
} from '~/modules/Onboarding/CharacterCreation.type';
import {
  characterCreationQuestions,
  getCharacterName,
  QuestionsType,
} from '~/modules/Onboarding/Form/CharacterCreationForm.helper';
import { CharacterQuestion } from '~/modules/Onboarding/Question/CharacterQuestion';
import { CharacterNameModel } from '~/types/idCard';
import { tw } from '~/utils/tailwind.util';

type CharacterCreationFormProps = {
  steps: CharacterCreationStepsType[];
  stepOrder: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: (name: CharacterNameModel) => void;
};

export const CharacterCreationForm = ({
  steps,
  stepOrder,
  onNext,
  onPrev,
  onSubmit,
}: CharacterCreationFormProps) => {
  const {
    formState: { isValid, isSubmitting },
    setValue,
    handleSubmit,
    watch,
  } = useForm<CharacterCreationFormType>();
  const { mutateAsync } = usePostCharacterCreate();

  const canSubmit = isValid && !isSubmitting;
  const submitButtonStyle = canSubmit ? 'text-primary-500' : 'text-grey-400';
  const onSubmitClick = () => {
    handleSubmit(async values => {
      const characterName = getCharacterName(values);
      await mutateAsync(characterName);
      onSubmit(characterName);
    })();
    onNext();
  };
  const step = steps[stepOrder] as keyof QuestionsType;
  const currentQuestionInfo = characterCreationQuestions[step];
  const onQuestionButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setValue(currentQuestionInfo.fieldName, e.currentTarget.name as CharacterAlphabetType);
    if (steps[stepOrder] !== 'FOURTH') {
      onNext();
    }
  };

  const fieldValue = watch(characterCreationQuestions[step]['fieldName']);

  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          {steps[stepOrder] !== 'FIRST' && <TopNavigation.BackButton onClickBackButton={onPrev} />}
        </TopNavigation.Left>
        <TopNavigation.Title />
        <TopNavigation.Right className="text-h5">
          {steps[stepOrder] === 'FOURTH' && (
            <button className={tw(submitButtonStyle)} disabled={!canSubmit} onClick={onSubmitClick}>
              완료
            </button>
          )}
        </TopNavigation.Right>
        <TopNavigation.ProgressBar currentStep={stepOrder} stepsLength={4} />
      </TopNavigation>

      <div className="mt-24pxr px-layout-sm">
        <CharacterQuestion
          title={currentQuestionInfo.title}
          image={currentQuestionInfo.image}
          firstOption={currentQuestionInfo.firstOption}
          secondOption={currentQuestionInfo.secondOption}
          onQuestionButtonClick={onQuestionButtonClick}
          selectedFieldValue={fieldValue}
        />
      </div>
    </div>
  );
};
