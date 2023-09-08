import { useState } from 'react';

import { BellMessage } from '~/app/planet/[communityId]/id-card/[idCardId]/components/Bell/Message/BellMessage';
import { useBottomSheet } from '~/components/BottomSheet';
import { BellList } from '~/modules/BellList/BellList.client';

import { BellButton } from './Button/BellButton';

type BellProps = {
  isMyIdCard: boolean;
  bellType?: 'celebration' | 'eye' | 'heart' | 'rice';
};

export const Bell = ({ isMyIdCard, bellType }: BellProps) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const bottomSheetHandlers = useBottomSheet();
  const onMyBellClick = () => {
    bottomSheetHandlers.onOpen();
  };
  const onOtherBellClick = () => {
    setIsMessageOpen(!isMessageOpen);
  };

  return (
    <div className="fixed bottom-60pxr right-20pxr flex flex-col items-end ">
      {isMyIdCard ? (
        <>
          <BellButton bellType="bell" onClick={onMyBellClick} />
          <BellList bottomSheetHandlers={bottomSheetHandlers} />
        </>
      ) : (
        <>
          {isMessageOpen && (
            <>
              {/*backdrop*/}
              <BellMessage activeBellType="rice" />
            </>
          )}
          <BellButton
            bellType={bellType || 'bell'}
            onClick={onOtherBellClick}
            isClose={isMessageOpen}
            className="mt-16pxr"
          />
          {/*BellCloseButton*/}
        </>
      )}
    </div>
  );
};
