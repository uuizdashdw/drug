'use client';

import { ImageAndItemProps } from '@/types/drug';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImageAndItem({ itemName, itemImage }: ImageAndItemProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!itemName) return;
        setLoading(false);
    }, [itemName]);

    return (
        <>
            <h1 className="mb-16 text-center text-3xl font-bold">{itemName}</h1>

            <div className="mb-20 flex justify-center">
                <Image
                    src={itemImage ?? '/images/no_image.png'}
                    alt={itemName}
                    width={500}
                    height={500}
                    sizes="80vw" // 뷰포트 너비 기준으로 반응
                    className={`h-auto w-2xl rounded-md object-contain transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
                    loading="lazy"
                />
            </div>
        </>
    );
}
