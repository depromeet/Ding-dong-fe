import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type LogoSize = 'small' | 'medium' | 'large';
type CommunityLogoImageProps = {
  logoImageUrl: string;
  size?: LogoSize;
};

const sizes: Record<LogoSize, string> = {
  small: 'h-20pxr w-20pxr',
  medium: 'h-32pxr w-32pxr',
  large: 'h-60pxr w-60pxr',
};
export const CommunityLogoImage = ({ logoImageUrl, size = 'large' }: CommunityLogoImageProps) => {
  const logoSize = sizes[size];
  return (
    <div className={twMerge(logoSize, 'flex-shrink-0 rounded-full')}>
      <Image width={60} height={60} src={logoImageUrl} alt="planet logo image" />
    </div>
  );
};
