export interface MedicineListParams {
    pageNo?: number;
    numOfRows?: number;
    type?: 'xml' | 'json';
    Prduct?: string; // 품목명
    Entrps?: string; // 업체명
    Rtrvl_resn?: string; // 회수사유내용
    item_seq?: string; // 품목기준코드
    bizrno?: string; // 사업자등록번호
    serviceKey: string;
}
