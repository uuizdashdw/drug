export interface DrugItem {
    itemSeq: string; // 품목기준코드
    itemName: string; // 품목명
    entpName: string; // 업체명
    bizrno: string; // 사업자등록번호

    efcyQesitm: string | null; // 효능효과
    useMethodQesitm: string | null; // 사용법
    atpnWarnQesitm: string | null; // 주의사항 경고
    atpnQesitm: string | null; // 주의사항
    intrcQesitm: string | null; // 상호작용
    seQesitm: string | null; // 부작용
    depositMethodQesitm: string | null; // 보관법

    itemImage: string | null; // 의약품 이미지
    openDe: string | null; // 공개일자
    updateDe: string | null; // 수정일자
}

export interface DrugListProps {
    drugs: DrugItem[];
}

export interface DrugItemProps {
    drug: DrugItem;
}

export interface DrugDetailItemProps {
    params: { id: string };
}

export interface ImageAndItemProps {
    itemName: string;
    itemImage: string | null;
}

export interface BaiscInfoProps {
    itemName: string;
    efcyQesitm: string;
    itemSeq: string;
    openDe: string;
}

export interface ManufacturerInfoProps {
    entpName: string;
    bizrNo: string;
    entpSeq: string;
}

export interface CautionProps {
    atpnQesitm: string;
    intrcQesitm: string;
    seQesitm: string;
}

export interface UseMethodProps {
    useMethodQesitm: string;
}

export interface ClassificationProps {
    efcyQesitm: string;
}
