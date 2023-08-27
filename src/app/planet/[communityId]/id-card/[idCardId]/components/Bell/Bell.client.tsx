import { useState } from 'react';

import { BellMessages } from '~/app/planet/[communityId]/id-card/[idCardId]/components/Bell/Message/BellMessages';

import { BellButton } from './Button/BellButton';

type BellProps = {
  isMyIdCard: boolean;
  bellType?: 'celebration' | 'eye' | 'heart' | 'rice';
};

export const Bell = ({ isMyIdCard, bellType }: BellProps) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const onMyBellClick = () => {
    // bottomsheet open
  };
  const onOtherBellClick = () => {
    setIsMessageOpen(!isMessageOpen);
  };

  return (
    <div className="fixed bottom-60pxr right-20pxr flex flex-col items-end ">
      {isMyIdCard ? (
        <BellButton bellType="bell" onClick={onMyBellClick} />
      ) : (
        <>
          {isMessageOpen && (
            <>
              {/*backdrop*/}
              <BellMessages activeBellType="rice" />
            </>
          )}
          <BellButton
            bellType={bellType || 'bell'}
            onClick={onOtherBellClick}
            isOpen={isMessageOpen}
            className="mt-16pxr"
          />
        </>
      )}
    </div>
  );
};
