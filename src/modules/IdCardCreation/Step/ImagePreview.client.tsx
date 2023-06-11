'use client';

import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CancelIcon } from '@/components/Icon';
import { IdCardCreationFormModel } from '@/types/idCard';
type ImagePreviewProps = {
  index: number;
};

export const ImagePreview = ({ index }: ImagePreviewProps) => {
  const { watch } = useFormContext<IdCardCreationFormModel>();
  const [imagePreview, setImagePreview] = useState('');
  const { keywords } = watch();
  const imageFileList = keywords[index].imageUrl;

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      if (imagePreview) URL.revokeObjectURL(imagePreview);

      const file = imageFileList[0]; // fileblob
      setImagePreview(URL.createObjectURL(file));
    }
  }, [imageFileList]);

  const onCancelClick = useCallback(() => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview('');
  }, []);

  return imagePreview ? (
    <div className="relative mx-auto my-0 w-fit">
      <img
        src={imagePreview}
        className="max-h-[192px] max-w-[308px] object-contain"
        alt="image preview"
      />
      <div className="absolute right-[12px] top-[12px] flex h-[16px] w-[16px]  items-center justify-center rounded-full bg-grey-800">
        <CancelIcon
          size={8}
          viewBox={'0 0 16 16'}
          className="block fill-white"
          onClick={onCancelClick}
        />
      </div>
    </div>
  ) : null;
};
