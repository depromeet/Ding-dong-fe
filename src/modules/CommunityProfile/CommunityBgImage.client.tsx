import Image from 'next/image';

type CommunityBgImageProps = {
  coverImageUrl: string;
};
export const CommunityBgImage = ({ coverImageUrl }: CommunityBgImageProps) => {
  return (
    <div className="relative h-[174px] w-full">
      <Image alt="planet cover image" src={coverImageUrl} fill={true} className="object-cover" />
    </div>
  );
};
