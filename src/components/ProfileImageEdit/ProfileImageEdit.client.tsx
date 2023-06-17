'use client';

import { faker } from '@faker-js/faker/locale/ko';
import Image from 'next/image';
import { ChangeEvent, ForwardedRef, forwardRef, InputHTMLAttributes, memo, useState } from 'react';
import { FieldPath, FieldValues, UseFormSetValue } from 'react-hook-form';

import { CameraIcon } from '~/components/Icon/CameraIcon';
import { tw } from '~/utils/tailwind.util';

type ProfileImageEditProps<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  defaultProfileImage: string;
  fieldName: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  className?: string;
};

// eslint-disable-next-line react/function-component-definition
function ProfileImageEditComponent<T extends FieldValues>(
  { defaultProfileImage, className, fieldName, setValue, ...rest }: ProfileImageEditProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;
    if (imageFileList && imageFileList.length > 0) {
      //TODO: S3 로직 추가 예정
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fakerImage = faker.image.avatar() as any;
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
}
ProfileImageEditComponent.displayName = 'ProfileImageEdit';
export const ProfileImageEdit = memo(forwardRef(ProfileImageEditComponent)) as <
  T extends FieldValues,
>(
  props: ProfileImageEditProps<T> & { ref?: React.ForwardedRef<HTMLUListElement> },
) => ReturnType<typeof ProfileImageEditComponent>;
