import Image from 'next/image';

import { CommunitySummaryType } from '@/types/community';

export const CommunitySummary = ({
  communityId,
  logoImageUrl,
  coverImageUrl,
  title,
  idCardCount,
  description,
}: CommunitySummaryType) => {
  return (
    <div>
      {/*// TODO:이미지 사이즈 조절 필요*/}
      <Image width={400} height={180} src={coverImageUrl} alt={`${title} cover image`} />
      <div className="w-full">
        <div className="h-92px absolute mx-20px -mt-10 flex items-center gap-12px rounded-3xl border border-grey-100 bg-white p-16px">
          <div className="h-60px w-60px">
            <Image
              width={60}
              height={60}
              src={logoImageUrl}
              alt={`${title} logo image`}
              style={{
                borderRadius: '50%',
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-8px">
            <p className={'text-sm font-medium text-gray-800'}>{`주민 ${idCardCount}`}</p>
            <p className={'text-detail text-gray-800'}>{`${description}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
