import _ from 'lodash';

import { CommentModel, CommentReplyModel } from '~/types/comment';

type NewComment = {
  idCardId: number;
  contents: string;
  userId: number;
  nickname: string;
  profileImageUrl: string;
};

export const createNewComment = ({
  idCardId,
  contents,
  userId,
  nickname,
  profileImageUrl,
}: NewComment): CommentModel => {
  // 새로운 댓글 객체를 생성합니다.
  return {
    idCardId: idCardId,
    commentId: Date.now(), // 임시로 고유한 ID로 사용합니다.
    content: contents,
    createdAt: new Date().toISOString(),
    writerInfo: {
      userId: userId,
      nickname: nickname,
      profileImageUrl: profileImageUrl,
    },
    commentLikeInfo: {
      likeCount: 0,
      isLikedByCurrentUser: false,
    },
    commentReplyInfos: [],
  };
};

export type CommentPages = {
  pages: {
    data: {
      content: CommentModel[];
      hasNext: boolean;
      page: number;
      size: number;
    };
  }[];
  pageParams: number[]; // 페이지 파라미터 타입을 사용하거나 필요에 맞게 수정해주세요
};

export const addCommentToPages = (
  previousComments: CommentPages | undefined,
  newComment: CommentModel,
): CommentPages => {
  const copyPreviousComments = _.cloneDeep(previousComments);
  const updatedPages = copyPreviousComments?.pages ? copyPreviousComments.pages : [];
  const isCommentListEmpty = updatedPages.length === 0;

  if (isCommentListEmpty) {
    updatedPages.push({
      data: {
        content: [newComment],
        hasNext: false,
        page: 0,
        size: 10,
      },
    });
  } else {
    const firstPage = updatedPages[0];
    const firstPageData = firstPage.data;
    const updatedFirstPageData = {
      content: [newComment, ...firstPageData.content],
      hasNext: firstPageData.hasNext,
      page: firstPageData.page,
      size: firstPageData.size,
    };
    updatedPages[0] = { ...firstPage, data: updatedFirstPageData };
  }

  return { pages: updatedPages, pageParams: previousComments?.pageParams ?? [] };
};

export const updateCommentId = (
  previousComments: CommentPages | undefined,
  commentId: number,
): CommentPages => {
  const copyPreviousComments = _.cloneDeep(previousComments);
  const pages = copyPreviousComments?.pages ? copyPreviousComments.pages : [];

  // commentId를 실제 요청 후 받은 id로 수정합니다.
  if (pages.length > 0) {
    const firstPage = pages[0];
    const firstPageData = firstPage.data;
    firstPageData.content[0].commentId = commentId;
    pages[0] = { ...firstPage, data: firstPageData };
  }

  return {
    pages: pages,
    pageParams: previousComments?.pageParams ?? [],
  };
};

type NewReply = {
  contents: string;
  userId: number;
  nickname: string;
  profileImageUrl: string;
};

export const createNewReply = ({
  contents,
  userId,
  nickname,
  profileImageUrl,
}: NewReply): CommentReplyModel => {
  return {
    commentReplyId: Date.now(),
    content: contents,
    createdAt: new Date().toISOString(),
    writerInfo: {
      userId: userId,
      nickname: nickname,
      profileImageUrl: profileImageUrl,
    },
    commentReplyLikeInfo: {
      likeCount: 0,
      isLikedByCurrentUser: false,
    },
  };
};

export const addReplyToPages = (
  previousComments: CommentPages | undefined,
  newReply: CommentReplyModel,
  commentId: number,
): CommentPages => {
  const copyPreviousComments = _.cloneDeep(previousComments);
  const updatedPages = copyPreviousComments?.pages ? copyPreviousComments.pages : [];

  if (updatedPages.length > 0) {
    const firstPage = updatedPages[0];
    const firstPageData = firstPage.data;
    const commentIndex = firstPageData.content.findIndex(
      comment => comment.commentId === commentId,
    );

    if (commentIndex !== -1) {
      const comment = firstPageData.content[commentIndex];
      const updatedComment = {
        ...comment,
        commentReplyInfos: [...comment.commentReplyInfos, newReply],
      };
      firstPageData.content[commentIndex] = updatedComment;
    }
  }

  return { pages: updatedPages, pageParams: previousComments?.pageParams ?? [] };
};

export const updateReplyId = (
  previousComments: CommentPages | undefined,
  commentId: number,
  replyId: number,
): CommentPages => {
  const copyPreviousComments = _.cloneDeep(previousComments);
  const pages = copyPreviousComments?.pages ? copyPreviousComments.pages : [];

  const updatedPages = pages.map(page => {
    const updatedData = {
      ...page.data,
      content: page.data.content.map(comment => {
        if (comment.commentId === commentId) {
          const lastReplyIndex = comment.commentReplyInfos.length - 1;
          if (lastReplyIndex >= 0) {
            const updatedReplies = [...comment.commentReplyInfos];
            const lastReply = updatedReplies[lastReplyIndex];
            lastReply.commentReplyId = replyId;
            return {
              ...comment,
              commentReplyInfos: updatedReplies,
            };
          }
        }
        return comment;
      }),
    };
    return {
      ...page,
      data: updatedData,
    };
  });

  return {
    pages: updatedPages,
    pageParams: previousComments?.pageParams ?? [],
  };
};