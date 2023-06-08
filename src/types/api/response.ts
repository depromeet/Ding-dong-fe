export type SliceResponse<T> = {
  content: T[];
  page: number;
  size: number;
  hasNext: boolean;
};
