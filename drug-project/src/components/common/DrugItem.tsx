'use client';

import { useEffect, useState } from 'react';

// Types
import { DrugItemProps } from '@/types/drug';

// Components
import Image from 'next/image';
import Link from 'next/link';
import { useSearchStore } from '@/store/zustand/searchKeyword';

export default function DrugItem({ drug }: DrugItemProps) {
    const [loading, setLoading] = useState(true);

    const { addItem } = useSearchStore();

    useEffect(() => {
        setLoading(true);
    }, [drug?.itemSeq]);

    return (
        <Link
            href={`/drug/${drug?.itemSeq}`}
            className="flex w-80 flex-col items-center"
            onClick={() => addItem({ ...drug, type: 'drug' })}
        >
            <div className="relative h-40 w-72">
                <Image
                    key={drug?.itemSeq}
                    src={drug?.itemImage ?? '/images/no_image.png'}
                    alt={drug?.itemName}
                    sizes=""
                    fill
                    className={`rounded-md object-contain transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setLoading(false)}
                    // unoptimized
                />
            </div>
            {!loading && (
                <p
                    className={`mt-2 w-72 truncate text-center text-sm text-stone-950 transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
                >
                    {drug?.itemName}
                </p>
            )}
        </Link>
    );
}
