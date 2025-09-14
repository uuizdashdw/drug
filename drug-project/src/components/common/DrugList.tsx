import { DrugListProps } from '@/types/drug';
import DrugItem from './DrugItem';

export default function DrugList({ drugs }: DrugListProps) {
    return (
        <div className="mb-32">
            <div className="grid grid-cols-5 justify-items-center gap-x-2 gap-y-8">
                {drugs?.map((item, idx) => (
                    <DrugItem drug={item} key={idx} />
                ))}
            </div>
        </div>
    );
}
