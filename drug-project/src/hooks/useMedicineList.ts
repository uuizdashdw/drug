import { getMedicineList } from '@/api/drugs';
import { useErrorModalStore } from '@/store/zustand/common/errorModalState';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { useEffect } from 'react';

type MedicineResponse = Awaited<ReturnType<typeof getMedicineList>>;

export const useMedicineList = (pageNo: number) => {
    const { open } = useErrorModalStore();
    const query = useQuery({
        queryKey: ['medicineList', pageNo],
        queryFn: async () => {
            try {
                return await getMedicineList({
                    serviceKey:
                        process.env.SERVICE_API_KEY ??
                        '582eb8992a09b966d969483025088ab6e10b06829cb8fce85f9edfd58c785a99',
                    itemName: '',
                    numOfRows: 20,
                    pageNo,
                    type: 'json',
                });
            } catch (e) {
                console.error('❌ API 실패', e);
                return { body: { items: [], totalCount: 0 } }; // 최소 안전 리턴
            }
        },
        // placeholderData: keepPreviousData,
        // staleTime: 1000 * 60, // 1분 동안은 fresh 상태로 유지
    });

    useEffect(() => {
        if (!query.isError) return;

        const msg = query.error?.message ?? '데이터 로딩 중 문제가 발생했습니다.';
        // openErrorModal(msg);
        // 또는 콜백을 훅 파라미터로 받아서:
        // onErrorModal?.(msg);

        open(msg);
        console.error('❌ 약 리스트 불러오기 실패:', query.error);
    }, [query.isError, query.error]);

    return query;
};
