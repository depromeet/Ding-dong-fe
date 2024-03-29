'use client';

import { useFormContext } from 'react-hook-form';

import { useGetUserInfo } from '~/api/domain/user.api';
import { ProfileImageEdit } from '~/components/ProfileImageEdit';
import { TextArea, useTextArea } from '~/components/TextArea';
import { TextInput, useTextInput } from '~/components/TextInput';
import { IdCardCreationFormModel } from '~/types/idCard';

const title = '이웃 주민에게\n 자신을 소개해주세요!';
const TEXT_MAX_LENGTH = 16;
const TEXT_AREA_MAX_LENGTH = 50;

export const ProfileStep = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<IdCardCreationFormModel>();
  const { data: userInfo } = useGetUserInfo();

  const { profileImageUrl } = getValues();

  const { onChange: onChangeNicknameRhf, ...nicknameRegister } = register('nickname');
  const { onChange: onChangeAboutMeRhf, ...aboutMeRegister } = register('aboutMe');

  const { value: nickname, onChangeHandler: onChangeNickName } = useTextInput({
    onChange: onChangeNicknameRhf,
    maxLength: TEXT_MAX_LENGTH,
  });

  const { value: aboutMe, onChangeHandler: onChangeAboutMe } = useTextArea({
    onChange: onChangeAboutMeRhf,
    maxLength: TEXT_AREA_MAX_LENGTH,
  });

  const getDefaultProfileImage = () => {
    if (userInfo?.userProfileDto.characterType === 'BUDDY') {
      return '/assets/images/default-profile-image-buddy.png';
    }
    if (userInfo?.userProfileDto.characterType === 'PIPI') {
      return '/assets/images/default-profile-image-pipi.png';
    }
    if (userInfo?.userProfileDto.characterType === 'TRUE') {
      return '/assets/images/default-profile-image-true.png';
    }
    if (userInfo?.userProfileDto.characterType === 'TOBBY') {
      return '/assets/images/default-profile-image-tobby.png';
    }
  };

  return (
    <div className="px-layout-sm">
      <h1 className="text-h1">{title}</h1>
      <ProfileImageEdit<IdCardCreationFormModel>
        className="mx-auto mt-20pxr"
        fieldName="profileImageUrl"
        defaultProfileImage={profileImageUrl ?? getDefaultProfileImage()}
        setValue={setValue}
      />
      <TextInput>
        <TextInput.Label name="nickname" required>
          이름
        </TextInput.Label>
        <TextInput.Border
          textCount={nickname.length}
          maxLength={TEXT_MAX_LENGTH}
          errorMessage={errors?.nickname?.message}
        >
          <TextInput.Content {...nicknameRegister} onChange={onChangeNickName} />
        </TextInput.Border>
      </TextInput>
      <TextArea className="mt-28pxr">
        <TextArea.Label name="aboutMe">소개</TextArea.Label>
        <TextArea.Border textCount={aboutMe.length} maxLength={TEXT_AREA_MAX_LENGTH}>
          <TextArea.Content
            {...aboutMeRegister}
            onChange={onChangeAboutMe}
            isAutoSize
            value={aboutMe}
          />
        </TextArea.Border>
      </TextArea>
    </div>
  );
};
