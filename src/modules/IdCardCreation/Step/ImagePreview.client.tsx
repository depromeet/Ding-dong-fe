'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

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

  return imagePreview ? <img src={imagePreview} alt="image preview" /> : null;
};
