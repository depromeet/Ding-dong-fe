import { EditorSteps } from '~/types/idCard';

type EditKeywordContentStepProps = {
  onClickMoveTargetStep: (targetStep: EditorSteps) => void;
};

export const EditKeywordContentStep = ({ onClickMoveTargetStep }: EditKeywordContentStepProps) => {
  return (
    <div>
      <button onClick={() => onClickMoveTargetStep('KEYWORD')}>KEYWORD</button>
      <button onClick={() => onClickMoveTargetStep('PROFILE')}>PROFILE</button>
    </div>
  );
};
