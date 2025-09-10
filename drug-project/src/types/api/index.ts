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
