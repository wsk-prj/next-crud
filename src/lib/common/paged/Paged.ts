export interface Paged<T> {
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  pageSize: number;
  currentPage: number;
  currentItems: number;
  totalPages: number;
  totalItems: number;
}
