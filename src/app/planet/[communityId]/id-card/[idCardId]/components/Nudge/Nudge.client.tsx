'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { usePostNudge, usePutNudge } from '~/api/domain/nudge.api.client';
import { NudgeMessages } from '~/app/planet/[communityId]/id-card/[idCardId]/components/Nudge/Message/NudgeMessages';
import { useBottomSheet } from '~/components/BottomSheet';
import { NudgeList } from '~/modules/NudgeList';
import { IdCardDetailModel } from '~/types/idCard';
import { NudgeModel } from '~/types/nudge';

import { NudgeButton } from './Button/NudgeButton';

type NudgeProps = {
  isMyIdCard: boolean;
  nudgeType?: NudgeModel;
  nickname: IdCardDetailModel['nickname'];
  idCardUserId: number;
  idCardId: number;
  communityId: number;
  unreadNudges: number;
};

export const Nudge = ({
  isMyIdCard,
  idCardUserId,
  nudgeType,
  nickname: nicknameToReceiveMsg,
  idCardId,
  communityId,
  unreadNudges,
}: NudgeProps) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const bottomSheetHandlers = useBottomSheet();
  const backdropRef = useRef(null);

  const { mutate: postMutate } = usePostNudge(idCardUserId, idCardId, nicknameToReceiveMsg);
  const { mutate: putMutate } = usePutNudge(idCardUserId, idCardId, nicknameToReceiveMsg);

  const onMyNudgeClick = () => {
    bottomSheetHandlers.onOpen();
  };

  const onOtherNudgeClick = () => {
    setIsMessageOpen(!isMessageOpen);
  };
  const onMessageClick = (newNudgeType: NudgeModel) => {
    const requestBody = { nudgeType: newNudgeType, communityId };
    if (nudgeType) {
      putMutate(requestBody);
    } else {
      postMutate(requestBody);
    }
    setIsMessageOpen(!isMessageOpen);
  };

  return (
    <>
      <div className="fixed bottom-60pxr right-20pxr z-modal flex flex-col items-end ">
        {isMyIdCard ? (
          <>
            <NudgeList
              bottomSheetHandlers={bottomSheetHandlers}
              idCardsId={idCardId}
              communityId={communityId}
            />
            {!bottomSheetHandlers.isOpen && (
              <div className="relative">
                <div className="absolute right-[-10px] top-[-10px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-black p-[4px] text-white">
                  {unreadNudges}
                </div>
                <NudgeButton nudgeType="DEFAULT" onClick={onMyNudgeClick} />
              </div>
            )}
          </>
        ) : (
          <>
            <AnimatePresence>
              {isMessageOpen && (
                <NudgeMessages activeNudgeType={nudgeType} onMessageClick={onMessageClick} />
              )}
            </AnimatePresence>
            <NudgeButton
              nudgeType={nudgeType || 'DEFAULT'}
              onClick={onOtherNudgeClick}
              isOpen={isMessageOpen}
              className="mt-16pxr"
            />
          </>
        )}
      </div>
      <AnimatePresence>
        {isMessageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            ref={backdropRef}
            className="fixed left-0 top-0 z-top1 h-full w-full bg-black/50"
          />
        )}
      </AnimatePresence>
    </>
  );
};
