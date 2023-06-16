import { IdCardCreationFormModel } from '~/types/idCard';

export type CreationSteps =
  | 'LOADING'
  | 'BOARDING'
  | 'PROFILE'
  | 'KEYWORD'
  | 'KEYWORD_CONTENT'
  | 'COMPLETE';

export type IdCardCreationFormType = Omit<IdCardCreationFormModel, 'communityId'>;
