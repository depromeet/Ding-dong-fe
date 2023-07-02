'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { Button } from '~/components/Button';
import { IdCard } from '~/modules/IdCard/IdCard.client';
import { IdCardCreationFormModel } from '~/types/idCard';

const title = 'planet이름';

type CompleteStepProps = {
  userId: number;
};

export const CompleteStep = ({ userId }: CompleteStepProps) => {
  const { getValues } = useFormContext<IdCardCreationFormModel>();
  const values = getValues();
  const { nickname, aboutMe, keywords } = values;
  const keywordTitles = keywords.map(keyword => keyword.title);
  const router = useRouter();
  const { communityId } = useParams();

  const onMoveToCommunity = () => {
    router.push(`/planet/${communityId}`);
  };

  return (
    // TODO: 지금은 커뮤니티 정보가 없는데 나중에 커뮤니티 타이틀 추가
    <div className="flex min-h-[calc(100vh-50px)] flex-col px-layout-sm ">
      <h2 className="text-h1 text-grey-900">{`짜잔!${title} \n주민증이 발급되었어요!`}</h2>
      <div className="mt-24pxr flex flex-1 flex-col">
        <IdCard
          idCardId={userId}
          aboutMe={aboutMe}
          keywordTitles={keywordTitles}
          nickname={nickname}
          // TODO: 로그인 할때 캐릭터 타입 정보 넣어서 가져오기
          characterType="TOBBY"
        />
        <Link href={`/planet/${communityId}/id-card/${userId}`}>
          <p className="my-52px flex w-full flex-1 items-center justify-center text-center text-b1 text-primary-500">
            주민증을 눌러보세요!
          </p>
        </Link>
        <Button size="large" color="primary" className="mb-8pxr" onClick={onMoveToCommunity}>
          행성 방문하기
        </Button>
      </div>
    </div>
  );
};
