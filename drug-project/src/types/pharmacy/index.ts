import { ReactNode } from 'react';

export interface PharmacyLayoutProps {
    children: ReactNode;
}

export interface PharmacyPageProps {
    searchParams?: Record<string, string | string[] | undefined>;
}

export interface PharmacyItem {
    dutyAddr: string; // 주소
    dutyName: string; // 약국명
    dutyTel1: string; // 대표 전화번호

    // 영업 시간 (요일별, 시작/종료)
    dutyTime1s?: number; // 월요일 시작
    dutyTime1c?: number; // 월요일 종료
    dutyTime2s?: number; // 화요일 시작
    dutyTime2c?: number; // 화요일 종료
    dutyTime3s?: number;
    dutyTime3c?: number;
    dutyTime4s?: number;
    dutyTime4c?: number;
    dutyTime5s?: number;
    dutyTime5c?: number;
    dutyTime6s?: number;
    dutyTime6c?: number;
    dutyTime7s?: number;
    dutyTime7c?: number;
    dutyTime8s?: number;
    dutyTime8c?: number;

    dutyEtc?: string; // 비고 (전화문의 필요 등)
    dutyMapimg?: string; // 약국 위치 설명 (지도 이미지 설명)

    hpid: string; // 기관 ID
    postCdn1: number; // 우편번호 앞자리
    postCdn2: number; // 우편번호 뒷자리
    rnum: number; // 순번

    wgs84Lat: number; // 위도
    wgs84Lon: number; // 경도
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
    etc: string;
}

export interface BusinessHourProps {
    pharmacy: PharmacyItem;
}
