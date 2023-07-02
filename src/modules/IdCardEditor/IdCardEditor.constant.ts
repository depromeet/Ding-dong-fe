import { EditorSteps } from '~/modules/IdCardEditor/IdCardEditor.type';

// 순서가 있지는 않음. KEYWORD_CONTENT: 최초 진인접, / PROFILE, KEYWORD은 같은 깊이
export const editorSteps: EditorSteps[] = ['KEYWORD_CONTENT', 'PROFILE', 'KEYWORD'];

export const KEYWORD_CONTENT_STEP = 0;
export const PROFILE_STEP = 1;
export const KEYWORD_STEP = 2;

// TODO: 전체 form에서 사용되는 로직과 동일합니다! 추후 src/constant로 옮겨도 될 듯 해요~
export const MAX_KEYWORD_LIST_LENGTH = 7;
export const MAX_KEYWORD_INPUT_LENGTH = 8;
export const MAX_NICKNAME_LENGTH = 16;
export const MAX_ABOUT_ME_LENGTH = 50;
