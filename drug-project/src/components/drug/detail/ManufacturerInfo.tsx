import { ManufacturerInfoProps } from '@/types/drug';

export default function ManufacturerInfo({ entpName, bizrNo, entpSeq }: ManufacturerInfoProps) {
    return (
        <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">제조사 정보</h2>

            <p className="mb-1">
                <strong>업체명 : </strong>
                {entpName}
            </p>
            <p className="mb-1">
                <strong>사업자등록번호 : </strong> {bizrNo}
            </p>
            <p className="mb-1">
                <strong>업체 코드 : </strong>
                {entpSeq}
            </p>
        </section>
    );
}
