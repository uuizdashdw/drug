import { PharmacyListProps } from '@/types/pharmacy';
import PharmacyItem from './PharmacyItem';
import ListSkeleton from '../common/ListSkeleton';

export default function PharmacyList({ pharmacies }: PharmacyListProps) {
    return (
        <div className="mb-32">
            <ul className="grid grid-cols-5 justify-items-center gap-x-2 gap-y-8">
                {pharmacies.length > 0 &&
                    pharmacies?.map((item, idx) => <PharmacyItem key={idx} item={item} />)}

                {/* {pharmacies.length === 0 && <ListSkeleton />} */}
            </ul>
        </div>
    );
}
