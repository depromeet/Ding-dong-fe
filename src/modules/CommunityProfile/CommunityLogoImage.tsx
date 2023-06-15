import Image from 'next/image';

type CommunityLogoImageProps = {
  logoImageUrl: string;
};
export const CommunityLogoImage = ({ logoImageUrl }: CommunityLogoImageProps) => {
  return (
    <div className="h-60pxr w-60pxr flex-shrink-0 rounded-full">
      <Image width={60} height={60} src={logoImageUrl} alt="planet logo image" />
    </div>
  );
};
