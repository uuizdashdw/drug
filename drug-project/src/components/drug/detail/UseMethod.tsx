import { UseMethodProps } from '@/types/drug';

export default function UseMethod({ useMethodQesitm }: UseMethodProps) {
    return (
        <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">사용 방법</h2>

            <div>
                <p>{useMethodQesitm}</p>
            </div>
        </section>
    );
}
