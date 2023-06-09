'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CancelIcon } from '@/components/Icon';
import { IdCardCreationForm } from '@/modules/IdCardCreation/IdCardCreation.type';

type ImagePreviewProps = {
  index: number;
};

export const ImagePreview = ({ index }: ImagePreviewProps) => {
  const { watch } = useFormContext<IdCardCreationForm>();
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
        <CancelIcon className="block h-[8px] w-[8px] fill-white" />
      </div>
    </div>
  ) : null;
};
