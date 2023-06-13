'use client';
import { useFormContext } from 'react-hook-form';

import { CreationSteps } from '~/modules/IdCardCreation/IdCardCreation.type';
import { KeywordStep } from '~/modules/IdCardCreation/Step/KeywordStep.client';

import { KeywordContentStep, ProfileStep } from '../Step';

type IdCardCreationFormProps = {
  steps: CreationSteps[];
  stepOrder: number;
  onNext: () => void;
  onPrev: () => void;
};

export const IdCardCreationForm = ({ step }: IdCardCreationFormProps) => {
  const { handleSubmit } = useFormContext();
  const onSubmit = () => console.log('제출');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-24pxr">
      {step === 'PROFILE' && <ProfileStep />}
      {step === 'KEYWORD' && <KeywordStep />}
      {step === 'KEYWORD_CONTENT' && <KeywordContentStep />}
    </form>
  );
};
