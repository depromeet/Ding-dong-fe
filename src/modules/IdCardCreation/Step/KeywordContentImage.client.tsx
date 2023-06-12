'use client';

import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { CancelIcon } from '~/components/Icon';
import { IdCardCreationFormModel } from '~/types/idCard';
type KeywordContentImageProps = {
  index: number;
};

export const KeywordContentImage = ({ index }: KeywordContentImageProps) => {
  const { watch, setValue } = useFormContext<IdCardCreationFormModel>();
  const { keywords } = watch();
  const imageUrl = keywords[index].imageUrl;

  const onCancelClick = useCallback(() => {
    //TODO: S3 로직 추가 예정
    setValue(`keywords.${index}.imageUrl`, '');
  }, [setValue]);

  return imageUrl ? (
    <div className="relative mx-auto my-0 w-fit">
      <img
        src={imageUrl}
        className="max-h-[192px] max-w-[308px] object-contain"
        alt="image preview"
      />
      <div className="absolute right-[12px] top-[12px] flex h-[16px] w-[16px]  items-center justify-center rounded-full bg-grey-800">
        <CancelIcon
          size={8}
          viewBox="0 0 16 16"
          className="block fill-white"
          onClick={onCancelClick}
        />
      </div>
    </div>
  ) : null;
};
