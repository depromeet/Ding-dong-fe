'use client';

import { faker } from '@faker-js/faker/locale/ko';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { KeywordContentImage } from '~/modules/IdCardCreation/Step/KeywordContentImage.client';
import { KeywordContentCard } from '~/modules/IdCardDetail';
import { CreateKeywordModel } from '~/types/idCard';
import { tw } from '~/utils/tailwind.util';

type KeywordContentEditCardProps = {
  className?: string;
  keyword: CreateKeywordModel;
  index: number;
};

export const KeywordContentEditCard = ({
  className,
  keyword,
  index,
}: KeywordContentEditCardProps) => {
  const { register, setValue } = useFormContext();
  const [textFocus, setTextFocus] = useState<boolean>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onCardClick = useCallback(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const onTextFocus = useCallback(() => {
    setTextFocus(true);
  }, []);
  const onTextBlur = useCallback(() => {
    setTextFocus(false);
  }, []);

  const onImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const imageFileList = e.target.files;
      if (imageFileList && imageFileList.length > 0) {
        //TODO: S3 로직 추가 예정
        const fakerImage = faker.image.avatar();
        setValue(`keywords.${index}.imageUrl`, fakerImage);
      }
    },
    [index, setValue],
  );

  return (
    <div className={tw(className)}>
      <KeywordContentCard
        className={`${textFocus ? 'border-[1px] border-solid border-primary-500' : ''}`}
        onClick={onCardClick}
        title={keyword.title}
        image={<KeywordContentImage index={index} />}
        content={
          <textarea
            {...register(`keywords.${index}.content`)}
            onFocus={onTextFocus}
            onBlur={onTextBlur}
            ref={textareaRef}
            className="w-full resize-none bg-grey-100"
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
          onChange={onImageChange}
          type="file"
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};
