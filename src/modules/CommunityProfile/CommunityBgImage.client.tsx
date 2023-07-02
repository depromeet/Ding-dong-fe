'use client';

import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

import { Button } from '~/components/Button';

type CommunityBgImageProps = {
  coverImageUrl?: string;
  isEditable?: boolean;
  communityId?: number;
};
export const CommunityBgImage = ({ coverImageUrl, isEditable }: CommunityBgImageProps) => {
  const [profileImage, setProfileImage] = useState<string | undefined>(coverImageUrl);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;
    if (imageFileList && imageFileList.length > 0) {
      //TODO: S3 로직 추가 예정
      const fakerImage = faker.image.avatar();
      setProfileImage(fakerImage);
    }
  };
  return (
    <div className="relative h-[174px] w-full">
      {isEditable && (
        <Button
          size="small"
          color="secondary"
          className="absolute bottom-20pxr right-20pxr z-10 w-fit px-12pxr py-8pxr"
        >
          <label htmlFor="file">커버 변경</label>
        </Button>
      )}
      {profileImage && (
        <Image alt="planet cover image" src={profileImage} fill={true} className="object-cover" />
      )}
      <input
        className="hidden"
        onChange={onChange}
        type="file"
        accept="image/*"
        name="file"
        id="file"
      />
    </div>
  );
};
