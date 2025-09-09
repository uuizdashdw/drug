'use client';

import { DrugListProps } from '@/types/drug';
import { useEffect } from 'react';
import DrugItem from './DrugItem';

export default function DrugList({ drugs }: DrugListProps) {
    useEffect(() => {
        console.log('## 약물 :: ', drugs);
    }, [drugs]);
    return (
        <div className="grid grid-cols-3 gap-32">
            {drugs?.map((item, idx) => (
                <DrugItem drug={item} key={idx} />
            ))}
        </div>
    );
}
