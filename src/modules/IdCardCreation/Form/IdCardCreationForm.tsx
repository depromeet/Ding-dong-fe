'use client';
import { useFormContext } from 'react-hook-form';

import { TopNavigation } from '~/components/TopNavigation';
import { CreationSteps } from '~/modules/IdCardCreation/IdCardCreation.type';
import { KeywordStep } from '~/modules/IdCardCreation/Step/KeywordStep.client';
import { IdCardCreationFormModel } from '~/types/idCard';

import { KeywordContentStep, ProfileStep } from '../Step';

type IdCardCreationFormProps = {
  steps: CreationSteps[];
  stepOrder: number;
  onNext: () => void;
  onPrev: () => void;
};

const disableButtonStyle = 'text-grey-400';

export const IdCardCreationForm = ({
  steps,
  stepOrder,
  onNext,
  onPrev,
}: IdCardCreationFormProps) => {
  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useFormContext<IdCardCreationFormModel>();
  const onSubmit = () => console.log('제출');

  const getNavigationButton = () => {
    let error;
    let disableStyle;
    switch (steps[stepOrder]) {
      case 'PROFILE':
        error = !isDirty || !!errors?.nickname;
        disableStyle = (error && disableButtonStyle) || '';
        return (
          <button className={disableStyle} disabled={error} onClick={onNext}>
            다음
          </button>
        );
      case 'KEYWORD':
        disableStyle = (!isValid && disableButtonStyle) || '';
        return (
          <button className={disableStyle} disabled={!isValid} onClick={onNext}>
            다음
          </button>
        );
      case 'KEYWORD_CONTENT':
        disableStyle = (!isValid && disableButtonStyle) || '';
        return (
          <button className={disableStyle} disabled={!isValid} type="submit">
            제출
          </button>
        );
      default:
        return null;
    }
  };
  const NavigationButton = getNavigationButton();

  return (
    <div>
      <TopNavigation bottomBorderColor="primary-500">
        <TopNavigation.Left>
          <TopNavigation.BackButton onClickBackButton={onPrev} />
        </TopNavigation.Left>
        <TopNavigation.Title />
        <TopNavigation.Right className="text-h5 text-primary-500">
          {NavigationButton}
        </TopNavigation.Right>
      </TopNavigation>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-24pxr">
        {steps[stepOrder] === 'PROFILE' && <ProfileStep />}
        {steps[stepOrder] === 'KEYWORD' && <KeywordStep />}
        {steps[stepOrder] === 'KEYWORD_CONTENT' && <KeywordContentStep />}
      </form>
    </div>
  );
};
