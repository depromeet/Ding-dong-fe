import { CharacterCreationFormType } from '../CharacterCreation.type';
import { QuestionDetail } from '../Question/CharacterQuestion.type';

export type QuestionsType = Record<'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH', QuestionDetail>;

export const characterCreationQuestions: QuestionsType = {
  FIRST: {
    title: '홀로 우주 패키지 여행을\n 가게 되었다',
    image: '/assets/images/onboarding-question-ticket.png',
    fieldName: 'firstAlphabet',
    firstOption: { fieldValue: 'E', content: '옆자리에 앉은 사람에게 말을 건다.' },
    secondOption: { fieldValue: 'I', content: '풍경을 보며 나만의 시간을 즐긴다.' },
  },
  SECOND: {
    title: '친구가 우주 여행 도중\n 소지품을 잃어버렸다',
    image: '/assets/images/onboarding-question-ufo.png',
    fieldName: 'secondAlphabet',
    firstOption: { fieldValue: 'T', content: '언제, 어디서, 어쩌다가?' },
    secondOption: { fieldValue: 'F', content: '너무 속상하겠다. 못 찾았어?' },
  },
  THIRD: {
    title: '친구와 함께 은하계 맛집을\n 가기로 했다',
    image: '/assets/images/onboarding-question-food.png',
    fieldName: 'thirdAlphabet',
    firstOption: { fieldValue: 'J', content: '미리 맛집 리스트를 먼저 찾아 놓아야겠다' },
    secondOption: { fieldValue: 'P', content: '맛있겠다 가서 뭐 먹을까?' },
  },
  FOURTH: {
    title: '이제껏 한 번도 나온적 없었던\n 후식을 받았다',
    image: '/assets/images/onboarding-question-snack.png',
    fieldName: 'fourthAlphabet',
    firstOption: { fieldValue: 'S', content: '서비스인가? 무슨 기념일인가?' },
    secondOption: { fieldValue: 'N', content: '우와 신기하게 생겼다!' },
  },
};

export const getCharacterName = (characterAlphabet: CharacterCreationFormType) => {
  const { firstAlphabet, secondAlphabet, thirdAlphabet, fourthAlphabet } = characterAlphabet;
  const characterWord = [firstAlphabet, secondAlphabet, thirdAlphabet, fourthAlphabet].join('');
  switch (characterWord) {
    case 'INFJ':
    case 'INFP':
    case 'ENFJ':
    case 'ENFP':
      return 'PIPI';
    case 'INTJ':
    case 'INTP':
    case 'ENTJ':
    case 'ENTP':
      return 'BUDDY';
    case 'ISFJ':
    case 'ISTJ':
    case 'ESFJ':
    case 'ESTJ':
      return 'TRUE';
    case 'ISFP':
    case 'ISTP':
    case 'ESFP':
    case 'ESTP':
      return 'TOBBY';
    default:
      return 'PIPI';
  }
};
