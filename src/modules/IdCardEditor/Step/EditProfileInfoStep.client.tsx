import { useFormContext } from 'react-hook-form';

import { TextArea, useTextArea } from '~/components/TextArea';
import { TextInput, useTextInput } from '~/components/TextInput';
import { IdCardEditorFormModel } from '~/types/idCard';

const MAX_NICKNAME_LENGTH = 16;
const MAX_ABOUT_ME_LENGTH = 50;

export const EditProfileInfoStep = () => {
  const { register, getValues } = useFormContext<IdCardEditorFormModel>();
  const { nickname, aboutMe } = getValues();

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
    <div>
      <TextInput>
        <TextInput.Label name="nickname" required>
          라벨
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
          라벨
        </TextArea.Label>
        <TextArea.Border textCount={aboutMeCount} maxLength={MAX_ABOUT_ME_LENGTH}>
          <TextArea.Content
            {...register('aboutMe', { required: true })}
            onChange={onChangeAboutMe}
          />
        </TextArea.Border>
      </TextArea>
    </div>
  );
};
