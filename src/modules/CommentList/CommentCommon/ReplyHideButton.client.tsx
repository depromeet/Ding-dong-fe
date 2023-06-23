import { DashIcon } from '~/components/Icon';

type ReplyHideButtonProps = {
  isShowReplyList: boolean;
  onClickHideReplyList: VoidFunction;
};

export const ReplyHideButton = ({
  isShowReplyList,
  onClickHideReplyList,
}: ReplyHideButtonProps) => {
  return (
    <>
      {isShowReplyList && (
        <button type="button" onClick={onClickHideReplyList} className="mt-24pxr flex gap-8pxr">
          <DashIcon className="fill-grey-500" />
          <span className="text-detail font-semibold text-grey-500">답글 숨기기</span>
        </button>
      )}
    </>
  );
};
