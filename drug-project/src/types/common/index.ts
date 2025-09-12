export interface PaginationProps {
    currentPage: number;
    totalCount: number;
    pageSize: number;
}

export interface SearchResultGuideProps {
    itemName: string;
    length: number;
}

export interface SearchBarProps {
    type: string;
}
