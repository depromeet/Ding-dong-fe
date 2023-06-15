/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { TopNavigation } from '~/components/TopNavigation';
import { IdCardEditorForm } from '~/modules/IdCardEditor/Form';
import { EditorSteps } from '~/modules/IdCardEditor/IdCardEditor.type';
import { IdCardEditorFormModel } from '~/types/idCard';

// 순서가 있지는 않음. KEYWORD_CONTENT: 최초 진인접, / PROFILE, KEYWORD은 같은 깊이
const steps: EditorSteps[] = ['KEYWORD_CONTENT', 'PROFILE', 'KEYWORD'];

const KEYWORD_CONTENT_STEP = 0;
const PROFILE_STEP = 1;
const KEYWORD_STEP = 2;

type IdCardEditorProps = IdCardEditorFormModel;

export const IdCardEditor = ({
  communityId,
  profileImageUrl,
  nickname,
  aboutMe,
  keywords,
}: IdCardEditorProps) => {
  const methods = useForm<IdCardEditorFormModel>({
    defaultValues: {
      nickname,
      aboutMe,
      profileImageUrl,
      keywords,
    },
  });
  const router = useRouter();
  const [stepOrder, setStepOrder] = useState<number>(KEYWORD_CONTENT_STEP);

  const title = steps[stepOrder] === 'PROFILE' ? '주민 정보 수정' : '주민증 수정';
  const isEntry = stepOrder === KEYWORD_CONTENT_STEP;

  const onSubmit = async () => {
    new Promise(res => res(1));
  };

  const onClickMoveTargetStep = (targetStep: EditorSteps) => {
    const stepIndex = steps.findIndex(step => step === targetStep);
    setStepOrder(stepIndex);
  };

  const onClickBackButton = () => {
    if (isEntry) {
      router.back();
      return;
    }
    setStepOrder(KEYWORD_CONTENT_STEP);
  };

  const onClickCompleteButton = () => {
    if (isEntry) {
      onSubmit();
      // TODO: onSubmit이 정상 실행될 때만 뒤로 가기
      router.back();
      return;
    }
    setStepOrder(KEYWORD_CONTENT_STEP);
  };

  return (
    <FormProvider {...methods}>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton onClickBackButton={onClickBackButton} />
        </TopNavigation.Left>
        <TopNavigation.Title>{title}</TopNavigation.Title>
        <TopNavigation.Right>
          <button onClick={onClickCompleteButton} className="text-h5 font-semibold text-blue-500">
            완료
          </button>
        </TopNavigation.Right>
      </TopNavigation>
      {['PROFILE', 'KEYWORD', 'KEYWORD_CONTENT'].includes(steps[stepOrder]) && (
        <div className="pt-[50px]">
          <IdCardEditorForm
            steps={steps}
            stepOrder={stepOrder}
            onClickMoveTargetStep={onClickMoveTargetStep}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </FormProvider>
  );
};
