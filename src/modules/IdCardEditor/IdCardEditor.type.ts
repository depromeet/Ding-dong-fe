import { IdCardEditorFormModel } from '~/types/idCard';

export type EditorSteps = 'PROFILE' | 'KEYWORD' | 'KEYWORD_CONTENT';

export type IdCardEditorFormValues = Omit<IdCardEditorFormModel, 'idCardId'>;
