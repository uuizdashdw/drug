import { ClassificationProps } from '@/types/drug';

export default function Classification({ efcyQesitm }: ClassificationProps) {
    return (
        <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">사용 구분</h2>

            <div>
                <p>{efcyQesitm}</p>
            </div>
        </section>
    );
}
