import { cache } from 'react';
import { MedicineListParams } from '@/types/api';

// 의약품 설명서 API (DrbEasyDrugInfoService)
export const getMedicineList = cache(async (params: MedicineListParams) => {
    const query = new URLSearchParams({
        serviceKey: process.env.SERVICE_API_KEY ?? params?.serviceKey,
        pageNo: String(params?.pageNo ?? 1),
        numOfRows: String(params?.numOfRows ?? 12),
        type: params?.type ?? 'json', // 기본 json
        itemName: params?.itemName ?? '',
    });

    if (params?.entpName) query.set('entpName', params.entpName); // 업체명
    if (params?.itemName) query.set('itemName', params.itemName); // 품목명
    if (params?.itemSeq) query.set('itemSeq', params.itemSeq); // 품목기준코드
    if (params?.efcyQesitm) query.set('efcyQesitm', params.efcyQesitm); // 효능효과
    if (params?.useMethodQesitm) query.set('useMethodQesitm', params.useMethodQesitm);
    if (params?.atpnWarnQesitm) query.set('atpnWarnQesitm', params.atpnWarnQesitm);
    if (params?.atpnQesitm) query.set('atpnQesitm', params.atpnQesitm);
    if (params?.intrcQesitm) query.set('intrcQesitm', params.intrcQesitm);
    if (params?.seQesitm) query.set('seQesitm', params.seQesitm);
    if (params?.depositMethodQesitm) query.set('depositMethodQesitm', params.depositMethodQesitm);
    if (params?.openDe) query.set('openDe', params.openDe);
    if (params?.updateDe) query.set('updateDe', params.updateDe);

    const url = `https://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?${query.toString()}`;
    const res = await fetch(url, { cache: 'force-cache' });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    if (params?.type === 'xml') {
        return await res.text();
    }

    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        console.error('❌ API 응답 JSON 아님:', text.slice(0, 200));
        throw new Error('API 응답이 JSON 형식이 아닙니다.');
    }
});
