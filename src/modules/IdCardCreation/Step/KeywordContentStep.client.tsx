'use client';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Data } from '@/modules/IdCardCreation/IdCardSteps';

const title = '이웃 주민에게 자신을 소개할\n 키워드를 적어주세요!';

export const KeywordContentStep = () => {
  const { control, register } = useFormContext<Data>();
  const { fields } = useFieldArray({ name: 'keywords', control });

  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <div className="bg-red-100">{field.title}</div>
            <textarea {...register(`keywords.${index}.content`)} />
            <input {...register(`keywords.${index}.imageUrl`)} type="file" accept="image/*" />
          </div>
        );
      })}
    </div>
  );
};
