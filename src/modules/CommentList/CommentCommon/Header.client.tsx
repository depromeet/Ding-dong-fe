import { CommentModel, CommentWriterIntoModel } from '~/types/comment';

type HeaderProps = Pick<CommentWriterIntoModel, 'nickname'> & Pick<CommentModel, 'createdAt'>;

/* eslint-disable @typescript-eslint/no-unused-vars */
export const Header = ({ nickname, createdAt }: HeaderProps) => {
  return (
    <h4 className="flex gap-4pxr">
      <span className="text-b3 text-gray-800">{nickname}</span>
      <span className="text-b3 text-grey-500">1분전</span>
    </h4>
  );
};
