'use client';

import Image from 'next/image';
import { CameraIcon } from '@/components/Icon/CameraIcon';
import { forwardRef, InputHTMLAttributes, memo, useCallback, useState } from 'react';
import { tw } from '@/utils/tailwind.util';

type ProfileImageEditProps = InputHTMLAttributes<HTMLInputElement> & {
  defaultProfileImage: string;
  className?: string;
};

const ProfileImageEditComponent = forwardRef<HTMLInputElement, ProfileImageEditProps>(
  ({ defaultProfileImage, className, ...rest }, ref) => {
    const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);

    const onChange = useCallback(
      e => {
        const imageFileList = e.target.files;
        if (imageFileList && imageFileList.length > 0) {
          if (profileImage) URL.revokeObjectURL(profileImage);

          const file = imageFileList[0];
          setProfileImage(URL.createObjectURL(file));
        }
      },
      [profileImage, setProfileImage],
    );

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
          htmlFor="profile-image-edit"
          className="absolute bottom-[0px] right-[0px] block flex h-[26px] w-[26px]  items-center justify-center rounded-full bg-grey-100"
        >
          <CameraIcon className="block" />
        </label>
        <input
          id="profile-image-edit"
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
