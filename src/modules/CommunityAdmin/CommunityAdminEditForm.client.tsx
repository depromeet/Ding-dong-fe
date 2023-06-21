import { faker } from '@faker-js/faker';
import { useFormContext } from 'react-hook-form';

import { Button } from '~/components/Button';
import { ProfileImageEdit } from '~/components/ProfileImageEdit';
import { TextArea, useTextArea } from '~/components/TextArea';
import { TextInput, useTextInput } from '~/components/TextInput';

import { DuplicateState } from './CommunityAdminEdit.client';

const TEXT_MAX_LENGTH = 16;
const TEXT_AREA_MAX_LENGTH = 50;

type CommunityAdminEditFormProps = {
  isDuplicatedCheck: DuplicateState;
  setIsDuplicatedCheck: (isChecked: DuplicateState) => void;
};
export const CommunityAdminEditForm = ({
  isDuplicatedCheck,
  setIsDuplicatedCheck,
}: CommunityAdminEditFormProps) => {
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

  const onCheck = () => {
    //TODO: 중복확인 로직 추가
    setIsDuplicatedCheck('SUCCESS');
    // setIsDuplicatedCheck('ERROR');
  };
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
          errorMessage={isDuplicatedCheck === 'ERROR' ? '이미 사용중인 이름이에요.' : undefined}
        >
          <TextInput.Content
            {...register('title', { required: true })}
            onChange={onChangeHandler}
          />
          <Button
            onClick={onCheck}
            size="small"
            color="secondary"
            className="w-fit shrink-0 px-12pxr py-8pxr"
          >
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
