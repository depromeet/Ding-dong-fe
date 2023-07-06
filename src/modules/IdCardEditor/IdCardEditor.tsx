'use client';

import { isEqual } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useEditIdCardDetail, useGetCommunityMyIdCardDetail } from '~/api/domain/idCard.api';
import { ConfirmUnSave, useConfirmPopup } from '~/components/ConfirmPopup';
import { TopNavigation } from '~/components/TopNavigation';
import { IdCardEditorForm } from '~/modules/IdCardEditor/Form';
import { editorSteps, KEYWORD_CONTENT_STEP } from '~/modules/IdCardEditor/IdCardEditor.constant';
import { EditorSteps, IdCardEditorFormValues } from '~/modules/IdCardEditor/IdCardEditor.type';
import { getEntries } from '~/utils/util.common';

type IdCardEditorProps = {
  communityId: number;
};

export const IdCardEditor = ({ communityId }: IdCardEditorProps) => {
  const { data } = useGetCommunityMyIdCardDetail(communityId);

  const { idCardId, nickname, aboutMe, profileImageUrl, keywords } = data!.idCardDetailsDto;

  const initFormValue = {
    nickname,
    aboutMe,
    profileImageUrl,
    keywords,
  };

  const router = useRouter();
  const [stepOrder, setStepOrder] = useState<number>(KEYWORD_CONTENT_STEP);
  const { mutateAsync: mutateEditIdCardDetail } = useEditIdCardDetail(communityId);
  const [submitState, setSubmitState] = useState<IdCardEditorFormValues>(initFormValue);

  const {
    isOpen: isConfirmUnSaveOpen,
    openPopup: openConfirmUnSavePopup,
    closePopup: closeConfirmUnSavePopup,
    confirm: confirmUnSave,
  } = useConfirmPopup();

  const title = editorSteps[stepOrder] === 'PROFILE' ? '주민 정보 수정' : '주민증 수정';
  const isEntry = stepOrder === KEYWORD_CONTENT_STEP;

  const methods = useForm<IdCardEditorFormValues>({
    defaultValues: initFormValue,
  });

  const onSubmit = async (idCardInfo: IdCardEditorFormValues) => {
    await mutateEditIdCardDetail({ idCardId, ...idCardInfo });
  };

  const isValueChanged = () =>
    getEntries(submitState).some(([name, value]) => !isEqual(methods.getValues(name), value));

  const revertToPrevFormState = () => {
    getEntries(submitState).forEach(([name, value]) => methods.setValue(name, value));
  };

  const updateFormState = () => {
    setSubmitState(prev => ({ ...prev, ...methods.getValues() }));
  };

  const onClickMoveTargetStep = (targetStep: EditorSteps) => {
    // 페이지 이동시 formState와 rhf의 values를 동기화
    updateFormState();
    const stepIndex = editorSteps.findIndex(step => step === targetStep);
    setStepOrder(stepIndex);
  };

  const onClickBackButton = async () => {
    if (isEntry) {
      if (isValueChanged()) {
        const isOk = await openConfirmUnSavePopup();
        closeConfirmUnSavePopup();
        if (isOk) {
          router.back();
        }
        return;
      }
      router.back();
      return;
    }

    console.log('submitState', submitState);
    console.log('methods.getValues()', methods.getValues());
    if (isValueChanged()) {
      const isOk = await openConfirmUnSavePopup();
      closeConfirmUnSavePopup();
      if (isOk) {
        revertToPrevFormState();
        setStepOrder(KEYWORD_CONTENT_STEP);
      }
      return;
    }

    setStepOrder(KEYWORD_CONTENT_STEP);
  };

  const onClickCompleteButton = async () => {
    updateFormState();
    if (isEntry) {
      await methods.handleSubmit(onSubmit)();

      // TODO: onSubmit이 정상 실행될 때만 뒤로 가기: useMutation 정상 실행여부 판단하기
      router.back();
      return;
    }
    setStepOrder(KEYWORD_CONTENT_STEP);
  };

  return (
    <>
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
        {['PROFILE', 'KEYWORD', 'KEYWORD_CONTENT'].includes(editorSteps[stepOrder]) && (
          <div className="pt-28pxr">
            <IdCardEditorForm
              steps={editorSteps}
              stepOrder={stepOrder}
              onClickMoveTargetStep={onClickMoveTargetStep}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </FormProvider>
      {isConfirmUnSaveOpen && <ConfirmUnSave confirm={confirmUnSave} />}
    </>
  );
};
