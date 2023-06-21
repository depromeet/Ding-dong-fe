export type CharacterCreationFormType = {
  first: 'E' | 'I';
  second: 'F' | 'T';
  third: 'J' | 'P';
  fourth: 'S' | 'N';
};

export type CharactorCreationStepsType =
  | 'BOARDING'
  | 'FIRST'
  | 'SECOND'
  | 'THIRD'
  | 'FOURTH'
  | 'COMPLETE';
