import { useState } from 'react';

import { CharacterNameModel } from '~/types/idCard';

import SendNickname from './sendNickname';
import { CharacterCompleteStep } from './Step/CharacterCompleteStep';

const steps = ['BOARDING', 'FIRST', 'SECOND', 'THIRD', 'FOURTH', 'COMPLETE'];

export const CharacterCreationSteps = () => {
  const [stepOrder, setStepOrder] = useState<number>(0);
  const onNext = () => setStepOrder(stepOrder + 1);
  const onPrev = () => setStepOrder(stepOrder - 1);

  const [selectedCharacter, setSelectedCharacter] = useState<CharacterNameModel>();
  return (
    <div>
      {/*BoradingStep은 임의로 넣어놓았습니다 */}
      {steps[stepOrder] === 'BOARDING' && <SendNickname />}
      {['FIRST', 'SECOND', 'THIRD', 'FOURTH'].includes(steps[stepOrder]) && <div />}
      {steps[stepOrder] === 'COMPLETE' && selectedCharacter && (
        <CharacterCompleteStep characterName={selectedCharacter} />
      )}
    </div>
  );
};
