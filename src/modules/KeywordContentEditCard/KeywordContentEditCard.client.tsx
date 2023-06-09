'use client';

import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { usePostImageUrl } from '~/api/domain/image.api';
import { ConfirmDeleteKeyword, useConfirmPopup } from '~/components/ConfirmPopup';
import { CancelCircleIcon } from '~/components/Icon';
import { useAutoHeightTextArea } from '~/components/TextArea/useAutoHeightTextArea';
import { KeywordContentImage } from '~/modules/IdCardCreation/Step/KeywordContentImage.client';
import { KeywordContentCard } from '~/modules/IdCardDetail';
import { FormKeywordModel } from '~/types/idCard';
import { tw } from '~/utils/tailwind.util';

type KeywordContentEditCardProps = {
  className?: string;
  keyword: FormKeywordModel;
  index: number;
};

export const KeywordContentEditCard = ({
  className,
  keyword,
  index,
}: KeywordContentEditCardProps) => {
  const { register, setValue, getValues } = useFormContext();
  const { keywords } = getValues();
  const [textFocus, setTextFocus] = useState<boolean>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { mutateAsync } = usePostImageUrl();
  const {
    isOpen: isConfirmDeleteOpen,
    openPopup: openConfirmDeletePopup,
    closePopup: closeConfirmDeletePopup,
    confirm: confirmDelete,
  } = useConfirmPopup();

  const { ref, ...registerReturnWithoutRef } = register(`keywords.${index}.content`);

  const isImageExisted = keywords[index].imageUrl;

  const imageButtonText = isImageExisted ? '이미지 수정' : '이미지 추가';

  const onCardClick = () => {
    if (textareaRef.current) textareaRef.current.focus();
  };

  const deleteKeyword = (title: string, keywords: FormKeywordModel[]) => {
    const filteredKeywordList = keywords.filter(keyword => title !== keyword.title);
    setValue('keywords', filteredKeywordList);
  };

  const onDeleteKeywordContent = async () => {
    const isOk = await openConfirmDeletePopup();
    closeConfirmDeletePopup();
    if (isOk) {
      deleteKeyword(keyword.title, keywords);
    }
  };

  const onTextFocus = () => {
    setTextFocus(true);
  };
  const onTextBlur = () => {
    setTextFocus(false);
  };

  const onImageChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const imageFileList = e.target.files;
      if (imageFileList && imageFileList.length > 0) {
        const data = await mutateAsync(imageFileList[0]);
        if (data) {
          setValue(`keywords.${index}.imageUrl`, data.imageUrl);
        }
      }
    },
    [index, mutateAsync, setValue],
  );

  useAutoHeightTextArea({
    isAutoSize: true,
    value: keywords[index].content,
    ref: textareaRef,
  });

  return (
    <div className={tw(className)}>
      <div className="relative">
        <KeywordContentCard
          className={`${textFocus ? 'border-[1px] border-solid border-primary-500' : ''}`}
          onClick={onCardClick}
          title={keyword.title}
          image={<KeywordContentImage index={index} />}
          content={
            <textarea
              {...registerReturnWithoutRef}
              ref={e => {
                ref(e);
                textareaRef.current = e;
              }}
              onFocus={onTextFocus}
              onBlur={onTextBlur}
              className="w-full resize-none bg-grey-100"
            />
          }
        />
        <button
          className="rounded-ful absolute right-[12px] top-[12px] flex items-center justify-center"
          onClick={onDeleteKeywordContent}
          type="button"
        >
          <CancelCircleIcon className="fill-grey-500" />
        </button>
      </div>
      <div className="mt-[10px] flex justify-end">
        <label
          htmlFor={`keywords.${index}.imageUrl`}
          className="text-primary font rounded-[12px] border-[0.5px] border-solid border-grey-100 bg-grey-50 px-[6px] pb-[6px] pt-[6px] text-detail text-primary-500"
        >
          {imageButtonText}
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
      {isConfirmDeleteOpen && <ConfirmDeleteKeyword confirm={confirmDelete} />}
    </div>
  );
};
