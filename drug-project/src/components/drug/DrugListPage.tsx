'use client';

import { useErrorModalStore } from '@/store/zustand/common/errorModalState';
import { useMedicineList } from '@/hooks/useMedicineList';
import DrugList from '../common/DrugList';
import Pagination from '../common/Pagination';

import { useMemo } from 'react';
import Loading from '../common/Loading';
import ErrorModal from '../common/ErrorModal';
import NoContent from '../search/NoContent';

export default function DrugListPage({ pageNo }: { pageNo: number }) {
    const { data, isLoading, isError, error } = useMedicineList(pageNo);
    const { open } = useErrorModalStore();

    if (isError && error) {
        open(error.message);
    }

    const drugs = useMemo(() => {
        return data.body?.items ?? [];
    }, [data.body?.items]);

    return (
        <>
            {Array.isArray(drugs) && drugs?.length > 0 && (
                <>
                    <DrugList drugs={drugs} />

                    <Pagination
                        currentPage={pageNo}
                        totalCount={data.body?.totalCount ?? 0}
                        pageSize={12}
                    />
                </>
            )}

            {!Array.isArray(drugs) || (drugs?.length === 0 && <NoContent keyword={''} />)}

            {isLoading && <Loading />}
            <ErrorModal />
        </>
    );
}
