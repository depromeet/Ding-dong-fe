import 'server-only';

import Image from 'next/image';
import { Suspense } from 'react';

import { getCommunityDetailServer } from '~/api/domain/community.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { CommunityLogoImage } from '~/modules/CommunityProfile';

type CommunityDetailProps = {
  id: number;
};

// TODO: 디폴트 관련 논의 후 수정
export const CommunityDetailComponent = async ({ id }: CommunityDetailProps) => {
  const { communityDetailsDto } = await getCommunityDetailServer(id);
  const { coverImageUrl, title, logoImageUrl, idCardCount, description } = communityDetailsDto;

  return (
    <div>
      {/*  width = 100vw, height = width * 0.48 */}
      <div className="relative h-[calc(410px*0.48)] mobile:h-[calc(100vw*0.48)]">
        <Image
          fill
          src={coverImageUrl ?? '/assets/images/planet-cover-default-image.png'}
          alt={`${title} cover image`}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex w-[calc(100vw-40px)] max-w-[calc(410px-40px)] translate-x-[20px] translate-y-[-50%] items-center gap-12pxr rounded-3xl border border-grey-100 bg-white p-18pxr">
        <CommunityLogoImage logoImageUrl={logoImageUrl} />
        <div className="flex flex-col gap-8pxr">
          <p className="text-sm font-medium text-gray-800">{`주민 ${idCardCount}`}</p>
          <p className="text-detail text-gray-800 ">{`${
            description ?? '우리 행성에 온 걸 환영해~!'
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export const CommunityDetail = ({ id }: CommunityDetailProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <CommunityDetailComponent id={id} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
