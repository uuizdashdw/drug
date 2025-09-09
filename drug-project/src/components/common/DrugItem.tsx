'use client';

import { DrugItemProps } from '@/types/drug';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function DrugItem({ drug }: DrugItemProps) {
    useEffect(() => {
        console.log('## 약물 상세 :: ', drug);
    }, [drug]);
    return (
        <Link href={`/drug/${drug?.ITEM_SEQ}`} className="flex flex-col items-center">
            <Image
                src={drug?.ITEM_IMAGE}
                alt={drug?.ITEM_IMAGE}
                width={300}
                height={500}
                className="mb-3"
                loading="lazy"
            />
            <p className="text-sm text-stone-950">{drug?.ITEM_NAME}</p>
        </Link>
    );
}
