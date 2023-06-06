'use client';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const fieldTitleStyle = 'text-b2  text-grey-500';
const fieldStyle =
  'border-0.5 mt-2px rounded-[6px] border-solid border-grey-100 bg-grey-50 w-full text-b1';
const title = '이웃 주민에게\n 자신을 소개해주세요!';

export const ProfileStep = () => {
  const { register } = useFormContext();
  const [textCount, setTextCount] = useState(0);
  const onTextareaHandler = useCallback(e => {
    setTextCount(e.target.value.length);
  }, []);
  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      <div className="mx-auto mt-20px h-[88px] w-[92px] rounded-full bg-amber-500" />
      <div className={`${fieldTitleStyle}`}>이름</div>
      <input {...register('nickname')} className={`${fieldStyle} px-14px py-12px`} />
      <div className={`${fieldTitleStyle} mt-16px`}>소개</div>
      <textarea
        {...register('aboutMe')}
        onChange={onTextareaHandler}
        className={`${fieldStyle} p-14px`}
        maxLength={50}
      />
      <div className="text-right text-detail text-grey-500">{textCount}/50</div>
    </div>
  );
};
