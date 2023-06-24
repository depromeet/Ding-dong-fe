'use client';

import { useEffect, useState } from 'react';

import { CharacterNameModel } from '~/types/idCard';

import { CharactorCreationStepsType } from './CharacterCreation.type';
import { CharacterCreationForm } from './CharacterCreationForm.client';
import SendNickname from './sendNickname';
import { CharacterCompleteStep } from './Step/CharacterCompleteStep';

const steps: CharactorCreationStepsType[] = [
  'BOARDING',
  'FIRST',
  'SECOND',
  'THIRD',
  'FOURTH',
  'COMPLETE',
];

export const CharacterCreationSteps = () => {
  const [stepOrder, setStepOrder] = useState<number>(0);
  const onNext = () => {
    if (stepOrder >= 5) return;
    setStepOrder(stepOrder + 1);
  };
  const onPrev = () => {
    if (stepOrder <= 0) return;
    setStepOrder(stepOrder - 1);
  };

  const [selectedCharacter, setSelectedCharacter] = useState<CharacterNameModel>();
  const onSubmit = (name: CharacterNameModel) => {
    setSelectedCharacter(name);
  };

  useEffect(() => {
    setTimeout(() => onNext(), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/*BoradingStep은 임의로 넣어놓았습니다 */}
      {steps[stepOrder] === 'BOARDING' && <SendNickname />}
      {['FIRST', 'SECOND', 'THIRD', 'FOURTH'].includes(steps[stepOrder]) && (
        <CharacterCreationForm
          steps={steps}
          stepOrder={stepOrder}
          onNext={onNext}
          onPrev={onPrev}
          onSubmit={onSubmit}
        />
      )}
      {steps[stepOrder] === 'COMPLETE' && selectedCharacter && (
        <CharacterCompleteStep characterName={selectedCharacter} />
      )}
    </div>
  );
};
