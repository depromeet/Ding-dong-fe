'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { useGetCommunityDetail } from '~/api/domain/community.api';
import { useGetIdCardDetail } from '~/api/domain/idCard.api';
import { Button } from '~/components/Button';
import { IdCard } from '~/modules/IdCard/IdCard.client';
import { IdCardCreationFormModel } from '~/types/idCard';

type CompleteStepProps = {
  idCardId: number;
};

export const CompleteStep = ({ idCardId }: CompleteStepProps) => {
  const { getValues } = useFormContext<IdCardCreationFormModel>();
  const values = getValues();
  const { nickname, aboutMe, keywords, profileImageUrl } = values;
  const keywordTitles = keywords.map(keyword => keyword.title);
  const router = useRouter();
  const { communityId } = useParams();
  const { data: idCardDetail } = useGetIdCardDetail(idCardId);
  const { data: communityDetail } = useGetCommunityDetail(Number(communityId));

  const onMoveToCommunity = () => {
    router.push(`/planet/${communityId}`);
  };

  return (
    <div className="flex min-h-[calc(100vh-50px)] flex-col px-layout-sm ">
      <h2 className="text-h1 text-grey-900">{`짜잔! ${
        communityDetail?.communityDetailsDto.title || ''
      } \n주민증이 발급되었어요!`}</h2>
      <div className="mt-24pxr flex max-h-[650px] flex-1 flex-col justify-between">
        {idCardDetail && (
          <IdCard
            profileImageUrl={profileImageUrl}
            idCardId={idCardId}
            aboutMe={aboutMe}
            keywordTitles={keywordTitles}
            nickname={nickname}
            characterType={idCardDetail.idCardDetailsDto.characterType}
          />
        )}
        <Link href={`/planet/${communityId}/id-card/${idCardId}`}>
          <p className="flex w-full flex-1 items-center justify-center text-center text-b1 text-primary-500">
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
