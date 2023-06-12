import Image from 'next/image';

import { CommunityDetailModel } from '@/types/community';

type CommunityDetailProps = Omit<CommunityDetailModel, 'communityId'>;

export const CommunityDetail = ({
  logoImageUrl,
  coverImageUrl,
  title,
  idCardCount,
  description,
}: CommunityDetailProps) => {
  return (
    <div>
      {/*// TODO:이미지 사이즈 조절 필요*/}
      <Image width={400} height={180} src={coverImageUrl} alt={`${title} cover image`} />
      <div className="w-full">
        <div className="absolute mx-[20px] -mt-60pxr flex h-[92pxr] items-center gap-12pxr rounded-3xl border border-grey-100 bg-white p-16pxr">
          <div className="h-60pxr w-60pxr">
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
          <div className="flex w-full flex-col gap-8pxr">
            <p className={'text-sm font-medium text-gray-800'}>{`주민 ${idCardCount}`}</p>
            <p className={'text-detail text-gray-800'}>{`${description}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
