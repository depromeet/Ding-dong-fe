'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { IdCardCreationForm } from '~/modules/IdCardCreation/Form';
import { BoardingStep, CompleteStep } from '~/modules/IdCardCreation/Step';
import { IdCardCreationFormModel } from '~/types/idCard';

import { CreationSteps } from './IdCardCreation.type';

const steps: CreationSteps[] = ['BOARDING', 'PROFILE', 'KEYWORD', 'KEYWORD_CONTENT', 'COMPLETE'];

const schema = yup.object({
  profileImageUrl: yup.string(),
  communityId: yup.number(),
  nickname: yup.string().required('이름을 입력해 주세요.'),
  aboutMe: yup.string(),
  keywords: yup.array().default([]),
});

export const IdCardCreationSteps = () => {
  const methods = useForm<IdCardCreationFormModel>({
    defaultValues: {
      keywords: [],
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [stepOrder, setStepOrder] = useState<number>(0);
  const onNext = () => setStepOrder(stepOrder + 1);
  const onPrev = () => setStepOrder(stepOrder - 1);

  return (
    <FormProvider {...methods}>
      {/* planetName 주입이 필요합니다. */}
      <div className="px-20pxr">
        {steps[stepOrder] === 'BOARDING' && <BoardingStep planetName="Dingdong" onNext={onNext} />}
        {['PROFILE', 'KEYWORD', 'KEYWORD_CONTENT'].includes(steps[stepOrder]) && (
          <IdCardCreationForm steps={steps} stepOrder={stepOrder} onNext={onNext} onPrev={onPrev} />
        )}
        {steps[stepOrder] === 'COMPLETE' && <CompleteStep />}
      </div>
    </FormProvider>
  );
};
