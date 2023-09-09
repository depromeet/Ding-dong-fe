'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { usePostNudge } from '~/api/domain/nudge.api.client';
import { NudgeMessages } from '~/app/planet/[communityId]/id-card/[idCardId]/components/Nudge/Message/NudgeMessages';
import { useBottomSheet } from '~/components/BottomSheet';
import { BellList } from '~/modules/BellList/BellList.client';
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
};

export const Nudge = ({
  isMyIdCard,
  idCardUserId,
  nudgeType,
  nickname: nicknameToReceiveMsg,
  idCardId,
  communityId,
}: NudgeProps) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const bottomSheetHandlers = useBottomSheet();
  const backdropRef = useRef(null);
  const { mutate } = usePostNudge(idCardUserId, idCardId, nicknameToReceiveMsg);

  const onMyNudgeClick = () => {
    bottomSheetHandlers.onOpen();
  };

  const onOtherNudgeClick = () => {
    setIsMessageOpen(!isMessageOpen);
  };
  const onMessageClick = (nudgeType: NudgeModel) => {
    mutate({ nudgeType, communityId });
    setIsMessageOpen(!isMessageOpen);
  };

  return (
    <>
      <div className="fixed bottom-60pxr right-20pxr z-modal flex flex-col items-end ">
        {isMyIdCard ? (
          <>
            <NudgeButton nudgeType="DEFAULT" onClick={onMyNudgeClick} />
            <BellList bottomSheetHandlers={bottomSheetHandlers} />
          </>
        ) : (
          <>
            <AnimatePresence>
              {isMessageOpen && (
                <NudgeMessages activeNudgeType="FRIENDLY" onMessageClick={onMessageClick} />
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
