'use client';

import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { IdCardCreationForm } from '~/modules/IdCardCreation/Form';
import { BoardingStep, CompleteStep, LoadingStep } from '~/modules/IdCardCreation/Step';
import { IdCardCreationFormModel } from '~/types/idCard';

import {CreationSteps} from './IdCardCreation.type';

const steps: CreationSteps[] = ['LOADING', 'BOARDING', 'PROFILE', 'KEYWORD', 'KEYWORD_CONTENT', 'COMPLETE'];

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

  useEffect(() => {
    const loadingShow = setTimeout(() => onNext(), 2000);
    return () => clearTimeout(loadingShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      {/* planetName 주입이 필요합니다. */}
      <div key="Top navigation">
        {steps[stepOrder] === 'KEYWORD_CONTENT' ? (
          <button type="submit">제출</button>
        ) : (
          <button onClick={onNext}>다음</button>
        )}
        <button onClick={onPrev}>이전</button>
      </div>
      <div className="px-20pxr">
        {steps[stepOrder] === 'LOADING' && <LoadingStep planetName="Ding dong" />}
        {steps[stepOrder] === 'BOARDING' && <BoardingStep planetName="Dingdong" onNext={onNext} />}
        {['PROFILE', 'KEYWORD', 'KEYWORD_CONTENT'].includes(steps[stepOrder]) && (
          <IdCardCreationForm step={steps[stepOrder]} />
        )}
        {steps[stepOrder] === 'COMPLETE' && <CompleteStep />}
      </div>
    </FormProvider>
  );
};
