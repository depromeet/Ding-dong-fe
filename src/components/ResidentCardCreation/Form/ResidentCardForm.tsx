'use client';
import { useFormContext } from 'react-hook-form';

import { Steps } from '@/components/ResidentCardCreation/ResidentCardCreation.type';

import { ProfileStep } from '../Step';

type ResidentCardFormProps = {
  steps: Steps[];
  stepOrder: number;
  onNext: () => void;
  onPrev: () => void;
};

export const ResidentCardForm = ({ steps, stepOrder, onNext, onPrev }: ResidentCardFormProps) => {
  const { handleSubmit } = useFormContext();
  const onSubmit = () => console.log('제출');

  return (
    <div>
      <div key={'Top navigation'}>
        {steps[stepOrder] === 'KEYWORD_CONTENT' ? (
          <button type={'submit'}>제출</button>
        ) : (
          <button onClick={onNext}>다음</button>
        )}
        <button onClick={onPrev}>이전</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {steps[stepOrder] === 'PROFILE' && <ProfileStep />}
        {steps[stepOrder] === 'KEYWORD' && <div>키워드 생성</div>}
        {steps[stepOrder] === 'KEYWORD_CONTENT' && <div>키워드 컨텐츠 만들기</div>}
      </form>
    </div>
  );
};
