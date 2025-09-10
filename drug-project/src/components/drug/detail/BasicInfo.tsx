import { BaiscInfoProps } from '@/types/drug';
import { tranformDateYYYYMMDD } from '@/utils/transformDate';

export default function BasicInfo({
    itemName,
    className,
    classNo,
    etcOtcName,
    itemPermitDate,
}: BaiscInfoProps) {
    return (
        <section className="mb-6">
            <h2 className="mb-2 text-2xl font-bold">기본 정보</h2>
            <p className="mb-1">
                <strong>제품명 : </strong>
                {itemName}
            </p>
            <p className="mb-1">
                <strong>약효 분류 : </strong>
                {className}
            </p>
            <p className="mb-1">
                <strong>약효 고유 번호 : </strong>
                {classNo}
            </p>
            <p className="mb-1">
                <strong>전문/일반 구분 : </strong>
                {etcOtcName}
            </p>
            <p className="mb-1">
                <strong>허가일자 : </strong>
                {tranformDateYYYYMMDD(itemPermitDate)}
            </p>
        </section>
    );
}
