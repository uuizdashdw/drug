import { getMedicineList } from '@/api/drugs';
import BasicInfo from '@/components/drug/detail/BasicInfo';
import ManufacturerInfo from '@/components/drug/detail/ManufacturerInfo';
import { DrugDetailItemProps, DrugItem } from '@/types/drug';
import { tranformDateYYYYMMDD } from '@/utils/transformDate';
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

    console.log('## 드러그 :: ', drug);

    return (
        <div className="p-4">
            <h1 className="mb-16 text-center text-3xl font-bold">{drug.ITEM_NAME}</h1>

            <div className="mb-20 flex justify-center">
                <Image
                    src={drug?.ITEM_IMAGE}
                    alt={drug?.ITEM_NAME}
                    width={500}
                    height={500}
                    sizes="80vw" // 뷰포트 너비 기준으로 반응
                    className="h-auto w-2xl"
                />
            </div>

            <div className="mx-auto w-2xl">
                {/* 기본 정보 */}
                <BasicInfo
                    itemName={drug?.ITEM_NAME}
                    className={drug?.CLASS_NAME}
                    classNo={drug?.CLASS_NO}
                    etcOtcName={drug?.ETC_OTC_NAME}
                    itemPermitDate={drug?.ITEM_PERMIT_DATE}
                />

                <hr className="my-24 border-t border-gray-300" />

                <ManufacturerInfo
                    entpName={drug?.ENTP_NAME}
                    bizrNo={drug?.BIZRNO}
                    entpSeq={drug?.ENTP_SEQ}
                />

                <hr className="my-24 border-t border-gray-300" />

                <section className="mb-6">
                    <h2 className="mb-3 text-2xl font-bold">외형 정보</h2>

                    <div className="mb-4 flex flex-col items-center">
                        <Image
                            src={drug.ITEM_IMAGE}
                            alt={drug.ITEM_NAME}
                            width={100}
                            height={100}
                            className="h-auto w-48 rounded shadow"
                        />

                        <p className="mt-2 text-sm text-gray-500">{drug.CHART}</p>
                    </div>

                    <p className="mb-1">
                        <strong>모양 :</strong> {drug.DRUG_SHAPE}
                    </p>
                    <p className="mb-1">
                        <strong>색상 :</strong> {drug.COLOR_CLASS1} {drug.COLOR_CLASS2 ?? ''}
                    </p>
                    <p className="mb-1">
                        <strong>각인 :</strong> 앞면 {drug.PRINT_FRONT} / 뒷면 {drug.PRINT_BACK}
                    </p>
                    <p className="mb-1">
                        <strong>분할선 :</strong> 앞면 {drug.PRINT_FRONT ?? '-'} / 뒷면{' '}
                        {drug.PRINT_BACK ?? '-'}
                    </p>
                    <p className="mb-1">
                        <strong>크기 :</strong> 길이 {drug.LENG_LONG}mm × {drug.LENG_SHORT}mm, 두께{' '}
                        {drug.THICK}mm
                    </p>
                </section>

                <hr className="my-24 border-t border-gray-300" />

                <section className="mb-6">
                    <h2 className="mb-3 text-2xl font-bold">마크 / 코드</h2>

                    <p className="mb-1">
                        <strong>앞면 마크 : </strong> {drug?.MARK_CODE_FRONT ?? '-'}
                    </p>
                    <p>
                        <strong>뒷면 마크 : </strong> {drug?.MARK_CODE_BACK ?? '-'}
                    </p>
                    <p className="mb-1">
                        <strong>EDI 코드 : </strong> {drug?.EDI_CODE ?? '-'}
                    </p>
                    <p className="mb-1">
                        <strong>표준코드 : </strong> {drug.STD_CD ?? '-'}
                    </p>

                    <div className="mt-3 flex gap-4">
                        {drug.MARK_CODE_FRONT_IMG && (
                            <Image
                                src={drug.MARK_CODE_FRONT_IMG}
                                alt="앞면 마크 이미지"
                                className="h-20 w-20 rounded border object-contain"
                                width={100}
                                height={100}
                            />
                        )}
                        {drug.MARK_CODE_BACK_IMG && (
                            <Image
                                src={drug.MARK_CODE_BACK_IMG}
                                alt="뒷면 마크 이미지"
                                className="h-20 w-20 rounded border object-contain"
                            />
                        )}
                    </div>
                </section>

                <hr className="my-24 border-t border-gray-300" />

                <section className="mb-6">
                    <h2 className="mb-3 text-2xl font-bold">변경 / 등록 이력</h2>

                    <p className="mb-1">
                        <strong>이미지 등록일자 : </strong>{' '}
                        {tranformDateYYYYMMDD(drug?.IMG_REGIST_TS)}
                    </p>
                    <p className="mb-1">
                        <strong>변경일자 : </strong> {tranformDateYYYYMMDD(drug?.CHANGE_DATE)}
                    </p>
                </section>
            </div>
        </div>
    );
}
