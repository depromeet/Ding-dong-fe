import { ButtonHTMLAttributes, ReactNode } from 'react';

type ChipThemeType = 'default' | 'close' | 'plus';
type ChipColor = 'default' | 'selected';

type ChipProps = {
  text: string;
  /**
   *  'default' | 'close' | 'plus'의 타입을 지정합니다.
   *  @default default
   */
  themeType?: ChipThemeType;
  /**
   * @default false
   */
  isSelected?: boolean;
  /**
   * type이 close, plus일 때만 넘겨주는 함수
   */
  handleClickIcon?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
};

const colors: Record<ChipColor, string> = {
  default: 'border-grey-300 bg-white text-grey-500',
  selected: 'bg-black text-white',
};

const icons: Record<ChipThemeType, ReactNode> = {
  default: <></>, // isDefault로 걸러져서 없어도되는데 타입지정을 어캐하지..
  close: <>X</>,
  plus: <>+</>,
};

export const Chip = ({
  text,
  themeType = 'default',
  isSelected = false,
  handleClickIcon,
}: ChipProps) => {
  const colorType = isSelected ? 'selected' : 'default';
  const isDefault = themeType === 'default';
  return (
    <div
      className={`${colors[colorType]} flex h-[30px] w-fit items-center justify-center gap-1.5 rounded-[50px] border-[1px] px-8px py-12px text-b3`}
    >
      <span>{text}</span>
      {!isDefault && <button onClick={handleClickIcon}>{icons[themeType]}</button>}
    </div>
  );
};
