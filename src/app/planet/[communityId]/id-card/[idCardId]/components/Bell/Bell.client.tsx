'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { usePostNudge } from '~/api/domain/nudge.api.client';
import { BellMessages } from '~/app/planet/[communityId]/id-card/[idCardId]/components/Bell/Message/BellMessages';
import { IdCardDetailModel } from '~/types/idCard';
import { NudgeType } from '~/types/nudge';

import { BellButton } from './Button/BellButton';

type BellProps = {
  isMyIdCard: boolean;
  bellType?: NudgeType;
  nickname: IdCardDetailModel['nickname'];
  idCardUserId: number;
  idCardId: number;
};

export const Bell = ({
  isMyIdCard,
  idCardUserId,
  bellType,
  nickname: nicknameToReceiveMsg,
  idCardId,
}: BellProps) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const backdropRef = useRef(null);

  const { mutate } = usePostNudge(idCardUserId, idCardId, nicknameToReceiveMsg);
  const onMyBellClick = () => {
    // bottomsheet open
  };
  const onOtherBellClick = () => {
    setIsMessageOpen(!isMessageOpen);
  };
  const onMessageClick = (bellType: NudgeType) => {
    mutate({ nudgeType: bellType });
    setIsMessageOpen(!isMessageOpen);
  };

  return (
    <>
      <div className="fixed bottom-60pxr right-20pxr z-modal flex flex-col items-end ">
        {isMyIdCard ? (
          <BellButton bellType="default" onClick={onMyBellClick} />
        ) : (
          <>
            <AnimatePresence>
              {isMessageOpen && (
                <BellMessages activeBellType="FRIENDLY" onMessageClick={onMessageClick} />
              )}
            </AnimatePresence>
            <BellButton
              bellType={bellType || 'default'}
              onClick={onOtherBellClick}
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
