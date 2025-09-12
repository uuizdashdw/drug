'use client';

import Link from 'next/link';

// Zustand
import { useSearchStore } from '@/store/zustand/searchKeyword';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

export default function SearchHistroy() {
    const { queries, removeQuery } = useSearchStore();
    const pathName = usePathname();

    const getHref = useCallback(
        (keyword: string) => {
            if (pathName === '/search') {
                return `/search?q=${encodeURIComponent(keyword)}`;
            }

            return `/search/pharmacy?q=${encodeURIComponent(keyword)}&pageNo=${1}`;
        },
        [pathName],
    );

    return (
        <div className="mx-auto mb-6 w-6/12">
            <ul className="flex flex-wrap items-center justify-center gap-4 px-4">
                {queries?.map((keyword, index) => (
                    <li key={index} className="flex items-center gap-1">
                        <div className="border-brand-100 rounded-md border px-3.5 py-1">
                            <Link href={getHref(keyword)}>
                                <p className="text-sm text-gray-500">{keyword}</p>
                            </Link>
                        </div>

                        <button
                            className="flex h-6 w-6 cursor-pointer items-start justify-center"
                            onClick={() => removeQuery(keyword)}
                        >
                            <div className="">x</div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
