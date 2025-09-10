export interface SearchPageProps {
    searchParams: Promise<{ q: string; page?: string }>;
}

export interface NoContentProps {
    keyword: string;
}
