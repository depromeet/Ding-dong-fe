'use client';

import { useForm } from 'react-hook-form';

import { Divider } from '~/components/Divider';
import { SendIcon } from '~/components/Icon';
import { TextInput, useTextInput } from '~/components/TextInput';
import { UserProfile } from '~/modules/CommentList/CommentCommon';

export const CommentInput = () => {
  //TODO: 주민증 없는 경우 댓글 작성 못한다고 input placeholder 수정
  //TODO: 유저 정보 조회 api 요청하기
  const onSubmit = () => console.log('제출');

  const { register, handleSubmit } = useForm();
  const { onChangeHandler } = useTextInput({
    onChange: register('title').onChange,
  });

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white">
      <Divider className="bg-grey-200" />
      <form className="flex items-center px-[20px] py-[8px]" onSubmit={handleSubmit(onSubmit)}>
        <UserProfile profileImageUrl="" />
        <TextInput>
          <TextInput.Border className="rounded-[15px] px-[16px] py-[8px]">
            <div className="flex w-full flex-row">
              <TextInput.Content
                className="w-full bg-grey-50"
                {...register('comment')}
                onChange={onChangeHandler}
              />
              <SendIcon className="fill-none stroke-primary-500" />
            </div>
          </TextInput.Border>
        </TextInput>
      </form>
    </div>
  );
};
