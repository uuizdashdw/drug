import { ChangeOrRegistrationHistoryProps } from '@/types/drug';
import { tranformDateYYYYMMDD } from '@/utils/transformDate';

export default function ChangeOrRegistrationHistory({
    imageRegistTs,
    changeDate,
}: ChangeOrRegistrationHistoryProps) {
    return (
        <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">변경 / 등록 이력</h2>

            <p className="mb-1">
                <strong>이미지 등록일자 : </strong> {tranformDateYYYYMMDD(imageRegistTs)}
            </p>
            <p className="mb-1">
                <strong>변경일자 : </strong> {tranformDateYYYYMMDD(changeDate)}
            </p>
        </section>
    );
}
