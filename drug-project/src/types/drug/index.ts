export interface DrugItem {
    ITEM_SEQ: string;
    ITEM_NAME: string;
    ENTP_SEQ: string;
    ENTP_NAME: string;
    CHART: string;
    ITEM_IMAGE: string;
    PRINT_FRONT: string;
    PRINT_BACK: string;
    DRUG_SHAPE: string;
    COLOR_CLASS1: string;
    COLOR_CLASS2: string;
    LINE_FRONT: string;
    LINE_BACK: string;
    LENG_LONG: string;
    LENG_SHORT: string;
    THICK: string;
    IMG_REGIST_TS: string;
    CLASS_NO: string;
    CLASS_NAME: string;
    ETC_OTC_NAME: string;
    ITEM_PERMIT_DATE: string;
    FORM_CODE_NAME: string;
    MARK_CODE_FRONT_ANAL: string;
    MARK_CODE_BACK_ANAL: string;
    MARK_CODE_FRONT_IMG: string;
    MARK_CODE_BACK_IMG: string;
    ITEM_ENG_NAME: string;
    CHANGE_DATE: string;
    MARK_CODE_FRONT: string;
    MARK_CODE_BACK: string;
    EDI_CODE: string;
    BIZRNO: string;
    STD_CD: string;
}

export interface DrugListProps {
    drugs: DrugItem[];
}

export interface DrugItemProps {
    drug: DrugItem;
}

export interface DrugDetailItemProps {
    params: Promise<{ id: string }>;
}

export interface BaiscInfoProps {
    itemName: string;
    className: string;
    classNo: string;
    etcOtcName: string;
    itemPermitDate: string;
}
