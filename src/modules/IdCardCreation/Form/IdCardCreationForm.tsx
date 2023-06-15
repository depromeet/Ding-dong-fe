'use client';
import { useFormContext } from 'react-hook-form';

import { TopNavigation } from '~/components/TopNavigation';
import { CreationSteps } from '~/modules/IdCardCreation/IdCardCreation.type';
import { KeywordStep } from '~/modules/IdCardCreation/Step/KeywordStep.client';

import { KeywordContentStep, ProfileStep } from '../Step';

type IdCardCreationFormProps = {
  steps: CreationSteps[];
  stepOrder: number;
  onNext: () => void;
  onPrev: () => void;
};

export const IdCardCreationForm = ({
  steps,
  stepOrder,
  onNext,
  onPrev,
}: IdCardCreationFormProps) => {
  const { handleSubmit } = useFormContext();
  const onSubmit = () => console.log('제출');

  return (
    <div>
      <TopNavigation bottomBorderColor="primary-500">
        <TopNavigation.Left>
          <TopNavigation.BackButton onClickBackButton={onPrev} />
        </TopNavigation.Left>
        <TopNavigation.Title />
        <TopNavigation.Right>
          {steps[stepOrder] === 'KEYWORD_CONTENT' ? (
            <button type="submit">제출</button>
          ) : (
            <button onClick={onNext}>다음</button>
          )}
        </TopNavigation.Right>
      </TopNavigation>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-24pxr">
        {steps[stepOrder] === 'PROFILE' && <ProfileStep />}
        {steps[stepOrder] === 'KEYWORD' && <KeywordStep />}
        {steps[stepOrder] === 'KEYWORD_CONTENT' && <KeywordContentStep />}
      </form>
    </div>
  );
};
