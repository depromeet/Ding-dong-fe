import { ClassNameType } from '@/types/util';

/**
 * className에 변수를 사용할 때(variant를 줘야할 때), 변수를 따로 선언하지 않을 수 있도록 도와주는 함수
 * ex) join(BUTTON_VARIANTS[variant], isFullWidth && 'w-full')
 * https://github.com/dcastil/tailwind-merge/blob/v1.13.0/docs/when-and-how-to-use-it.md#adding-props-that-toggle-internal-styles
 * @param args className
 * @returns string
 */
export const twJoinVariable = (...args: ClassNameType[]) => {
  return args.filter(Boolean).join(' ');
};
