'use client';
import { useFormContext } from 'react-hook-form';

import { KeywordStep } from '@/modules/IdCardCreation/Step/KeywordStep.client';
import { Steps } from '@/types/idCard';

import { KeywordContentStep, ProfileStep } from '../Step';

type IdCardCreationFormProps = {
  steps: Steps[];
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
      <div key="Top navigation">
        {steps[stepOrder] === 'KEYWORD_CONTENT' ? (
          <button type="submit">제출</button>
        ) : (
          <button onClick={onNext}>다음</button>
        )}
        <button onClick={onPrev}>이전</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {steps[stepOrder] === 'PROFILE' && <ProfileStep />}
        {steps[stepOrder] === 'KEYWORD' && <KeywordStep />}
        {steps[stepOrder] === 'KEYWORD_CONTENT' && <KeywordContentStep />}
      </form>
    </div>
  );
};
