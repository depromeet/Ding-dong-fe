import { useFormContext } from 'react-hook-form';

import { Button } from '~/components/Button';
import { Chip } from '~/components/Chip';
import { ProfileImageEdit } from '~/components/ProfileImageEdit';
import { EditorSteps, IdCardEditorFormValues } from '~/modules/IdCardEditor/IdCardEditor.type';
import { KeywordContentEditCard } from '~/modules/KeywordContentEditCard';

type EditKeywordContentStepProps = {
  onClickMoveTargetStep: (targetStep: EditorSteps) => void;
};

export const EditKeywordContentStep = ({ onClickMoveTargetStep }: EditKeywordContentStepProps) => {
  const { setValue, getValues } = useFormContext<IdCardEditorFormValues>();
  const values = getValues();
  const { nickname, aboutMe, keywords, profileImageUrl } = values;

  const onClickKeywordPlus = () => {
    onClickMoveTargetStep('KEYWORD');
  };

  const onClickEditProfileButton = () => {
    onClickMoveTargetStep('PROFILE');
  };

  return (
    <div>
      <div className="flex justify-between px-layout-sm">
        <div className="flex flex-col gap-12pxr">
          <div className="flex gap-6pxr">
            <p className="text-h3">{nickname}</p>
          </div>
          <p className="text-b3 text-grey-600">{aboutMe}</p>
          <Button
            color="secondary"
            size="small"
            className="px-12pxr py-6pxr font-bold"
            width="w-fit"
            onClick={onClickEditProfileButton}
          >
            프로필 편집
          </Button>
        </div>
        <div className="flex items-start pl-18pxr">
          <ProfileImageEdit<IdCardEditorFormValues>
            className="mx-auto"
            fieldName="profileImageUrl"
            defaultProfileImage={profileImageUrl}
            setValue={setValue}
          />
        </div>
      </div>
      <ul className="mb-34pxr mt-28pxr flex w-full flex-wrap items-center gap-x-4pxr gap-y-8pxr bg-grey-100 px-20pxr py-15pxr">
        {keywords.map(({ title }) => (
          <Chip key={title} text={title} isSelected={true} />
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
