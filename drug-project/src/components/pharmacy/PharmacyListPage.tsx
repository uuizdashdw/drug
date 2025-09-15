'use client';

import { PharmacyListPageProps } from '@/types/pharmacy';
import Pagination from '../common/Pagination';
import NoContent from '../search/NoContent';
import PharmacyList from './PharmacyList';
import { usePharmacyList } from '@/hooks/usePharmacyList';
import { useMemo } from 'react';
import LoadingModal from '../common/Loading';
import { useErrorModalStore } from '@/store/zustand/common/errorModalState';
import ErrorModal from '../common/ErrorModal';

export default function PharmacyListPage({ pageNo }: PharmacyListPageProps) {
    const { data, isLoading, isError, error } = usePharmacyList({ pageNo });
    const { open } = useErrorModalStore();

    if (isError && error) {
        open(error.message);
    }

    const pharmacies = useMemo(() => {
        return data?.response?.body?.items?.item ?? [];
    }, [data?.response?.body?.items?.item]);
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

            {(!Array.isArray(pharmacies) || pharmacies?.length === 0) && <NoContent keyword={''} />}

            {isLoading && <LoadingModal />}
            <ErrorModal />
        </>
    );
}
