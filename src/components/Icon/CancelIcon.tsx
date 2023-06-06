import { SVGProps } from 'react';

// TODO: 모든 SVG 아이콘에 필요하니 추상화 작업이 필요하다고 생각해요~ (색상 변경, 크키 변경, 등등)
type CancelIconProps = SVGProps<SVGSVGElement>;

const CancelIcon = ({ ...rest }: CancelIconProps) => {
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
        d="M16 1.4L14.6 0L8 6.6L1.4 0L0 1.4L6.6 8L0 14.6L1.4 16L8 9.4L14.6 16L16 14.6L9.4 8L16 1.4Z"
        fill="#282828"
      />
    </svg>
  );
};

export default CancelIcon;
