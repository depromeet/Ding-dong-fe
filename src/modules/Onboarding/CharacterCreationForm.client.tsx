import { MouseEvent } from 'react';
import { useForm } from 'react-hook-form';

import { TopNavigation } from '~/components/TopNavigation';
import { CharacterNameModel } from '~/types/idCard';
import { tw } from '~/utils/tailwind.util';

import {
  CharacterAlphabetType,
  CharacterCreationFormType,
  CharactorCreationStepsType,
} from './CharacterCreation.type';
import { CharacterQuestion } from './Question/CharacterQuestion';
import { QuestionDetail } from './Question/CharacterQuestion.type';

type CharacterCreationFormProps = {
  steps: CharactorCreationStepsType[];
  stepOrder: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: (name: CharacterNameModel) => void;
};

type QuestionsType = Record<'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH', QuestionDetail>;

const questions: QuestionsType = {
  FIRST: {
    title: '홀로 우주 패키지 여행을\n 가게 되었다',
    image: '/assets/images/onboarding-question-ticket.png',
    fieldName: 'firstAlphabet',
    firstOption: { name: 'E', value: '옆자리에 앉은 사람에게 말을 건다.' },
    secondOption: { name: 'I', value: '풍경을 보며 나만의 시간을 즐긴다.' },
  },
  SECOND: {
    title: '친구가 우주 여행 도중\n 소지품을 잃어버렸다',
    image: '/assets/images/onboarding-question-ufo.png',
    fieldName: 'secondAlphabet',
    firstOption: { name: 'T', value: '언제, 어디서, 어쩌다가?' },
    secondOption: { name: 'F', value: '너무 속상하겠다. 못 찾았어?' },
  },
  THIRD: {
    title: '친구와 함께 은하계 맛집을\n 가기로 했다',
    image: '/assets/images/onboarding-question-food.png',
    fieldName: 'thirdAlphabet',
    firstOption: { name: 'J', value: '미리 맛집 리스트를 먼저 찾아 놓아야겠다' },
    secondOption: { name: 'P', value: '맛있겠다 가서 뭐 먹을까?' },
  },
  FOURTH: {
    title: '이제껏 한 번도 나온적 없었던\n 후식을 받았다',
    image: '/assets/images/onboarding-question-snack.png',
    fieldName: 'fourthAlphabet',
    firstOption: { name: 'S', value: '서비스인가? 무슨 기념일인가?' },
    secondOption: { name: 'N', value: '우와 신기하게 생겼다!' },
  },
};

export const CharacterCreationForm = ({
  steps,
  stepOrder,
  onNext,
  onPrev,
  onSubmit,
}: CharacterCreationFormProps) => {
  const {
    formState: { isValid, isSubmitting },
    setValue,
  } = useForm<CharacterCreationFormType>({});

  const canSubmit = isValid && !isSubmitting;
  const submitButtonStyle = canSubmit ? 'text-primary-500' : 'text-grey-400';
  const onSubmitClick = () => {
    // 각 경우의 수에 따라서 캐릭터 분류
    //handleSubmit()
    onSubmit('BUDDY');
    onNext();
  };
  const step = steps[stepOrder] as keyof QuestionsType;
  const currentQuestionInfo = questions[step];
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setValue(currentQuestionInfo.fieldName, e.currentTarget.name as CharacterAlphabetType);
    onNext();
  };

  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton onClickBackButton={onPrev} />
        </TopNavigation.Left>
        <TopNavigation.Title />
        <TopNavigation.Right className="text-h5">
          {steps[stepOrder] === 'FOURTH' && (
            <button className={tw(submitButtonStyle)} disabled={!canSubmit} onClick={onSubmitClick}>
              완료
            </button>
          )}
        </TopNavigation.Right>
        <TopNavigation.ProgressBar currentStep={stepOrder} stepsLength={3} />
      </TopNavigation>

      <div className="mt-24pxr">
        <CharacterQuestion
          title={currentQuestionInfo.title}
          image={currentQuestionInfo.image}
          firstOption={currentQuestionInfo.firstOption}
          secondOption={currentQuestionInfo.secondOption}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
