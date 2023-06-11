'use client';

import { useEffect, useState } from 'react';
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
      const file = imageFileList[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [imageFileList]);

  return imagePreview ? (
    <div className="relative">
      <img
        src={imagePreview}
        className="mx-auto my-0 max-h-[192px] max-w-[308px] object-contain"
        alt="image preview"
      />
      <div className="absolute right-[12px] top-[12px] flex h-[16px] w-[16px]  items-center justify-center rounded-full bg-grey-800">
        <CancelIcon size={8} className="block fill-white" />
      </div>
    </div>
  ) : null;
};
