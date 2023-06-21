import { useForm } from 'react-hook-form';

import { TopNavigation } from '~/components/TopNavigation';
import { CharacterNameModel } from '~/types/idCard';
import { tw } from '~/utils/tailwind.util';

import { CharacterCreationFormType, CharactorCreationStepsType } from './CharacterCreation.type';

type CharacterCreationFormProps = {
  steps: CharactorCreationStepsType[];
  stepOrder: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: (name: CharacterNameModel) => void;
};

export const CharacterCreationForm = ({
  steps,
  stepOrder,
  onNext,
  onPrev,
  onSubmit,
}: CharacterCreationFormProps) => {
  const {
    formState: { isValid, isSubmitting },
  } = useForm<CharacterCreationFormType>({});

  const canSubmit = isValid && !isSubmitting;
  const submitButtonStyle = canSubmit ? 'text-primary-500' : 'text-grey-400';
  const onSubmitClick = () => {
    // 각 경우의 수에 따라서 캐릭터 분류
    //handleSubmit()
    onSubmit('BUDDY');
    onNext();
  };

  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton onClickBackButton={onPrev} />
        </TopNavigation.Left>
        <TopNavigation.Title />
        <TopNavigation.Right className="text-h5">
          {steps[stepOrder] === 'FOURTH' && (
            <button className={tw(submitButtonStyle)} disabled={!canSubmit} onClick={onSubmitClick}>
              완료
            </button>
          )}
        </TopNavigation.Right>
        <TopNavigation.ProgressBar currentStep={stepOrder} stepsLength={3} />
      </TopNavigation>

      <form className="mt-24pxr">
        <div>tempalte</div>
      </form>
    </div>
  );
};
