import { DashIcon } from '~/components/Icon';
import { CommentModel } from '~/types/comment';

type ReplyShowButtonProps = Pick<CommentModel, 'commentReplyInfos'> & {
  isShowReplyList: boolean;
  onClickHideReplyList: VoidFunction;
  onClickShowReplyList: VoidFunction;
};

export const ReplyShowButton = ({
  isShowReplyList,
  onClickHideReplyList,
  onClickShowReplyList,
  commentReplyInfos,
}: ReplyShowButtonProps) => {
  return (
    <>
      {isShowReplyList ? (
        <button type="button" onClick={onClickHideReplyList} className="mt-24pxr flex gap-8pxr">
          <DashIcon className="fill-grey-500" />
          <span className="text-detail font-semibold text-grey-500">답글 숨기기</span>
        </button>
      ) : (
        <button type="button" onClick={onClickShowReplyList} className="mt-24pxr flex gap-8pxr">
          <DashIcon className="fill-grey-500" />
          <span className="text-detail font-semibold text-grey-500">
            답글 {commentReplyInfos.length}개 더보기
          </span>
        </button>
      )}
    </>
  );
};
