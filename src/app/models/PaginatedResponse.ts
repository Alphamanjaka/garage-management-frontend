export interface PaginatedResponse {
    items: any[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    nextPage?: number;
    previousPage?: number;
  }