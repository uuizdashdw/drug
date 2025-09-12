// api/pharmacy.ts
import { cache } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { PharmacyListParams } from '@/types/api';

export const getPharmacyList = cache(async (params: PharmacyListParams) => {
    const query = new URLSearchParams({
        serviceKey: params.serviceKey ?? '',
        pageNo: String(params?.pageNo ?? 1),
        numOfRows: String(params?.numOfRows ?? 10),
    });

    if (params?.Q0) query.set('Q0', params.Q0);
    if (params?.Q1) query.set('Q1', params.Q1);
    if (params?.QT) query.set('QT', params.QT);
    if (params?.QN) query.set('QN', params.QN);
    if (params?.ORD) query.set('ORD', params.ORD);

    const url = `https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?${query.toString()}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    // XML → JSON 변환
    const xml = await res.text();
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
    });
    const json = parser.parse(xml);

    return json;
});
