export type PaginatedResponse<T> = {
  totalPages: number;
  page: number;
  data: T[];
};
