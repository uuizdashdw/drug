'use client';

import { PharmacyListPageProps } from '@/types/pharmacy';
import Pagination from '../common/Pagination';
import NoContent from '../search/NoContent';
import PharmacyList from './PharmacyList';
import { usePharmacyList } from '@/hooks/usePharmacyList';
import { useEffect, useMemo } from 'react';
import LoadingModal from '../common/Loading';
import { useErrorModalStore } from '@/store/zustand/common/errorModalState';
import ErrorModal from '../common/ErrorModal';
import ListSkeleton from '../common/ListSkeleton';

export default function PharmacyListPage({ pageNo }: PharmacyListPageProps) {
    const { data, isLoading, isError, error } = usePharmacyList({ pageNo });
    const { open } = useErrorModalStore();

    const pharmacies = useMemo(() => {
        return data?.response?.body?.items?.item ?? [];
    }, [data?.response?.body?.items?.item]);

    useEffect(() => {
        if (!isError || !error) return;
        open(error.message);
    }, [isError, error]);
    return (
        <>
            {Array.isArray(pharmacies) && pharmacies?.length > 0 && (
                <>
                    <PharmacyList pharmacies={pharmacies} />
                    <Pagination
                        currentPage={pageNo}
                        totalCount={data?.response?.body?.totalCount ?? 0}
                        pageSize={12}
                    />
                </>
            )}

            {(!Array.isArray(pharmacies) || isLoading || pharmacies?.length === 0) && (
                <ListSkeleton />
            )}

            {!Array.isArray(pharmacies) && !isLoading && <NoContent keyword={''} />}

            {isLoading && <LoadingModal />}
            <ErrorModal />
        </>
    );
}
