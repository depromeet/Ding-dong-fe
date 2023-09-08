'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { BellMessages } from '~/app/planet/[communityId]/id-card/[idCardId]/components/Bell/Message/BellMessages';
import { useToastMessageStore } from '~/stores/toastMessage.store';
import { IdCardDetailModel } from '~/types/idCard';

import { BellButton } from './Button/BellButton';

type BellType = 'celebration' | 'eye' | 'heart' | 'rice';
type BellProps = {
  isMyIdCard: boolean;
  bellType?: 'celebration' | 'eye' | 'heart' | 'rice';
  nickname: IdCardDetailModel['nickname'];
};

export const Bell = ({ isMyIdCard, bellType, nickname: nicknameToReceiveMsg }: BellProps) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const backdropRef = useRef(null);
  const { successToast } = useToastMessageStore();
  const onMyBellClick = () => {
    // bottomsheet open
  };
  const onOtherBellClick = () => {
    setIsMessageOpen(!isMessageOpen);
  };
  const onMessageClick = (bellType: BellType) => {
    // TODO: bellType post api -> 성공할 경우 detail 정보 invalidate query를 이용해서 새로운 정보 받아오기
    console.log({ bellType }); // api 붙이면서 함께 삭제 예정
    setIsMessageOpen(!isMessageOpen);
    successToast(`${nicknameToReceiveMsg}에게 성공적으로 딩동을 보냈어요!`);
  };

  return (
    <>
      <div className="fixed bottom-60pxr right-20pxr z-modal flex flex-col items-end ">
        {isMyIdCard ? (
          <BellButton bellType="bell" onClick={onMyBellClick} />
        ) : (
          <>
            <AnimatePresence>
              {isMessageOpen && (
                <BellMessages activeBellType="rice" onMessageClick={onMessageClick} />
              )}
            </AnimatePresence>
            <BellButton
              bellType={bellType || 'bell'}
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
