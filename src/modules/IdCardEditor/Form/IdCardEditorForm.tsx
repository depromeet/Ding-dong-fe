import { useFormContext } from 'react-hook-form';

import {
  EditKeywordContentStep,
  EditKeywordStep,
  EditProfileInfoStep,
} from '~/modules/IdCardEditor/Step';
import { EditorSteps } from '~/types/idCard';

type IdCardEditorFormProps = {
  steps: EditorSteps[];
  stepOrder: number;
  onSubmit: () => Promise<void>;
  onClickMoveTargetStep: (targetStep: EditorSteps) => void;
};

export const IdCardEditorForm = ({
  steps,
  stepOrder,
  onClickMoveTargetStep,
  onSubmit,
}: IdCardEditorFormProps) => {
  const { handleSubmit } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {steps[stepOrder] === 'KEYWORD_CONTENT' && (
        <EditKeywordContentStep onClickMoveTargetStep={onClickMoveTargetStep} />
      )}
      {steps[stepOrder] === 'KEYWORD' && <EditKeywordStep />}
      {steps[stepOrder] === 'PROFILE' && <EditProfileInfoStep />}
    </form>
  );
};