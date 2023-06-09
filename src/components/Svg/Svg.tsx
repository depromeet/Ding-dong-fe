import { PropsWithChildren, SVGProps } from 'react';

import { ClassNameType } from '@/types/util';
import { tw } from '@/utils/tailwind.util';

type SvgProps = SVGProps<SVGSVGElement> & {
  /**
   * width, height와 동시에 적용하는 size입니다. (단위 px)
   * @default `24`
   */
  size?: number;

  /**
   * size가 존재하더라도 무시하고 적용되는 width입니다. (단위 px)
   * @default `24`
   */
  width?: number;

  /**
   * height 존재하더라도 무시하고 적용되는 width입니다. (단위 px)
   * @default `24`
   */
  height?: number;

  /**
   * tailwind으로 svg css 수정할 수 있어요! (크기 조정도 가능합니다)
   * https://tailwindcss.com/docs/fill
   * https://tailwindcss.com/docs/stroke
   * https://tailwindcss.com/docs/stroke-width
   */
  className?: ClassNameType;
};

export const Svg = ({
  size,
  width,
  height,
  children,
  className,
  viewBox,
  ...rest
}: PropsWithChildren<SvgProps>) => {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;
  const vb = viewBox ?? `0 0 24 24`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox={vb}
      fill="none"
      className={tw('fill-black', className)}
      {...rest}
    >
      {children}
    </svg>
  );
};
