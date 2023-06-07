'use client';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const title = '이웃 주민에게 자신을 소개할\n 키워드를 적어주세요!';

export const KeywordStep = () => {
  const { control, register } = useFormContext();
  const { fields, append } = useFieldArray({ name: 'keywords', control });

  useEffect(() => {
    append([{ title: '똘똘이', imageUrl: '', content: '' }]);
    append([{ title: '밤샘작업', imageUrl: '', content: '' }]);
  }, []);

  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      {fields.map((field, index) => {
        return <input key={field.id} {...register(`keywords.${index}.title`)} />;
      })}
    </div>
  );
};
