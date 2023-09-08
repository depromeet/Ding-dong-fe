'use client';
import Link from 'next/link';
import { Suspense } from 'react';

import { useGetIdCardDetail } from '~/api/domain/idCard.api';
import { useGetUserInfo } from '~/api/domain/user.api';
import { Nudge } from '~/app/planet/[communityId]/id-card/[idCardId]/components/Nudge/Nudge.client';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { TopNavigation } from '~/components/TopNavigation';
import { Intro, KeywordContentCard } from '~/modules/IdCardDetail';
import { CharacterNameModel } from '~/types/idCard';

const bgColors: Record<CharacterNameModel, string> = {
  BUDDY: 'bg-buddy-100',
  TOBBY: 'bg-tobby-100',
  PIPI: 'bg-pipi-100',
  TRUE: 'bg-true-100',
};

type IdCardDetailProps = {
  idCardId: number;
  communityId: number;
};

const IdCardDetailComponent = ({ idCardId, communityId }: IdCardDetailProps) => {
  const { data: idCardDetail } = useGetIdCardDetail(idCardId);
  const { data: userInfo } = useGetUserInfo();

  const idCardDetailsDto = idCardDetail!.idCardDetailsDto;
  const userId = userInfo!.userProfileDto.userId;

  const bgColor = bgColors[idCardDetailsDto.characterType];

  const isMyIdCard = userId === idCardDetailsDto.userId;

  return (
    <>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton />
        </TopNavigation.Left>
        {isMyIdCard && (
          <TopNavigation.Right>
            <Link
              href={`/my-page/${communityId}/edit`}
              className="text-h5 font-semibold text-primary-500"
            >
              수정
            </Link>
          </TopNavigation.Right>
        )}
      </TopNavigation>
      <div className={`${bgColor} rounded-3xl pt-7`}>
        <Intro {...idCardDetailsDto} />
        <div className="flex flex-col gap-5 bg-white px-5 py-5">
          {idCardDetailsDto.keywords.map(keyword => (
            <KeywordContentCard
              key={keyword.keywordId}
              title={keyword.title}
              image={
                keyword.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={keyword.imageUrl}
                    alt={keyword.title}
                    className="mx-auto my-0 w-full rounded-xl object-contain"
                  />
                )
              }
              content={keyword.content}
            />
          ))}
        </div>
      </div>
      <Nudge
        isMyIdCard={isMyIdCard}
        nickname={idCardDetailsDto.nickname}
        idCardUserId={idCardDetailsDto.userId}
        idCardId={idCardId}
        NudgeType="FRIENDLY"
        communityId={communityId}
      />
    </>
  );
};

export const IdCardDetail = ({ idCardId, communityId }: IdCardDetailProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        <IdCardDetailComponent idCardId={idCardId} communityId={communityId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
