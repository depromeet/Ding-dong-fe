import { CommentModel, CommentWriterIntoModel } from '~/types/comment';
import { checkCreateAtAgo } from '~/utils/time.util';

type HeaderProps = Pick<CommentWriterIntoModel, 'nickname'> & Pick<CommentModel, 'createdAt'>;

export const Header = ({ nickname, createdAt }: HeaderProps) => {
  return (
    <h4 className="flex gap-4pxr">
      <span className="text-b3 text-gray-800">{nickname}</span>
      <span className="text-b3 text-grey-500">{checkCreateAtAgo(createdAt)}</span>
    </h4>
  );
};
