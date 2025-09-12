export interface MedicineListParams {
    serviceKey: string; // API 인증키 (필수)

    pageNo?: number; // 페이지 번호
    numOfRows?: number; // 페이지 당 결과 수
    type?: 'xml' | 'json'; // 응답 형식

    entpName?: string; // 업체명
    itemName?: string; // 품목명
    itemSeq?: string; // 품목기준코드

    efcyQesitm?: string; // 효능효과
    useMethodQesitm?: string; // 사용법
    atpnWarnQesitm?: string; // 주의사항 경고
    atpnQesitm?: string; // 주의사항
    intrcQesitm?: string; // 상호작용
    seQesitm?: string; // 부작용
    depositMethodQesitm?: string; // 보관법

    openDe?: string; // 공개일자
    updateDe?: string; // 수정일자
}

// 약국 정보
export interface PharmacyListParams {
    serviceKey: string;
    pageNo?: number;
    numOfRows?: number;

    sidoCd?: string; // 시도 코드 (예: 110000)
    sgguCd?: string; // 시군구 코드 (예: 110019)
    emdongNm?: string; // 읍면동명 (예: 신내동)
    yadmNm?: string; // 약국명 (예: 온누리건강)

    xPos?: string; // 중심좌표 X (경도)
    yPos?: string; // 중심좌표 Y (위도)
    radius?: string; // 반경 (m 단위)
}
