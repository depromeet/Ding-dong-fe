import { faker } from '@faker-js/faker/locale/ko';

import { SliceResponse } from '~/types/api';
import { CommentModel, CommentReplyModel } from '~/types/comment';

export const createCommentLike = () => ({
  likeCount: faker.number.int({ min: 0, max: 999 }),
  likedByCurrentUser: Math.random() > 0.5 ? true : false,
});

export const createCommentWriter = (idx: number) => ({
  userId: idx,
  nickname: faker.person.fullName(),
  profileImageUrl: faker.image.avatar(),
});

export const createCommentReply = (idx: number): CommentReplyModel => ({
  commentReplyId: idx,
  content: faker.lorem.sentence({ min: 1, max: 100 }),
  createdAt: faker.date
    .betweens({
      from: '2023-01-01T00:00:00.000Z',
      to: '2023-08-31T00:00:00.000Z',
    })
    .toLocaleString(),
  writerInfo: createCommentWriter(idx),
  commentReplyLikeInfo: createCommentLike(),
});

export const createComment = (idCardId: number, idx: number): CommentModel => ({
  idCardId,
  commentId: idx,
  content: faker.lorem.sentence({ min: 1, max: 100 }),
  createdAt: faker.date
    .betweens({
      from: '2023-01-01T00:00:00.000Z',
      to: '2023-08-31T00:00:00.000Z',
    })
    .toLocaleString(),
  writerInfo: createCommentWriter(idx),
  commentLikeInfo: createCommentLike(),
  repliesCount: faker.number.int({ min: 0, max: 999 }),
});

export const createCommentCount = () => ({
  count: faker.number.int({ min: 0, max: 999 }),
});

export const createRandomId = () => ({
  id: faker.number.int({ min: 0, max: 999 }),
});

export const createCommentReplyList = (n: number) =>
  Array.from({ length: n }, (_, idx) => createCommentReply(Number(`${idx}${idx}`)));

export const createCommentList = (
  n: number,
  page: number,
  size: number,
  idCardId: number,
): SliceResponse<CommentModel> => ({
  content: Array.from({ length: n }, (_, idx) => createComment(idCardId, idx)),
  page,
  size,
  hasNext: page === 5,
});
