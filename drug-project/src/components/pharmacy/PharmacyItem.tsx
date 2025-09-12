'use client';

import { PharmacyItemProps } from '@/types/pharmacy';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PharmacyItem({ item }: PharmacyItemProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('## ddddd ', item);
        setLoading(true);
    }, [item?.dutyName]);
    return (
        <Link
            href={`/pharmacy/${encodeURIComponent(JSON.stringify(item))}`}
            className="flex w-80 flex-col items-center"
        >
            <div className="relative h-40 w-72">
                <Image
                    key={item?.dutyName}
                    src={'/images/no_image.png'}
                    alt={item?.dutyName}
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
                    {item?.dutyName}
                </p>
            )}
        </Link>
    );
}
