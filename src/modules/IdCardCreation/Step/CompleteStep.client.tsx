'use client';

import { useFormContext } from 'react-hook-form';

import Button from '@/components/Button/Button';
import { IdCard } from '@/modules/IdCard/IdCard.client';
import { KeywordModel } from '@/types/idCard';

export const CompleteStep = () => {
  const { getValues } = useFormContext();
  const values = getValues();
  const { nickname, aboutMe, keywords } = values;
  const keywordTitles = keywords.map((keyword: KeywordModel) => keyword.title);
  return (
    // TODO: 지금은 커뮤니티 정보가 없는데 나중에 커뮤니티 타이틀 추가
    <div>
      <h2 className="text-h2 text-grey-900">
        짜잔!
        {/**타이틀 자리 */}
      </h2>
      <h2 className="text-h2 text-grey-900">주민증이 발급되었어요!</h2>
      <IdCard
        idCardId={values.id}
        aboutMe={aboutMe}
        keywordTitles={keywordTitles}
        nickname={nickname}
        // TODO: 로그인 할때 캐릭터 타입 정보 넣어서 가져오기
        characterType="TOBBY"
      />
      <p className="my-52px w-full text-center text-b1 text-primary-500">주민증을 눌러보세요!</p>
      {
        // TODO: 행성 정보 생기면 그때 이동하기 만들기
        <Button size="large" color="primary">
          행성 방문하기
        </Button>
      }
    </div>
  );
};
