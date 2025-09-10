// API
import { getMedicineList } from '@/api/drugs';

// Components
import BasicInfo from '@/components/drug/detail/BasicInfo';
import ChangeOrRegistrationHistory from '@/components/drug/detail/ChangeOrRegistrationHistory';
import ExteriorInfo from '@/components/drug/detail/ExteriorInfo';
import ImageAndItem from '@/components/drug/detail/ImageAndItem';
import ManufacturerInfo from '@/components/drug/detail/ManufacturerInfo';
import MarkAndCodeInfo from '@/components/drug/detail/MarkAndCodeInfo';

// Types
import {
    BaiscInfoProps,
    ChangeOrRegistrationHistoryProps,
    DrugDetailItemProps,
    DrugItem,
    ExteriorInfoProps,
    ImageAndItemProps,
    ManufacturerInfoProps,
    MarkAndCodeInfoProps,
} from '@/types/drug';

import Image from 'next/image';

export default async function DrugDetailItem({ params }: DrugDetailItemProps) {
    const { id } = await params;

    const data = await getMedicineList({
        serviceKey: process.env?.DRUG_API_KEY ?? '',
        item_seq: id,
        numOfRows: 1,
        pageNo: 1,
        type: 'json',
    });

    const drug: DrugItem = data?.body?.items?.[0];
    if (!drug) {
        return <div>데이터를 찾을 수 없습니다.</div>;
    }

    const imageAndItemProps = {
        itemName: drug?.ITEM_NAME,
        itemImage: drug?.ITEM_IMAGE,
    } as ImageAndItemProps;

    const basicInfoProps = {
        itemName: drug?.ITEM_NAME,
        className: drug?.CLASS_NAME,
        classNo: drug?.CLASS_NO,
        etcOtcName: drug?.ETC_OTC_NAME,
        itemPermitDate: drug?.ITEM_PERMIT_DATE,
    } as BaiscInfoProps;

    const manufacturerInfoProps = {
        entpName: drug?.ENTP_NAME,
        bizrNo: drug?.BIZRNO,
        entpSeq: drug?.ENTP_SEQ,
    } as ManufacturerInfoProps;

    const exteriorProps = {
        itemImage: drug?.ITEM_IMAGE,
        itemName: drug?.ITEM_NAME,
        drugShape: drug?.DRUG_SHAPE,
        chart: drug?.CHART,
        colorClass1: drug?.COLOR_CLASS1,
        colorClass2: drug?.COLOR_CLASS2,
        printFront: drug?.PRINT_FRONT,
        printBack: drug?.PRINT_BACK,
        longLength: drug?.LENG_LONG,
        shortLength: drug?.LENG_SHORT,
        thick: drug?.THICK,
    } as ExteriorInfoProps;

    const markCodeInfoProps = {
        markCodeFront: drug?.MARK_CODE_FRONT,
        markCodeBack: drug?.MARK_CODE_BACK,
        ediCode: drug?.EDI_CODE,
        stdCd: drug?.STD_CD,
        markCodeFrontImage: drug?.MARK_CODE_FRONT_IMG,
        markCodeBackImage: drug?.MARK_CODE_BACK_IMG,
    } as MarkAndCodeInfoProps;

    const changeOrRegistrationHistoryProps = {
        imageRegistTs: drug?.IMG_REGIST_TS,
        changeDate: drug?.CHANGE_DATE,
    } as ChangeOrRegistrationHistoryProps;

    return (
        <div className="p-4">
            {/* 약물 이미지 및 이름 정보 */}
            <ImageAndItem {...imageAndItemProps} />

            <div className="mx-auto w-2xl">
                {/* 기본 정보 */}
                <BasicInfo {...basicInfoProps} />

                <hr className="my-24 border-t border-gray-300" />

                {/* 제조사 정보 */}
                <ManufacturerInfo {...manufacturerInfoProps} />

                <hr className="my-24 border-t border-gray-300" />

                {/* 외형 정보 */}
                <ExteriorInfo {...exteriorProps} />

                <hr className="my-24 border-t border-gray-300" />

                {/* 마크 / 코드 정보 */}
                <MarkAndCodeInfo {...markCodeInfoProps} />

                <hr className="my-24 border-t border-gray-300" />

                {/* 변경 / 등록 이력 */}
                <ChangeOrRegistrationHistory {...changeOrRegistrationHistoryProps} />
            </div>
        </div>
    );
}
