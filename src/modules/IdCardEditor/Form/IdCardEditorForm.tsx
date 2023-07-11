import { FormEvent } from 'react';

import { EditorSteps } from '~/modules/IdCardEditor/IdCardEditor.type';
import {
  EditKeywordContentStep,
  EditKeywordStep,
  EditProfileInfoStep,
} from '~/modules/IdCardEditor/Step';

type IdCardEditorFormProps = {
  steps: EditorSteps[];
  stepOrder: number;

  onClickMoveTargetStep: (targetStep: EditorSteps) => void;
};

export const IdCardEditorForm = ({
  steps,
  stepOrder,
  onClickMoveTargetStep,
}: IdCardEditorFormProps) => {
  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
      {steps[stepOrder] === 'KEYWORD_CONTENT' && (
        <EditKeywordContentStep onClickMoveTargetStep={onClickMoveTargetStep} />
      )}
      {steps[stepOrder] === 'KEYWORD' && <EditKeywordStep />}
      {steps[stepOrder] === 'PROFILE' && <EditProfileInfoStep />}
    </form>
  );
};
