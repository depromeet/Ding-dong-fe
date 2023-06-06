'use client';

import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ResidentCardForm } from '@/modules/ResidentCardCreation/Form';
import { Steps } from '@/modules/ResidentCardCreation/ResidentCardCreation.type';

const steps: Steps[] = ['BOARDING', 'PROFILE', 'KEYWORD', 'KEYWORD_CONTENT', 'COMPLETE'];

export const ResidentCardSteps = () => {
  const methods = useForm();
  const [stepOrder, setStepOrder] = useState<number>(0);
  const onNext = useCallback(() => {
    setStepOrder(stepOrder + 1);
  }, [stepOrder]);
  const onPrev = useCallback(() => {
    setStepOrder(stepOrder - 1);
  }, [stepOrder]);

  return (
    <FormProvider {...methods}>
      {steps[stepOrder] === 'BOARDING' && (
        <div>
          <div>borading</div>
          <button onClick={onNext}>행성 만들기</button>
        </div>
      )}
      {['PROFILE', 'KEYWORD', 'KEYWORD_CONTENT'].includes(steps[stepOrder]) && (
        <div>
          <ResidentCardForm steps={steps} stepOrder={stepOrder} onNext={onNext} onPrev={onPrev} />
        </div>
      )}
      {steps[stepOrder] === 'COMPLETE' && <div>complete</div>}
    </FormProvider>
  );
};
