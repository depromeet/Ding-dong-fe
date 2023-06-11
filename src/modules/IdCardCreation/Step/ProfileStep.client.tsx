'use client';
import { ChangeEvent, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { faker } from '@faker-js/faker/locale/ko';
import { ProfileImageEdit } from '@/components/ProfileImageEdit';

const fieldTitleStyle = 'text-b2  text-grey-500';
const fieldStyle =
  'border-[0.5px] border-solid mt-2pxr rounded-[6px] border-grey-100 bg-grey-50 w-full text-b1 focus:border-primary-500';
const title = '이웃 주민에게\n 자신을 소개해주세요!';
const TEXT_MAX_LENGTH = 50;

export const ProfileStep = () => {
  const { register } = useFormContext();
  const [textCount, setTextCount] = useState(0);
  const onTextareaHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value = e.target.value.slice(0, TEXT_MAX_LENGTH);
    setTextCount(e.target.value.length);
  }, []);
  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      {/*TODO: API 붙이면 faker 없앨 예정*/}
      <ProfileImageEdit
        className="mt-20px mx-auto"
        defaultProfileImage={faker.image.avatar()}
        {...register('profile')}
      />
      <div className={`${fieldTitleStyle}`}>이름</div>
      <input {...register('nickname', { required: true })} className={`${fieldStyle} p-12pxr`} />
      <div className={`${fieldTitleStyle} mt-16pxr`}>소개</div>
      <textarea
        {...register('aboutMe', { maxLength: TEXT_MAX_LENGTH })}
        onChange={onTextareaHandler}
        className={`${fieldStyle} p-12pxr`}
      />
      <div className="text-right text-detail text-grey-500">{textCount}/50</div>
    </div>
  );
};
