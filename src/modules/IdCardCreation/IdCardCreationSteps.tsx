'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { usePostIdCardCreate } from '~/api/domain/idCard.api';
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
  keywords: yup.array().min(1).default([]).required(),
});

export const IdCardCreationSteps = () => {
  const methods = useForm<IdCardCreationFormModel>({
    defaultValues: {
      keywords: [],
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [userId, setUserId] = useState<number>();

  const [stepOrder, setStepOrder] = useState<number>(0);
  const onNext = () => setStepOrder(stepOrder + 1);
  const onPrev = () => setStepOrder(stepOrder - 1);

  const { mutateAsync } = usePostIdCardCreate({
    onSuccess: data => {
      setUserId(data.id);
    },
  });
  const onSubmit = () => {
    methods.handleSubmit(async data => {
      await mutateAsync(data);
    })();
    onNext();
  };

  return (
    <FormProvider {...methods}>
      {/* planetName 주입이 필요합니다. */}
      <div>
        {steps[stepOrder] === 'BOARDING' && <BoardingStep onNext={onNext} />}
        {['PROFILE', 'KEYWORD', 'KEYWORD_CONTENT'].includes(steps[stepOrder]) && (
          <IdCardCreationForm
            steps={steps}
            stepOrder={stepOrder}
            onNext={onNext}
            onPrev={onPrev}
            onSubmit={onSubmit}
          />
        )}
        {steps[stepOrder] === 'COMPLETE' && userId && <CompleteStep userId={userId} />}
      </div>
    </FormProvider>
  );
};
