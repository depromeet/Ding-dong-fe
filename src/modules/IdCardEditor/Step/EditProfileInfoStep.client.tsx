import { useFormContext } from 'react-hook-form';

import { ProfileImageEdit } from '~/components/ProfileImageEdit';
import { TextArea, useTextArea } from '~/components/TextArea';
import { TextInput, useTextInput } from '~/components/TextInput';
import {
  MAX_ABOUT_ME_LENGTH,
  MAX_NICKNAME_LENGTH,
} from '~/modules/IdCardEditor/IdCardEditor.constant';
import { IdCardEditorFormValues } from '~/modules/IdCardEditor/IdCardEditor.type';

export const EditProfileInfoStep = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<IdCardEditorFormValues>();
  const { nickname: initNickname, profileImageUrl, aboutMe: initAboutMe } = getValues();

  const { onChange: onChangeNicknameRhf, ...nicknameRegister } = register('nickname');
  const { onChange: onChangeAboutMeRhf, ...aboutMeRegister } = register('aboutMe');

  // TODO: TextInput, TextArea 안쪽으로 리팩토링해야 할듯
  const { value: nickname, onChangeHandler: onChangeNickName } = useTextInput({
    initValue: initNickname,
    onChange: onChangeNicknameRhf,
    maxLength: MAX_NICKNAME_LENGTH,
  });
  const { value: aboutMe, onChangeHandler: onChangeAboutMe } = useTextArea({
    initValue: initAboutMe,
    onChange: onChangeAboutMeRhf,
    maxLength: MAX_ABOUT_ME_LENGTH,
  });

  return (
    <div className="px-layout-sm">
      <div className="flex justify-center">
        <ProfileImageEdit<IdCardEditorFormValues>
          className="mx-auto mt-20pxr"
          fieldName="profileImageUrl"
          defaultProfileImage={profileImageUrl}
          setValue={setValue}
        />
      </div>
      <TextInput className="mt-36pxr">
        <TextInput.Label name="nickname" required>
          이름
        </TextInput.Label>
        <TextInput.Border
          textCount={nickname.length}
          maxLength={MAX_NICKNAME_LENGTH}
          errorMessage={errors?.nickname?.message}
        >
          <TextInput.Content {...nicknameRegister} onChange={onChangeNickName} />
        </TextInput.Border>
      </TextInput>
      <TextArea>
        <TextArea.Label name="aboutMe">소개</TextArea.Label>
        <TextArea.Border textCount={aboutMe.length} maxLength={MAX_ABOUT_ME_LENGTH}>
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
