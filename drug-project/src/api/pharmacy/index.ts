import { cache } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { PharmacyListParams } from '@/types/api';

export const getPharmacyList = cache(async (params: PharmacyListParams) => {
    const query = new URLSearchParams({
        serviceKey: encodeURIComponent(params.serviceKey ?? ''),
        pageNo: String(params?.pageNo ?? 1),
        numOfRows: String(params?.numOfRows ?? 10),
    });

    if (params?.sidoCd) query.set('sidoCd', params.sidoCd);
    if (params?.sgguCd) query.set('sgguCd', params.sgguCd);
    if (params?.emdongNm) query.set('emdongNm', params.emdongNm);
    if (params?.yadmNm) query.set('yadmNm', params.yadmNm);
    if (params?.xPos) query.set('xPos', params.xPos);
    if (params?.yPos) query.set('yPos', params.yPos);
    if (params?.radius) query.set('radius', params.radius);

    const url = `https://apis.data.go.kr/B551182/pharmacyInfoService/getParmacyBasisList?${query.toString()}`;
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    const text = await res.text();

    // Content-Type 확인 후 처리
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('json')) {
        return JSON.parse(text);
    } else {
        const parser = new XMLParser();
        return parser.parse(text);
    }
});
