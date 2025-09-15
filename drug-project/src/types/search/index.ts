import { DrugItemType } from '../drug';

export interface SearchPageProps {
    searchParams: Promise<{ q: string; page?: string }>;
}

export interface NoContentProps {
    keyword: string;
}

export interface SearchPharmacyPageProps {
    searchParams: Promise<{ q: string; pageNo?: string }>;
}

export interface SearchDrugListProps {
    // drugs: DrugItemType[];
    itemName: string;
    pageNo: number;
}
