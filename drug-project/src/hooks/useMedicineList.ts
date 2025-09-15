import { getMedicineList } from '@/api/drugs';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { useEffect } from 'react';

type MedicineResponse = Awaited<ReturnType<typeof getMedicineList>>;

export const useMedicineList = (pageNo: number) => {
    const query = useQuery({
        queryKey: ['medicineList', pageNo],
        queryFn: () =>
            getMedicineList({
                serviceKey: process.env.NEXT_PUBLIC_SERVICE_API_KEY ?? '',
                itemName: '',
                numOfRows: 20,
                pageNo,
                type: 'json',
            }),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60, // 1분 동안은 fresh 상태로 유지
    });

    useEffect(() => {
        if (!query.isError) return;

        const msg = query.error?.message ?? '데이터 로딩 중 문제가 발생했습니다.';
        // openErrorModal(msg);
        // 또는 콜백을 훅 파라미터로 받아서:
        // onErrorModal?.(msg);
        console.error('❌ 약 리스트 불러오기 실패:', query.error);
    }, [query.isError, query.error]);

    return query;
};
