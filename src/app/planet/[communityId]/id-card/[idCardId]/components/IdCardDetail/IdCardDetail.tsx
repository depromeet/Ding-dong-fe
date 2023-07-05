import Link from 'next/link';
import { Suspense } from 'react';

import { getIdCardDetailServer } from '~/api/domain/idCard.api.server';
import { getUserInfoServer } from '~/api/domain/user.api.server';
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

const IdCardDetailComponent = async ({ idCardId, communityId }: IdCardDetailProps) => {
  const [idCardDetailsDto, userProfileDto] = await Promise.all([
    getIdCardDetailServer(idCardId).then(response => response.idCardDetailsDto),
    getUserInfoServer().then(response => response.userProfileDto),
  ]);
  const bgColor = bgColors[idCardDetailsDto.characterType];

  const isMyIdCard = userProfileDto.userId === idCardDetailsDto.userId;

  return (
    <>
      <TopNavigation bgColor={bgColor}>
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
      <div className={`${bgColor} pt-[44px]`}>
        <Intro {...idCardDetailsDto} />
        <div className="flex flex-col gap-4 bg-white px-5 py-6">
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
                    className="mx-auto my-0 max-h-[192px] max-w-[308px] object-contain"
                  />
                )
              }
              content={keyword.content}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export const IdCardDetail = ({ idCardId, communityId }: IdCardDetailProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <IdCardDetailComponent idCardId={idCardId} communityId={communityId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
