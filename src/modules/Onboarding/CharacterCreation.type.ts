export type CharacterCreationFormType = {
  firstAlphabet: 'E' | 'I';
  secondAlphabet: 'F' | 'T';
  thirdAlphabet: 'J' | 'P';
  fourthAlphabet: 'S' | 'N';
};

export type CharacterAlphabetType = 'E' | 'I' | 'F' | 'T' | 'J' | 'P' | 'S' | 'N';

export type CharacterCreationStepsType =
  | 'BOARDING'
  | 'FIRST'
  | 'SECOND'
  | 'THIRD'
  | 'FOURTH'
  | 'COMPLETE';
