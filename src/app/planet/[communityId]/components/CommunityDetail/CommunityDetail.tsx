'use client';

import Image from 'next/image';
import { Suspense } from 'react';

import { useGetCommunityDetail } from '~/api/domain/community.api';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { CommunityLogoImage } from '~/modules/CommunityProfile';
import { DINGDONG_PLANET } from '~/utils/variable';

type CommunityDetailProps = {
  id: number;
};

// TODO: 디폴트 관련 논의 후 수정
export const CommunityDetailComponent = ({ id }: CommunityDetailProps) => {
  const isDingDongPlanet = id === DINGDONG_PLANET.DINGDONG_PLANET_ID;
  const { data } = useGetCommunityDetail(id);

  if (!data?.communityDetailsDto) {
    return <div></div>;
  }

  const { coverImageUrl, title, logoImageUrl, userCount, description } = data.communityDetailsDto;

  return (
    <div className="h-[calc(420px*0.65)]">
      {/*  width = 100vw, height = width * 0.48 */}
      <div className="relative h-[calc(420px*0.48)] mobile:h-[calc(100vw*0.48)]">
        <Image
          fill
          src={coverImageUrl ?? '/assets/images/planet-cover-default-image.png'}
          alt={`${title} cover image`}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex w-[calc(100vw-40px)] max-w-[calc(420px-40px)] translate-x-[20px] translate-y-[-50%] items-center gap-12pxr rounded-3xl border border-gray-200 bg-white p-18pxr shadow-[0_2px_24px_0px_rgba(0,0,0,0.05)]">
        <CommunityLogoImage logoImageUrl={logoImageUrl} />
        <div className="flex flex-col gap-8pxr">
          <p className="text-sm font-medium text-gray-800">{`주민 ${
            isDingDongPlanet ? 4 : userCount ?? 0
          }명`}</p>
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
        <CommunityDetailComponent id={id} />
      </Suspense>
    </RetryErrorBoundary>
  );
};
