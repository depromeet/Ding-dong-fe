'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useCheckIdCards } from '~/api/domain/community.api';
import { useGetCommunityMyIdCardDetail, usePostIdCardCreate } from '~/api/domain/idCard.api';
import { useGetUserInfo } from '~/api/domain/user.api';
import { IdCardCreationForm } from '~/modules/IdCardCreation/Form';
import { CreationSteps } from '~/modules/IdCardCreation/IdCardCreation.type';
import { BoardingStep, CompleteStep } from '~/modules/IdCardCreation/Step';
import { useToastMessageStore } from '~/stores/toastMessage.store';
import { IdCardCreationFormModel } from '~/types/idCard';

const INIT_STEP = 0;

const steps: CreationSteps[] = ['BOARDING', 'PROFILE', 'KEYWORD', 'KEYWORD_CONTENT', 'COMPLETE'];

export const idCardCreationSchema = yup.object({
  profileImageUrl: yup.string(),
  communityId: yup.number(),
  nickname: yup.string().required('이름을 입력해 주세요.'),
  aboutMe: yup.string(),
  keywords: yup.array().min(1).default([]).required(),
});

type IdCardCreationStepsProps = {
  communityId: number;
};

export const IdCardCreationSteps = ({ communityId }: IdCardCreationStepsProps) => {
  const { errorToast } = useToastMessageStore();
  const { data } = useGetUserInfo();
  const profileImageUrl = data?.userProfileDto.profileImageUrl;
  const router = useRouter();
  const pathname = usePathname();
  const methods = useForm<IdCardCreationFormModel>({
    defaultValues: {
      communityId,
      profileImageUrl,
      nickname: '',
      aboutMe: '',
      keywords: [],
    },
    mode: 'onChange',
    resolver: yupResolver(idCardCreationSchema),
  });
  const [idCardId, setIdCardId] = useState<number>();

  const [stepOrder, setStepOrder] = useState<number>(INIT_STEP);
  const onNext = () => setStepOrder(stepOrder + 1);
  const onPrev = () => setStepOrder(stepOrder - 1);

  const { mutateAsync } = usePostIdCardCreate({
    onSuccess: data => {
      setIdCardId(data.id);
    },
    onError: error => {
      errorToast(error.message);
      setTimeout(() => {
        const planetIdPathname = pathname.replace('/id-card/create', '');
        router.push(`${planetIdPathname}`);
      }, 2000);
    },
  });

  //TODO: Extract logic of sending complete step to router
  const { data: checkIdCard } = useCheckIdCards(communityId);
  const { data: idCardDetails } = useGetCommunityMyIdCardDetail(communityId, {
    enabled: !!checkIdCard?.userMakeIdCard,
  });

  useLayoutEffect(() => {
    if (!checkIdCard?.userMakeIdCard || !idCardDetails || stepOrder === steps.length - 1) {
      return;
    }
    const { idCardId, profileImageUrl, nickname, aboutMe, keywords } =
      idCardDetails.idCardDetailsDto;
    const transformedKeywords = keywords.map(keyword => {
      return { title: keyword.title, imageUrl: keyword.imageUrl, content: keyword.content };
    });

    setIdCardId(idCardId);
    methods.setValue('profileImageUrl', profileImageUrl);
    methods.setValue('nickname', nickname);
    methods.setValue('aboutMe', aboutMe);
    methods.setValue('keywords', transformedKeywords);
    setStepOrder(steps.length - 1);
  }, [checkIdCard, checkIdCard?.userMakeIdCard, idCardDetails, methods, stepOrder]);

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
        {steps[stepOrder] === 'COMPLETE' && idCardId && <CompleteStep idCardId={idCardId} />}
      </div>
    </FormProvider>
  );
};
