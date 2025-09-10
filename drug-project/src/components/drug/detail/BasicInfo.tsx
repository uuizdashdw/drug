import { BaiscInfoProps } from '@/types/drug';
import { transformDateYYYYMMDD } from '@/utils/transformDate';

export default function BasicInfo({ itemName, efcyQesitm, itemSeq, openDe }: BaiscInfoProps) {
    return (
        <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">기본 정보</h2>

            <p className="mb-1">
                <strong>제품명 : </strong>
                {itemName}
            </p>
            <p className="mb-1">
                <strong>효과 : </strong>
                {efcyQesitm}
            </p>
            <p className="mb-1">
                <strong>식약처 품목기준코드 : </strong>
                {itemSeq}
            </p>
            <p className="mb-1">
                <strong>허가일자 : </strong>
                {transformDateYYYYMMDD(openDe)}
            </p>
        </section>
    );
}
