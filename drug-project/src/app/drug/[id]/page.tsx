// API
import { getMedicineList } from '@/api/drugs';

// Components
import BasicInfo from '@/components/drug/detail/BasicInfo';
import Caution from '@/components/drug/detail/Caution';
import ChangeOrRegistrationHistory from '@/components/drug/detail/ChangeOrRegistrationHistory';
import Classification from '@/components/drug/detail/Classification';
import ExteriorInfo from '@/components/drug/detail/ExteriorInfo';
import ImageAndItem from '@/components/drug/detail/ImageAndItem';
import ManufacturerInfo from '@/components/drug/detail/ManufacturerInfo';
import MarkAndCodeInfo from '@/components/drug/detail/MarkAndCodeInfo';
import UseMethod from '@/components/drug/detail/UseMethod';

// Types
import {
    BaiscInfoProps,
    CautionProps,
    DrugDetailItemProps,
    DrugItem,
    ImageAndItemProps,
    ManufacturerInfoProps,
} from '@/types/drug';

export default async function DrugDetailItem({ params }: DrugDetailItemProps) {
    const { id } = await params;

    const data = await getMedicineList({
        serviceKey: process.env?.SERVICE_API_KEY ?? '',
        itemSeq: id,
        numOfRows: 1,
        pageNo: 1,
        type: 'json',
    });

    const drug: DrugItem = data?.body?.items?.[0];
    if (!drug) {
        return <div>데이터를 찾을 수 없습니다.</div>;
    }

    const imageAndItemProps = {
        itemName: drug?.itemName,
        itemImage: drug?.itemImage,
    } as ImageAndItemProps;

    const basicInfoProps = {
        itemName: drug?.itemName,
        efcyQesitm: drug?.efcyQesitm,
        itemSeq: drug?.itemSeq,
        openDe: drug?.openDe,
    } as BaiscInfoProps;

    const manufacturerInfoProps = {
        entpName: drug?.entpName,
        bizrNo: drug?.bizrno,
        entpSeq: drug?.itemSeq,
    } as ManufacturerInfoProps;

    const cautionProps = {
        intrcQesitm: drug?.intrcQesitm,
        atpnQesitm: drug?.atpnQesitm,
        seQesitm: drug?.seQesitm,
    } as CautionProps;

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

                {/* 사용 구분 */}
                <Classification efcyQesitm={drug?.efcyQesitm ?? ''} />

                <hr className="my-24 border-t border-gray-300" />

                {/* 사용법 */}
                <UseMethod useMethodQesitm={drug?.useMethodQesitm ?? ''} />

                <hr className="my-24 border-t border-gray-300" />

                {/* 주의 사항 */}
                <Caution {...cautionProps} />

                <p className="mt-24 text-sm">마지막 업데이트 날짜 : {drug?.updateDe}</p>
            </div>
        </div>
    );
}
