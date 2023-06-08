'use client';

import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { IdCardForm } from '@/modules/IdCardCreation/Form';
import { Steps } from '@/modules/IdCardCreation/IdCardCreation.type';

const steps: Steps[] = ['BOARDING', 'PROFILE', 'KEYWORD', 'KEYWORD_CONTENT', 'COMPLETE'];

export type Data = {
  nickname: string;
  aboutMe: string;
  keywords: { title: string; imageUrl: string; content: string }[];
};

export const ResidentCardSteps = () => {
  const methods = useForm({
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
    <FormProvider<Data> {...methods}>
      {steps[stepOrder] === 'BOARDING' && (
        <div>
          <div>borading</div>
          <button onClick={onNext}>행성 만들기</button>
        </div>
      )}
      {['PROFILE', 'KEYWORD', 'KEYWORD_CONTENT'].includes(steps[stepOrder]) && (
        <div>
          <IdCardForm steps={steps} stepOrder={stepOrder} onNext={onNext} onPrev={onPrev} />
        </div>
      )}
      {steps[stepOrder] === 'COMPLETE' && <div>complete</div>}
    </FormProvider>
  );
};
