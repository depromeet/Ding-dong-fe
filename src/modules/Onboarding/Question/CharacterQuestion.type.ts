import { CharacterAlphabetType, CharacterCreationFormType } from '../CharacterCreation.type';

type OptionType = {
  fieldValue: CharacterAlphabetType;
  content: string;
};

export type QuestionDetail = {
  title: string;
  image: string;
  fieldName: keyof CharacterCreationFormType;
  firstOption: OptionType;
  secondOption: OptionType;
};
