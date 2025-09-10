'use client';

import { DrugListProps } from '@/types/drug';
import DrugItem from './DrugItem';
import { useEffect } from 'react';

export default function DrugList({ drugs }: DrugListProps) {
    useEffect(() => {
        console.log('## 약물 :: ', drugs);
    }, [drugs]);
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
