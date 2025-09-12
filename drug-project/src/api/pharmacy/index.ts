import { cache } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { PharmacyListParams } from '@/types/api';

export const getPharmacyList = cache(async (params: PharmacyListParams) => {
    const query = new URLSearchParams({
        serviceKey: params.serviceKey ?? '',
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

    const xml = await res.text();

    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
    });

    const json = parser.parse(xml);

    // 안전하게 배열화
    const body = json?.response?.body;
    if (body?.items?.item && !Array.isArray(body.items.item)) {
        body.items.item = [body.items.item];
    }

    return json;
});
