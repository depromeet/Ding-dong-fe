import { KeywordContentCard } from '@/modules/IdCardDetail';
import { ImagePreview } from '@/modules/IdCardCreation/Step/ImagePreview.client';
import { useFormContext } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { KeywordField } from '@/modules/IdCardCreation/IdCardCreation.type';
import { tw } from '@/utils/tailwind.util';

type KeywordContentEditCardProps = {
  className?: string;
  keyword: KeywordField;
  index: number;
};

export const KeywordContentEditCard = ({
  className,
  keyword,
  index,
}: KeywordContentEditCardProps) => {
  const { register } = useFormContext();
  const [textFocus, setTextFocus] = useState<boolean>();

  const onTextFocus = useCallback(() => {
    setTextFocus(true);
  }, []);
  const onTextBlur = useCallback(() => {
    setTextFocus(false);
  }, []);

  return (
    <div className={tw(className)}>
      <KeywordContentCard
        className={`${textFocus ? 'border-[1px] border-solid border-primary-500' : ''}`}
        title={keyword.title}
        image={<ImagePreview index={index} />}
        content={
          <textarea
            {...register(`keywords.${index}.content`)}
            onFocus={onTextFocus}
            onBlur={onTextBlur}
            className="w-full bg-grey-100"
          />
        }
      />
      <div className="mt-[10px] flex justify-end">
        <label
          htmlFor={`keywords.${index}.imageUrl`}
          className="text-primary font rounded-[12px] border-[0.5px] border-solid border-grey-100 bg-grey-50 px-[6px] pb-[6px] pt-[6px] text-detail text-primary-500"
        >
          이미지 변경
        </label>
        <input
          id={`keywords.${index}.imageUrl`}
          {...register(`keywords.${index}.imageUrl`)}
          type="file"
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};
