import { PharmBaiscInfoProps } from '@/types/pharmacy';

export default function PharmBaiscInfo({ address, telNumber, postNumber }: PharmBaiscInfoProps) {
    return (
        <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">약국 정보</h2>

            <p className="mb-1">
                <strong>주소 : </strong> {address}
            </p>
            <p className="mb-1">
                <strong>우편번호 : </strong> {postNumber}
            </p>
            <p className="mb-1">
                <strong>전화번호 : </strong> {telNumber}
            </p>
        </section>
    );
}
