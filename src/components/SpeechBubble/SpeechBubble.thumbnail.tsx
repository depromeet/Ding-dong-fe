import { NudgeIconSelector } from '~/components/NudgeIconSelector';
import { nudgeMessages, NudgeModel } from '~/types/nudge';
import { tw } from '~/utils/tailwind.util';

type SpeechBubbleThumbnailProps = {
  nudgeType: NudgeModel;
};

export const SpeechBubbleThumbnail = ({ nudgeType }: SpeechBubbleThumbnailProps) => {
  const message = nudgeMessages.find(x => x.id === nudgeType)?.text;

  return (
    <div className="relative max-w-fit">
      <div className="flex items-center rounded-[8px] bg-[#EBEEFF] px-10pxr py-4pxr">
        <NudgeIconSelector nudgeType={nudgeType} className="mr-4pxr h-14pxr w-14pxr" />
        <>
          <span className={tw('text-detail', 'font-bold')}>{message}</span>
          <span className="text-detail">를 나에게 보냈어요</span>
        </>
      </div>
      <div className="absolute left-[20px]">
        <div className="h-0 w-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#EBEEFF]" />
      </div>
    </div>
  );
};
