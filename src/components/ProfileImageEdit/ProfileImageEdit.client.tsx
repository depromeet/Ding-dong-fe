'use client';

import Image from 'next/image';
import { CameraIcon } from '@/components/Icon/CameraIcon';
import { forwardRef, InputHTMLAttributes, memo, useState } from 'react';
import { tw } from '@/utils/tailwind.util';
import { faker } from '@faker-js/faker/locale/ko';

type ProfileImageEditProps = InputHTMLAttributes<HTMLInputElement> & {
  defaultProfileImage: string;
  fieldName: string;
  setValue: (name: string, value: unknown, config?: Object) => void;
  className?: string;
};

const ProfileImageEditComponent = forwardRef<HTMLInputElement, ProfileImageEditProps>(
  ({ defaultProfileImage, className, fieldName, setValue, ...rest }, ref) => {
    const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);

    const onChange = e => {
      const imageFileList = e.target.files;
      if (imageFileList && imageFileList.length > 0) {
        //TODO: S3 로직 추가 예정
        const fakerImage = faker.image.avatar();
        setProfileImage(fakerImage);
        setValue(fieldName, fakerImage);
      }
    };

    return (
      <div className={tw('relative w-fit', className)}>
        <Image
          src={profileImage}
          width={84}
          height={84}
          className="max-h-[88px] min-h-[88px] min-w-[88px] max-w-[88px] rounded-full border-[1px] border-solid border-grey-100 object-cover"
          alt="profile image"
        />
        <label
          htmlFor={fieldName}
          className="absolute bottom-[0px] right-[0px] block flex h-[26px] w-[26px]  items-center justify-center rounded-full bg-grey-100"
        >
          <CameraIcon className="block" />
        </label>
        <input
          id={fieldName}
          className="hidden"
          ref={ref}
          {...rest}
          onChange={onChange}
          type="file"
          accept="image/*"
        />
      </div>
    );
  },
);

export const ProfileImageEdit = memo(ProfileImageEditComponent);
