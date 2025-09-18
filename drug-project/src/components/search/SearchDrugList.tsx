'use client';

import { useEffect, useMemo } from 'react';

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
import ListSkeleton from '../common/ListSkeleton';

export default function SearchDrugList({ itemName, pageNo }: SearchDrugListProps) {
    const { data, isLoading, isError, error } = useMedicineList({ pageNo, itemName });
    const { open } = useErrorModalStore();

    const drugs = useMemo(() => {
        return data?.body?.items ?? [];
    }, [data?.body?.items]);

    useEffect(() => {
        if (!isError || !error) return;
        open(error.message);
    }, [isError, error]);

    return (
        <>
            {Array.isArray(drugs) && !isLoading && drugs?.length > 0 && (
                <>
                    {itemName && <SearchResultGuide itemName={itemName} length={drugs?.length} />}
                    <DrugList drugs={drugs} />

                    <Pagination
                        currentPage={Number(pageNo)}
                        totalCount={data.body?.totalCount ?? 0}
                        pageSize={12}
                    />
                </>
            )}

            {isLoading && drugs?.length === 0 && <ListSkeleton />}

            {Array.isArray(drugs) && !isLoading && drugs?.length === 0 && (
                <NoContent keyword={itemName} />
            )}

            {isLoading && <LoadingModal />}
            <ErrorModal />
        </>
    );
}
