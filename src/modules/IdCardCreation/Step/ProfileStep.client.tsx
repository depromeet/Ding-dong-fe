'use client';
import { ChangeEvent, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { TextInput, useTextInput } from '@/components/TextInput';

const fieldTitleStyle = 'text-b2  text-grey-500';
const fieldStyle =
  'border-[0.5px] border-solid mt-2pxr rounded-[6px] border-grey-100 bg-grey-50 w-full text-b1 focus:border-primary-500';
const title = '이웃 주민에게\n 자신을 소개해주세요!';
const TEXT_MAX_LENGTH = 16;
const TEXT_AREA_MAX_LENGTH = 50;

export const ProfileStep = () => {
  const { register } = useFormContext();
  const { textCount, onChangeHandler } = useTextInput({
    onChange: register('nickname').onChange,
    maxLength: TEXT_MAX_LENGTH,
  });
  const [textAreaCount, setTextAreaCount] = useState(0);
  const onTextareaHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value = e.target.value.slice(0, TEXT_AREA_MAX_LENGTH);
    setTextAreaCount(e.target.value.length);
  }, []);

  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      <div className="mx-auto mt-20pxr h-[88px] w-[92px] rounded-full bg-amber-500" />
      <TextInput>
        <TextInput.Label name="nickname" required>
          이름
        </TextInput.Label>
        <TextInput.Border textCount={textCount} maxLength={TEXT_MAX_LENGTH}>
          <TextInput.Content
            {...(register('nickname'), { required: true })}
            onChange={onChangeHandler}
          />
        </TextInput.Border>
      </TextInput>
      <div className={`${fieldTitleStyle} mt-16pxr`}>소개</div>
      <textarea
        {...register('aboutMe', { maxLength: TEXT_AREA_MAX_LENGTH })}
        onChange={onTextareaHandler}
        className={`${fieldStyle} p-12pxr`}
      />
      <div className="text-right text-detail text-grey-500">{textAreaCount}/50</div>
    </div>
  );
};
