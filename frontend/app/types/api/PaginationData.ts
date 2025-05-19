export interface PaginationResult<T> {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    hasPrevious: boolean;
    hasNext: boolean;
    items: T[];
}
