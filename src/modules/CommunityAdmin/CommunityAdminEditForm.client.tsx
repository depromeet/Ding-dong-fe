import { faker } from '@faker-js/faker';
import { useFormContext } from 'react-hook-form';

import Button from '~/components/Button/Button';
import { ProfileImageEdit } from '~/components/ProfileImageEdit';
import { TextArea, useTextArea } from '~/components/TextArea';
import { TextInput, useTextInput } from '~/components/TextInput';

const TEXT_MAX_LENGTH = 16;
const TEXT_AREA_MAX_LENGTH = 50;

export const CommunityAdminEditForm = () => {
  const onSubmit = () => console.log('제출');

  const { register, setValue, handleSubmit } = useFormContext();
  const { textCount, onChangeHandler } = useTextInput({
    onChange: register('title').onChange,
    maxLength: TEXT_MAX_LENGTH,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { textCount: textareaCount, onChangeHandler: onTextareaChangeHandler } = useTextArea({
    onChange: register('description').onChange,
    maxLength: TEXT_AREA_MAX_LENGTH,
  });
  return (
    <form id="community-admin-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <ProfileImageEdit
        className="mx-auto mt-20pxr"
        fieldName="profileImageUrl"
        defaultProfileImage={faker.image.avatar()}
        setValue={setValue}
      />
      <TextInput>
        <TextInput.Label name="title" required>
          이름
        </TextInput.Label>
        <TextInput.Border
          textCount={textCount}
          maxLength={TEXT_MAX_LENGTH}
          direction="row"
          className="py-8pxr"
        >
          <TextInput.Content
            {...register('title', { required: true })}
            onChange={onChangeHandler}
          />
          <Button size="small" color="secondary" className="w-fit shrink-0 px-12pxr py-8pxr">
            중복확인
          </Button>
        </TextInput.Border>
      </TextInput>
      <TextArea>
        <TextArea.Label name="description">소개</TextArea.Label>
        <TextArea.Border textCount={textareaCount} maxLength={TEXT_AREA_MAX_LENGTH}>
          <TextArea.Content {...register('description')} onChange={onTextareaChangeHandler} />
        </TextArea.Border>
      </TextArea>
    </form>
  );
};
