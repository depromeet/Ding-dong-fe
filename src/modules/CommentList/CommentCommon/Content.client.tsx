import { CommentModel } from '~/types/comment';

type ContentProps = Pick<CommentModel, 'content'>;

export const Content = ({ content }: ContentProps) => {
  return (
    <>
      <p className="text-b3 text-black "> {content}</p>
      <button className="mt-4pxr text-b3 text-grey-600">자세히보기</button>
    </>
  );
};
