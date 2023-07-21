import { UseMutationResult } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { checkCommunityName } from '~/api/domain/community.api';
import { Button } from '~/components/Button';
import { ProfileImageEdit } from '~/components/ProfileImageEdit';
import { TextArea, useTextArea } from '~/components/TextArea';
import { TextInput, useTextInput } from '~/components/TextInput';
import { CommunityUpdateResponse, CreateCommunityRequest } from '~/types/community';

import { DuplicateState } from './CommunityAdmin.type';

const TEXT_MAX_LENGTH = 16;
const TEXT_AREA_MAX_LENGTH = 50;

type CommunityAdminEditFormProps = {
  isDuplicatedCheck: DuplicateState;
  setIsDuplicatedCheck: (isChecked: DuplicateState) => void;
  hasDescription?: boolean;
  mutation: UseMutationResult<CommunityUpdateResponse, unknown, CreateCommunityRequest, unknown>;
};
export const CommunityAdminEditForm = ({
  isDuplicatedCheck,
  setIsDuplicatedCheck,
  hasDescription,
  mutation,
}: CommunityAdminEditFormProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { defaultValues },
    getValues,
  } = useFormContext<CreateCommunityRequest>();

  const onSubmit = (data: CreateCommunityRequest) => {
    mutation.mutate({ ...defaultValues, ...data });
  };

  const defaultPlanetLogoImage =
    defaultValues?.logoImageUrl || '/assets/images/default_planet_logo.png';

  const { value: name, onChangeHandler } = useTextInput({
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      register('name').onChange(e);
      checkDuplicate(e.target.value);
    },
    maxLength: TEXT_MAX_LENGTH,
  });

  const { value: description, onChangeHandler: onTextareaChangeHandler } = useTextArea({
    onChange: register('description').onChange,
    maxLength: TEXT_AREA_MAX_LENGTH,
  });

  const onCheck = async () => {
    const check = await checkCommunityName(getValues('name'));
    setIsDuplicatedCheck(check.data ? 'ERROR' : 'SUCCESS');
  };

  const checkDuplicate = (value: string) => {
    if (value === defaultValues?.name && isDuplicatedCheck === 'SUCCESS') return;
    isDuplicatedCheck !== 'DEFAULT' && setIsDuplicatedCheck('DEFAULT');
  };

  return (
    <form id="community-admin-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <ProfileImageEdit
        className="mx-auto mb-6"
        fieldName="logoImageUrl"
        defaultProfileImage={defaultPlanetLogoImage}
        setValue={setValue}
      />
      <TextInput>
        <TextInput.Label name="title" required>
          행성 이름
        </TextInput.Label>
        <TextInput.Border
          textCount={name.length}
          maxLength={TEXT_MAX_LENGTH}
          direction="row"
          className="py-8pxr"
          errorMessage={isDuplicatedCheck === 'ERROR' ? '이미 사용중인 이름이에요' : undefined}
          infoMessage={isDuplicatedCheck === 'SUCCESS' ? '사용할 수 있는 이름이에요' : undefined}
          placeholder={
            isDuplicatedCheck === 'DEFAULT' ? '행성 이름은 언제든지 바꿀 수 있어요!' : undefined
          }
        >
          <TextInput.Content
            {...register('name', { required: true })}
            onChange={onChangeHandler}
            placeholder="행성 이름을 입력해주세요"
          />
          <Button
            type="button"
            onClick={onCheck}
            size="small"
            color="secondary"
            className="w-fit shrink-0 px-12pxr py-8pxr"
            disabled={isDuplicatedCheck === 'SUCCESS'}
          >
            중복확인
          </Button>
        </TextInput.Border>
      </TextInput>
      {hasDescription && (
        <TextArea>
          <TextArea.Label name="description" className="mt-24pxr">
            소개
          </TextArea.Label>
          <TextArea.Border textCount={description.length} maxLength={TEXT_AREA_MAX_LENGTH}>
            <TextArea.Content
              {...register('description')}
              onChange={onTextareaChangeHandler}
              value={description}
              isAutoSize
            />
          </TextArea.Border>
        </TextArea>
      )}
    </form>
  );
};
