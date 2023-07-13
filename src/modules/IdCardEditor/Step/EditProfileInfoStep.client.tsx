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
  const { register, getValues, setValue } = useFormContext<IdCardEditorFormValues>();
  const { nickname, aboutMe, profileImageUrl } = getValues();

  // TODO: TextInput, TextArea 안쪽으로 리팩토링해야 할듯
  const { textCount: nicknameCount, onChangeHandler: onChangeNickName } = useTextInput({
    initCount: nickname.length,
    onChange: register('nickname').onChange,
    maxLength: MAX_NICKNAME_LENGTH,
  });
  const { textCount: aboutMeCount, onChangeHandler: onChangeAboutMe } = useTextArea({
    initCount: aboutMe.length,
    onChange: register('aboutMe').onChange,
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
        <TextInput.Border textCount={nicknameCount} maxLength={MAX_NICKNAME_LENGTH}>
          <TextInput.Content
            {...register('nickname', { required: true })}
            onChange={onChangeNickName}
          />
        </TextInput.Border>
      </TextInput>
      <TextArea>
        <TextArea.Label name="aboutMe" required>
          소개
        </TextArea.Label>
        <TextArea.Border textCount={aboutMeCount} maxLength={MAX_ABOUT_ME_LENGTH}>
          <TextArea.Content
            {...register('aboutMe', { required: true })}
            onChange={onChangeAboutMe}
            isAutoSize
          />
        </TextArea.Border>
      </TextArea>
    </div>
  );
};
