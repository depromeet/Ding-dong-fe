import { SVGProps } from 'react';

// TODO: 모든 SVG 아이콘에 필요하니 추상화 작업이 필요하다고 생각해요~ (색상 변경, 크키 변경, 등등)
type ChevronLeftIconProps = SVGProps<SVGSVGElement>;

export const ChevronLeftIcon = ({ className, ...rest }: ChevronLeftIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} fill-black stroke-1`}
      {...rest}
    >
      <path
        d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
        fill="currentColor"
      />
    </svg>
  );
};
