'use client';

import { DrugListProps } from '@/types/drug';
import DrugItem from './DrugItem';

export default function DrugList({ drugs }: DrugListProps) {
    return (
        <div className="mb-32">
            <div className="grid grid-cols-3 gap-32">
                {drugs?.map((item, idx) => (
                    <DrugItem drug={item} key={idx} />
                ))}
            </div>
        </div>
    );
}
