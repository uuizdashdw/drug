import { PharmacyListProps } from '@/types/pharmacy';
import PharmacyItem from './PharmacyItem';

export default function PharmacyList({ pharmacies }: PharmacyListProps) {
    return (
        <div className="mb-32">
            <ul className="grid grid-cols-5 justify-items-center gap-x-2 gap-y-8">
                {pharmacies?.map((item, idx) => (
                    <PharmacyItem key={idx} item={item} />
                ))}
            </ul>
        </div>
    );
}
