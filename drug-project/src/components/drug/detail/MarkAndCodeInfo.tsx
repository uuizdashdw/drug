import { MarkAndCodeInfoProps } from '@/types/drug';
import Image from 'next/image';

export default function MarkAndCodeInfo({
    markCodeFront,
    markCodeBack,
    ediCode,
    stdCd,
    markCodeFrontImage,
    markCodeBackImage,
}: MarkAndCodeInfoProps) {
    return (
        <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">마크 / 코드 정보</h2>

            <p className="mb-1">
                <strong>앞면 마크 : </strong> {markCodeFront ?? '-'}
            </p>
            <p>
                <strong>뒷면 마크 : </strong> {markCodeBack ?? '-'}
            </p>
            <p className="mb-1">
                <strong>EDI 코드 : </strong> {ediCode ?? '-'}
            </p>
            <p className="mb-1">
                <strong>표준코드 : </strong> {stdCd ?? '-'}
            </p>

            <div className="mt-3 flex gap-4">
                {markCodeFrontImage && (
                    <Image
                        src={markCodeFrontImage}
                        alt="앞면 마크 이미지"
                        className="h-20 w-20 rounded border object-contain"
                        width={100}
                        height={100}
                    />
                )}
                {markCodeBackImage && (
                    <Image
                        src={markCodeBackImage}
                        alt="뒷면 마크 이미지"
                        className="h-20 w-20 rounded border object-contain"
                    />
                )}
            </div>
        </section>
    );
}
