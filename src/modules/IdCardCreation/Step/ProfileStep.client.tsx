'use client';
import { faker } from '@faker-js/faker/locale/ko';
import { useFormContext } from 'react-hook-form';

import { ProfileImageEdit } from '~/components/ProfileImageEdit';
import { TextArea, useTextArea } from '~/components/TextArea';
import { TextInput, useTextInput } from '~/components/TextInput';

import { IdCardCreationFormType } from '../IdCardCreation.type';

const title = '이웃 주민에게\n 자신을 소개해주세요!';
const TEXT_MAX_LENGTH = 16;
const TEXT_AREA_MAX_LENGTH = 50;

export const ProfileStep = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<IdCardCreationFormType>();
  const { textCount, onChangeHandler } = useTextInput({
    onChange: register('nickname').onChange,
    maxLength: TEXT_MAX_LENGTH,
  });

  const { textCount: textareaCount, onChangeHandler: onTextareaChangeHandler } = useTextArea({
    onChange: register('aboutMe').onChange,
    maxLength: TEXT_AREA_MAX_LENGTH,
  });

  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      {/*TODO: 캐릭터 디자인 나오면 faker 삭제 예정*/}
      <ProfileImageEdit
        className="mx-auto mt-20pxr"
        fieldName="profileImageUrl"
        defaultProfileImage={faker.image.avatar()}
        setValue={setValue}
      />
      <TextInput>
        <TextInput.Label name="nickname" required>
          이름
        </TextInput.Label>
        <TextInput.Border
          textCount={textCount}
          maxLength={TEXT_MAX_LENGTH}
          errorMessage={errors?.nickname?.message}
        >
          <TextInput.Content
            {...register('nickname', { required: '이름을 입력해 주세요.' })}
            onChange={onChangeHandler}
          />
        </TextInput.Border>
      </TextInput>
      <TextArea className="mt-28pxr">
        <TextArea.Label name="aboutMe">소개</TextArea.Label>
        <TextArea.Border textCount={textareaCount} maxLength={TEXT_AREA_MAX_LENGTH}>
          <TextArea.Content {...register('aboutMe')} onChange={onTextareaChangeHandler} />
        </TextArea.Border>
      </TextArea>
    </div>
  );
};
