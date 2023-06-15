import { ReactNode } from 'react';

import { CommunityDetailModel } from '~/types/community';

import { CommunityLogoImage } from './CommunityLogoImage';

type CommunityProfileProps = Pick<
  CommunityDetailModel,
  'logoImageUrl' | 'description' | 'idCardCount'
> & { top?: ReactNode };

export const CommunityProfile = ({
  logoImageUrl,
  description,
  idCardCount,
  top,
}: CommunityProfileProps) => {
  return (
    <div className="flex flex-col gap-16pxr rounded-3xl border border-grey-100 bg-white p-18pxr">
      {top}
      <div className="flex items-center gap-12pxr">
        <CommunityLogoImage logoImageUrl={logoImageUrl} />
        <div className="flex w-full flex-col gap-8pxr">
          <p className="text-sm font-medium text-gray-800">{`주민 ${idCardCount}`}</p>
          <p className="text-detail text-gray-800">{description}</p>
        </div>
      </div>
    </div>
  );
};
