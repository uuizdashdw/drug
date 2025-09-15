'use client';

import { useMemo } from 'react';

// Components
import DrugList from '../common/DrugList';
import SearchResultGuide from './SearchResultGuide';
import NoContent from './NoContent';
import Pagination from '../common/Pagination';
import LoadingModal from '../common/Loading';
import ErrorModal from '../common/ErrorModal';

// Types
import { SearchDrugListProps } from '@/types/search';

// Hooks
import { useMedicineList } from '@/hooks/useMedicineList';
import { useErrorModalStore } from '@/store/zustand/common/errorModalState';

export default function SearchDrugList({ itemName, pageNo }: SearchDrugListProps) {
    const { data, isLoading, isError, error } = useMedicineList({ pageNo, itemName });
    const { open } = useErrorModalStore();

    if (isError && error) {
        open(error.message);
    }

    const drugs = useMemo(() => {
        return data?.body?.items ?? [];
    }, [data?.body?.items]);

    return (
        <>
            {Array.isArray(drugs) && drugs?.length > 0 && (
                <>
                    {itemName && <SearchResultGuide itemName={itemName} length={drugs?.length} />}
                    <DrugList drugs={drugs} />
                </>
            )}

            {(!Array.isArray(drugs) || drugs?.length === 0) && !isLoading && (
                <NoContent keyword={itemName} />
            )}

            {Array.isArray(drugs) && drugs?.length > 0 && (
                <Pagination
                    currentPage={Number(pageNo)}
                    totalCount={data.body?.totalCount ?? 0}
                    pageSize={12}
                />
            )}

            {isLoading && <LoadingModal />}
            <ErrorModal />
        </>
    );
}
