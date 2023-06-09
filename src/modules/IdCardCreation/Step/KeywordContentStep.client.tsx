'use client';
import { useFormContext } from 'react-hook-form';

import { ImagePreview } from '@/modules/IdCardCreation/Step/ImagePreview.client';
import { KeywordContentCard } from '@/modules/IdCardDetail';

const title = '나를 소개하는 키워드의\n 설명을 적어주세요!';

export const KeywordContentStep = () => {
  const { register, watch } = useFormContext();
  const { keywords } = watch();

  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      <div className="mt-[26px] flex flex-col gap-[22px]">
        {keywords.map((keyword, index) => {
          return (
            <div key={index}>
              <KeywordContentCard
                className="focus:border-primary-500"
                title={keyword.title}
                image={<ImagePreview index={index} />}
                content={
                  <textarea
                    {...register(`keywords.${index}.content`)}
                    className="w-full bg-grey-100"
                  />
                }
              />
              <div className="mt-[10px] flex justify-end">
                <label
                  htmlFor={`keywords.${index}.imageUrl`}
                  className="text-primary font rounded-[12px] border-[0.5px] border-solid border-grey-100 bg-grey-50 px-[6px] pb-[6px] pt-[6px] text-detail text-primary-500"
                >
                  이미지 변경
                </label>
                <input
                  id={`keywords.${index}.imageUrl`}
                  {...register(`keywords.${index}.imageUrl`)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
