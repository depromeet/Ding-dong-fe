'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { isEqual } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useEditIdCardDetail, useGetCommunityMyIdCardDetail } from '~/api/domain/idCard.api';
import { ConfirmUnSave, useConfirmPopup } from '~/components/ConfirmPopup';
import { TopNavigation } from '~/components/TopNavigation';
import { idCardCreationSchema as idCardEditorSchema } from '~/modules/IdCardCreation';
import { IdCardEditorForm } from '~/modules/IdCardEditor/Form';
import { editorSteps, KEYWORD_CONTENT_STEP } from '~/modules/IdCardEditor/IdCardEditor.constant';
import { EditorSteps, IdCardEditorFormValues } from '~/modules/IdCardEditor/IdCardEditor.type';
import { useToastMessageStore } from '~/stores/toastMessage.store';
import { getEntries } from '~/utils/util.common';

type IdCardEditorProps = {
  communityId: number;
};

export const IdCardEditor = ({ communityId }: IdCardEditorProps) => {
  const { data } = useGetCommunityMyIdCardDetail(communityId);
  const { errorToast } = useToastMessageStore();

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
    mode: 'onChange',
    resolver: yupResolver(idCardEditorSchema),
  });

  const onSubmit = async (idCardInfo: IdCardEditorFormValues) => {
    await mutateEditIdCardDetail(
      { idCardId, ...idCardInfo },
      {
        onError: error => {
          errorToast(error.message);
        },
        onSuccess: () => {
          router.back();
        },
        onSettled: () => {
          methods.reset();
        },
      },
    );
  };

  const canSubmit = methods.formState.isValid && !methods.formState.isSubmitting;
  const submitButtonStyle = canSubmit ? 'text-primary-500' : 'text-grey-400';

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
          <TopNavigation.Right className="text-h5 font-semibold">
            <button
              onClick={onClickCompleteButton}
              disabled={!canSubmit}
              className={submitButtonStyle}
            >
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
            />
          </div>
        )}
      </FormProvider>
      {isConfirmUnSaveOpen && <ConfirmUnSave confirm={confirmUnSave} />}
    </>
  );
};
