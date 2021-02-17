import { PaginatorOptions } from 'headless-pagination';
export default function usePagination(options: PaginatorOptions): {
    setPage: (newPage: number) => void;
    onNext: () => void;
    onPrevious: () => void;
    page: number;
    links: import("headless-pagination").PaginatorLink[];
    hasNext: boolean;
    hasPrevious: boolean;
    from: number;
    to: number;
};
