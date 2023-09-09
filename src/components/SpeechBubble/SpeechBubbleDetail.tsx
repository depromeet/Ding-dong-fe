import { NudgeIconSelector } from '~/components/NudgeIconSelector';
import { nudgeMessages, NudgeModel } from '~/types/nudge';
import { tw } from '~/utils/tailwind.util';

type SpeechBubbleDetailProps = {
  nudgeType: NudgeModel;
};

export const SpeechBubbleDetail = ({ nudgeType }: SpeechBubbleDetailProps) => {
  const message = nudgeMessages.find(x => x.id === nudgeType)?.text;

  return (
    <div className="relative">
      <div
        className="flex min-h-[32px] min-w-[228px] items-center rounded-[8px] bg-white px-10pxr py-4pxr drop-shadow-md filter"
        style={{ filter: 'drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.10))' }}
      >
        <NudgeIconSelector nudgeType={nudgeType} className="mr-4pxr h-14pxr w-14pxr" />
        <>
          <span className={tw('text-b3', 'font-bold')}>{message}</span>
          <span className="text-b3">를 나에게 보냈어요</span>
        </>
      </div>
      <div className="absolute left-[38px]">
        <div
          className="h-[14px] w-[28px] rounded-bl-full rounded-br-full bg-white drop-shadow-md filter"
          style={{ filter: 'drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.10))' }}
        />
      </div>
      <div className="absolute bottom-[-28px] left-[60px] ">
        <div
          className="h-[12px] w-[12px] rounded-full bg-white drop-shadow-md filter"
          style={{ filter: 'drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.10))' }}
        />
      </div>
    </div>
  );
};
