import { useFormContext } from 'react-hook-form';

import { Chip } from '~/components/Chip';
import { EditorSteps } from '~/modules/IdCardEditor/IdCardEditor.type';
import { KeywordContentEditCard } from '~/modules/KeywordContentEditCard';
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
      <div className="mb-24pxr flex justify-between pb-[25px]">
        <div>
          <div className="flex gap-6pxr">
            <p className="text-h3">{nickname}</p>
            {/* TODO: 아이콘 확정되면 수정할 예정 */}
            <button onClick={() => onClickMoveTargetStep('PROFILE')}>PROFILE EDIT</button>
          </div>
          <p className="text-b3 text-grey-600">{aboutMe}</p>
        </div>
        {/* TODO: 프로필 이미지 component가 들어갈 자리 */}
        <div className="h-[84px] w-[84px]">profile image</div>
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
