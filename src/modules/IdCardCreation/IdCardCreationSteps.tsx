'use client';

import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { IdCardCreationForm } from '@/modules/IdCardCreation/Form';
import { BoardingStep } from '@/modules/IdCardCreation/Step/BoardingStep.client';
import { CompleteStep } from '@/modules/IdCardCreation/Step/CompleteStep.client';
import { IdCardCreationFormModel, Steps } from '@/types/idCard/creation.type';
const steps: Steps[] = ['BOARDING', 'PROFILE', 'KEYWORD', 'KEYWORD_CONTENT', 'COMPLETE'];

export const IdCardCreationSteps = () => {
  const methods = useForm<IdCardCreationFormModel>({
    defaultValues: {
      nickname: '',
      aboutMe: '',
      keywords: [],
    },
  });
  const [stepOrder, setStepOrder] = useState<number>(0);
  const onNext = useCallback(() => {
    setStepOrder(stepOrder + 1);
  }, [stepOrder]);
  const onPrev = useCallback(() => {
    setStepOrder(stepOrder - 1);
  }, [stepOrder]);

  return (
    <FormProvider {...methods}>
      {/* planetName 주입이 필요합니다. */}
      {steps[stepOrder] === 'BOARDING' && <BoardingStep planetName="Dingdong" onNext={onNext} />}
      {['PROFILE', 'KEYWORD', 'KEYWORD_CONTENT'].includes(steps[stepOrder]) && (
        <div>
          <IdCardCreationForm steps={steps} stepOrder={stepOrder} onNext={onNext} onPrev={onPrev} />
        </div>
      )}
      {steps[stepOrder] === 'COMPLETE' && (
        <div>
          <CompleteStep />
        </div>
      )}
    </FormProvider>
  );
};
