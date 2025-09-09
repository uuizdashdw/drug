import { MedicineListParams } from '@/types/api';

// 품목명, 업체명, 의약품의 모양, 색 등의 의약품 낱알 정보를 목록으로 제공
export const getMedicineList = async (params: MedicineListParams) => {
    const query = new URLSearchParams({
        serviceKey: process.env.DRUG_API_KEY ?? '',
        pageNo: String(params?.pageNo ?? 1),
        numOfRows: String(params?.numOfRows ?? 10),
        type: params.type ?? 'json', // 기본 json으로
    });

    if (params?.Prduct) query.set('Prduct', params?.Prduct);
    if (params?.Entrps) query.set('Entrps', params?.Entrps);
    if (params?.Rtrvl_resn) query.set('Rtrvl_resn', params?.Rtrvl_resn);
    if (params?.item_seq) query.set('item_seq', params?.item_seq);
    if (params?.bizrno) query.set('bizrno', params?.bizrno);

    const url = `https://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService02/getMdcinGrnIdntfcInfoList02?${query.toString()}`;
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    // type이 xml이면 text()로 받아야 함
    if (params?.type === 'xml') {
        return await res.text();
    }

    return await res.json();
};
