export interface PaginatedResponse<T> {
  hits: T[];
  total: number;
  page: number;
  pageSize: number;
}
