import { getPharmacyList } from '@/api/pharmacy';
import { useErrorModalStore } from '@/store/zustand/common/errorModalState';
import { usePharmacyListParams } from '@/types/pharmacy';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const usePharmacyList = ({ pageNo }: usePharmacyListParams) => {
    const { open } = useErrorModalStore();

    const query = useQuery({
        queryKey: ['pharmacyList', pageNo],
        queryFn: async () => {
            try {
                return await getPharmacyList({
                    serviceKey:
                        process.env.SERVICE_API_KEY ??
                        '582eb8992a09b966d969483025088ab6e10b06829cb8fce85f9edfd58c785a99',
                    numOfRows: 20,
                    pageNo,
                });
            } catch (err) {
                console.error('❌ API 실패', err);
                return { body: { items: [], totalCount: 0 } }; // 최소 안전 리턴
            }
        },
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
