'use client';

import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { CancelCircleIcon } from '~/components/Icon';
import { IdCardCreationFormModel } from '~/types/idCard';
type KeywordContentImageProps = {
  index: number;
};

export const KeywordContentImage = ({ index }: KeywordContentImageProps) => {
  const { watch, setValue } = useFormContext<IdCardCreationFormModel>();
  const { keywords } = watch();
  const imageUrl = keywords[index].imageUrl;

  const onCancelClick = useCallback(() => {
    setValue(`keywords.${index}.imageUrl`, '');
  }, [index, setValue]);

  return imageUrl ? (
    <div className="relative mx-auto my-0 w-fit">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} className="w-full rounded-xl object-contain" alt="image preview" />
      <div className="absolute right-[12px] top-[12px] flex h-[16px] w-[16px]  items-center justify-center rounded-full bg-grey-800">
        <CancelCircleIcon className="fill-grey-800" onClick={onCancelClick} />
      </div>
    </div>
  ) : null;
};
