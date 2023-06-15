import { useFormContext } from 'react-hook-form';

import { Chip } from '~/components/Chip';
// TODO: IdCardCreation의 하위 폴더가 아닌 modules의 하위폴더로 이동해야 합니다.
import { EditorSteps, IdCardEditorFormValues } from '~/modules/IdCardEditor/IdCardEditor.type';
import { KeywordContentEditCard } from '~/modules/KeywordContentEditCard';
import { FormKeywordModel } from '~/types/idCard';

type EditKeywordContentStepProps = {
  onClickMoveTargetStep: (targetStep: EditorSteps) => void;
};

export const EditKeywordContentStep = ({ onClickMoveTargetStep }: EditKeywordContentStepProps) => {
  const { setValue, getValues } = useFormContext<IdCardEditorFormValues>();
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
      <div className="mb-24pxr flex  px-layout-sm pb-[25px]">
        <div className="flex flex-col gap-12pxr">
          <div className="flex gap-6pxr">
            <p className="text-h3">{nickname}</p>
            {/* TODO: 아이콘 확정되면 수정할 예정 */}
            <button onClick={() => onClickMoveTargetStep('PROFILE')}>PROFILE EDIT</button>
          </div>
          <p className="text-b3 text-grey-600">{aboutMe}</p>
        </div>
        {/* TODO: 프로필 이미지 component가 들어갈 자리 */}
        <div className="pl-18pxr">
          <div className="h-[84px] w-[84px]">profile image</div>
        </div>
      </div>
      <ul className="mb-34pxr flex w-full flex-wrap items-center gap-x-4pxr gap-y-8pxr bg-grey-100 px-20pxr py-15pxr">
        {keywords.map(({ title }) => (
          <Chip
            key={title}
            text={title}
            isSelected={true}
            handleClickIcon={() => {
              onClickDeleteChip(title, keywords);
            }}
          />
        ))}
        <Chip text="키워드 추가" themeType="plus" onClick={onClickKeywordPlus} />
      </ul>
      <ul className="flex flex-col gap-20pxr px-layout-sm">
        {keywords.map((keyword, index) => (
          <KeywordContentEditCard key={index} index={index} keyword={keyword} />
        ))}
      </ul>
    </div>
  );
};
