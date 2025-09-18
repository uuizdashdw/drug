'use client';

import { usePharmacyList } from '@/hooks/usePharmacyList';
// Types
import { SearchPharmacyListProps } from '@/types/pharmacy';
import { useEffect, useMemo } from 'react';
import SearchResultGuide from './SearchResultGuide';
import PharmacyList from '../pharmacy/PharmacyList';
import NoContent from './NoContent';
import Pagination from '../common/Pagination';
import ListSkeleton from '../common/ListSkeleton';
import { useErrorModalStore } from '@/store/zustand/common/errorModalState';
import LoadingModal from '../common/Loading';
import ErrorModal from '../common/ErrorModal';

export default function SearchPharmacyList({ itemName, pageNo }: SearchPharmacyListProps) {
    const { data, isLoading, isError, error } = usePharmacyList({ pageNo, itemName });
    const { open } = useErrorModalStore();

    const pharmacies = useMemo(() => {
        return data?.response?.body?.items?.item ?? [];
    }, [data?.response?.body?.items?.item]);

    const totalCount = useMemo(() => {
        return data?.response?.body?.totalCount;
    }, [data?.response?.body?.totalCount]);

    useEffect(() => {
        if (!isError || !error) return;
        open(error.message);
    }, [isError, error]);

    return (
        <>
            {Array.isArray(pharmacies) && pharmacies?.length > 0 && (
                <>
                    {itemName && <SearchResultGuide itemName={itemName} totalCount={totalCount} />}
                    <PharmacyList pharmacies={pharmacies} />
                </>
            )}

            {isLoading && pharmacies?.length === 0 && <ListSkeleton />}

            {!isLoading && pharmacies?.length === 0 && <NoContent keyword={itemName} />}

            {Array.isArray(pharmacies) && pharmacies?.length > 0 && (
                <Pagination
                    currentPage={Number(pageNo)}
                    totalCount={data?.response?.body?.totalCount ?? 0}
                    pageSize={12}
                />
            )}

            {isLoading && <LoadingModal />}
            <ErrorModal />
        </>
    );
}
