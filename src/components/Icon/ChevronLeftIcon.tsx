import { SVGProps } from 'react';

// TODO: 모든 SVG 아이콘에 필요하니 추상화 작업이 필요하다고 생각해요~ (색상 변경, 크키 변경, 등등)
type ChevronLeftIconProps = SVGProps<SVGSVGElement>;

const ChevronLeftIcon = ({ ...rest }: ChevronLeftIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M16.1836 4L8 12.1836L16.1836 20.3672"
        stroke="#2A2A2A"
        strokeWidth="1.51434"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronLeftIcon;
