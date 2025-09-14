import { ReactNode } from 'react';

export interface PharmacyLayoutProps {
    children: ReactNode;
}

export interface PharmacyPageProps {
    searchParams?: Promise<{ page?: string }>;
}

export interface PharmacyItem {
    addr: string; // 주소
    clCd: number; // 종별코드
    clCdNm: string; // 종별코드명 (약국, 병원 등)
    emdongNm: string; // 읍면동명
    estbDd: number; // 개설일자 (YYYYMMDD)
    postNo: number; // 우편번호
    sgguCd: number; // 시군구 코드
    sgguCdNm: string; // 시군구명
    sidoCd: number; // 시도 코드
    sidoCdNm: string; // 시도명
    telno: string; // 전화번호
    XPos: number; // 경도
    YPos: number; // 위도
    yadmNm: string; // 약국명
    ykiho: string; // 암호화된 요양기관번호
}

export interface PharmacyListProps {
    pharmacies: PharmacyItem[];
}

export interface PharmacyItemProps {
    item: PharmacyItem;
}

export interface DetailPharmacyItemProps {
    params: Promise<{ id: string }>;
}

export interface PharmBaiscInfoProps {
    address: string;
    postNumber: string;
    telNumber: string;
}

export interface BusinessHourProps {
    pharmacy: PharmacyItem;
}
