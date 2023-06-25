'use client';

import { useState } from 'react';

import { CharacterNameModel } from '~/types/idCard';

import { CharactorCreationStepsType } from './CharacterCreation.type';
import { CharacterCreationForm } from './Form/CharacterCreationForm.client';
import { CharacterBoardingStep } from './Step/CharacterBoardingStep';
import { CharacterCompleteStep } from './Step/CharacterCompleteStep.client';

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

  return (
    <div>
      {steps[stepOrder] === 'BOARDING' && <CharacterBoardingStep onNext={onNext} />}
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
