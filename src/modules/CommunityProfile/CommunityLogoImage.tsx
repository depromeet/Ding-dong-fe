import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type LogoSize = 'small' | 'medium' | 'large';
type CommunityLogoImageProps = {
  logoImageUrl?: string;
  size?: LogoSize;
};

const sizes: Record<LogoSize, string> = {
  small: 'h-20pxr w-20pxr',
  medium: 'h-32pxr w-32pxr',
  large: 'h-60pxr w-60pxr',
};
export const CommunityLogoImage = ({ logoImageUrl, size = 'large' }: CommunityLogoImageProps) => {
  const logoSize = sizes[size];
  const defaultPlanetLogoImage = logoImageUrl || '/assets/images/default_planet_logo.png';

  return (
    <div className={twMerge(logoSize, 'relative flex-shrink-0 overflow-hidden rounded-full')}>
      <Image
        src={defaultPlanetLogoImage}
        alt="planet logo image"
        fill={true}
        className="object-cover"
      />
    </div>
  );
};
