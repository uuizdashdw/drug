import { ExteriorInfoProps } from '@/types/drug';
import Image from 'next/image';

export default function ExteriorInfo({
    itemImage,
    itemName,
    chart,
    drugShape,
    colorClass1,
    colorClass2,
    printFront,
    printBack,
    longLength,
    shortLength,
    thick,
}: ExteriorInfoProps) {
    return (
        <section className="mb-6">
            <h2 className="mb-3 text-2xl font-bold">외형 정보</h2>

            <div className="mb-4 flex flex-col items-center">
                <Image
                    src={itemImage}
                    alt={itemName}
                    width={100}
                    height={100}
                    className="h-auto w-48 rounded shadow"
                />

                <p className="mt-2 text-sm text-gray-500">{chart}</p>
            </div>

            <p className="mb-1">
                <strong>모양 :</strong> {drugShape}
            </p>
            <p className="mb-1">
                <strong>색상 :</strong> {colorClass1} {colorClass2 ?? ''}
            </p>
            <p className="mb-1">
                <strong>각인 :</strong> 앞면 {printFront} / 뒷면 {printBack}
            </p>
            <p className="mb-1">
                <strong>분할선 :</strong> 앞면 {printFront ?? '-'} / 뒷면 {printBack ?? '-'}
            </p>
            <p className="mb-1">
                <strong>크기 :</strong> 길이 {longLength}mm × {shortLength}mm, 두께 {thick}mm
            </p>
        </section>
    );
}
