import { IdCardCreationFormModel, IdCardDetailModel } from '~/types/idCard';

export type CreateIdCardRequest = IdCardCreationFormModel;

export type EditIdCardRequest = Omit<IdCardDetailModel, 'characterType'>;
