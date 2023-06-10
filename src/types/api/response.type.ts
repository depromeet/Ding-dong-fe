export type SliceResponseType<T> = {
  content: T[];
  page: number;
  size: number;
  hasNext: boolean;
};
