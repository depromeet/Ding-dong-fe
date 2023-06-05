'use client';
import { useFormContext } from 'react-hook-form';

export type Steps = 'BOARDING' | 'PROFILE' | 'KEYWORD' | 'KEYWORD_CONTENT' | 'COMPLETE';

type ResidentCardFormProps = {
  steps: Steps[];
  stepOrder: number;
  onNext: () => void;
  onPrev: () => void;
};

export const ResidentCardForm = ({ steps, stepOrder, onNext, onPrev }: ResidentCardFormProps) => {
  const { handleSubmit } = useFormContext();
  const onSubmit = data => console.log(data);

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
        {steps[stepOrder] === 'PROFILE' && <div>이름 및 소개</div>}
        {steps[stepOrder] === 'KEYWORD' && <div>키워드 생성</div>}
        {steps[stepOrder] === 'KEYWORD_CONTENT' && <div>키워드 컨텐츠 만들기</div>}
      </form>
    </div>
  );
};
