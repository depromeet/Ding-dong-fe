import { ClassNameType } from '@/types/util';
import { tw } from '@/utils/tailwind.util';

type TextAreaLabelProps = {
  label?: string;
  required?: boolean;
  labelClassName?: ClassNameType;
};

export const TextAreaLabel = ({ label, required, labelClassName }: TextAreaLabelProps) => {
  const requiredPseudoCss =
    required &&
    'after:content-[" "] after:inline-block after:w-[4px] after:h-[4px] after:rounded-full after:bg-[#FF5555] after:absolute after:top-0 after:right-[-10px] ';

  return (
    <label
      className={tw(
        'font-b2 relative mb-8pxr w-fit text-grey-500',
        labelClassName,
        requiredPseudoCss,
      )}
      htmlFor={`text-area-${name}`}
    >
      {label}
    </label>
  );
};
