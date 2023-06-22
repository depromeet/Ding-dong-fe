import { CharacterAlphabetType, CharacterCreationFormType } from '../CharacterCreation.type';

type OptionType = {
  name: CharacterAlphabetType;
  value: string;
};

export type QuestionDetail = {
  title: string;
  image: string;
  fieldName: keyof CharacterCreationFormType;
  firstOption: OptionType;
  secondOption: OptionType;
};
