import { useFormContext } from 'react-hook-form';

import { Chip } from '~/components/Chip';
// TODO: IdCardCreation의 하위 폴더가 아닌 modules의 하위폴더로 이동해야 합니다.
import { KeywordContentEditCard } from '~/modules/IdCardCreation/Card';
import { EditorSteps } from '~/modules/IdCardEditor/IdCardEditor.type';
import { FormKeywordModel, IdCardEditorFormModel } from '~/types/idCard';

type EditKeywordContentStepProps = {
  onClickMoveTargetStep: (targetStep: EditorSteps) => void;
};

export const EditKeywordContentStep = ({ onClickMoveTargetStep }: EditKeywordContentStepProps) => {
  const { setValue, getValues } = useFormContext<IdCardEditorFormModel>();
  const values = getValues();
  const { nickname, aboutMe, keywords } = values;

  const onClickDeleteChip = (title: string, keywords: FormKeywordModel[]) => {
    const filteredKeywordList = keywords.filter(keyword => title !== keyword.title);
    setValue('keywords', filteredKeywordList);
  };

  const onClickKeywordPlus = () => {
    onClickMoveTargetStep('KEYWORD');
  };

  return (
    <div>
      <div className="mb-24pxr flex flex-col gap-[9px] px-[21px] pb-[25px] pt-[8px]">
        <div className="flex gap-6pxr">
          <p className="text-h3">{nickname}</p>
          <button onClick={() => onClickMoveTargetStep('PROFILE')}>PROFILE EDIT</button>
        </div>
        <p className="text-b3 text-grey-600">{aboutMe}</p>
      </div>
      <ul className="mb-34pxr flex w-full flex-wrap items-center gap-x-4pxr gap-y-8pxr bg-grey-100 px-20pxr py-15pxr">
        {keywords.map(({ title }) => (
          <Chip
            key={title}
            text={title}
            isSelected={true}
            themeType="close"
            handleClickIcon={() => {
              onClickDeleteChip(title, keywords);
            }}
          />
        ))}
        <Chip text="키워드 추가" themeType="plus" onClick={onClickKeywordPlus} />
      </ul>
      <ul>
        {keywords.map((keyword, index) => (
          <KeywordContentEditCard key={index} index={index} keyword={keyword} />
        ))}
      </ul>
    </div>
  );
};
