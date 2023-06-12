import { ButtonHTMLAttributes } from 'react';

import { CancelIcon, PlusIcon } from '~/components/Icon';

type ChipThemeType = 'default' | 'close' | 'plus';
type ChipColor = 'default' | 'selected';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
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

const iconColors: Record<ChipColor, string> = {
  default: '',
  selected: 'fill-white',
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<ChipThemeType, (props: any) => JSX.Element> = {
  default: () => <></>,
  close: CancelIcon,
  plus: PlusIcon,
};

export const Chip = ({
  text,
  themeType = 'default',
  isSelected = false,
  handleClickIcon,
  onClick,
}: ChipProps) => {
  const colorType = isSelected ? 'selected' : 'default';
  const ButtonIcon = icons[themeType];
  return (
    <button
      onClick={onClick}
      className={`${colors[colorType]} flex h-[30px] w-fit items-center justify-center gap-1.5 rounded-[50px] border-[1px] px-8pxr py-12pxr text-b3`}
    >
      <span>{text}</span>
      <ButtonIcon onClick={handleClickIcon} className={`${iconColors[colorType]}`} />
    </button>
  );
};
