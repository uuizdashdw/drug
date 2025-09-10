'use client';

import { useEffect, useState } from 'react';

// Types
import { DrugItemProps } from '@/types/drug';

// Components
import Image from 'next/image';
import Link from 'next/link';

export default function DrugItem({ drug }: DrugItemProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [drug?.ITEM_SEQ]);

    return (
        <Link href={`/drug/${drug?.ITEM_SEQ}`} className="flex w-80 flex-col items-center">
            <div className="relative h-40 w-72">
                <Image
                    key={drug?.ITEM_SEQ}
                    src={drug?.ITEM_IMAGE}
                    alt={drug?.ITEM_NAME}
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
                    {drug?.ITEM_NAME}
                </p>
            )}
        </Link>
    );
}
