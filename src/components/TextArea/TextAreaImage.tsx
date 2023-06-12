'use client';
import Image from 'next/image';

import { tw } from '~/utils/tailwind.util';

type SafeNumber = number | `${number}`;

type TextAreaImageProps = { src: string; alt: string; height?: SafeNumber };

export const TextAreaImage = ({ src, alt, height }: TextAreaImageProps) => {
  return (
    <div className={tw(`py-8pxr`)}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        style={{ width: '100%', height: height ?? 'auto' }}
      />
    </div>
  );
};
