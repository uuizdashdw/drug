import { CautionProps } from '@/types/drug';

export default function Caution({ atpnQesitm, seQesitm, intrcQesitm }: CautionProps) {
    return (
        <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">주의 사항</h2>

            <div>
                <p className="mb-3">{intrcQesitm}</p>
                <p className="mb-3">{seQesitm}</p>
                <p>{atpnQesitm}</p>
            </div>
        </section>
    );
}
