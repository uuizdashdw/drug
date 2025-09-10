'use client';

import { useSearchStore } from '@/store/zustand/searchKeyword';
import Link from 'next/link';

export default function SearchHistroy() {
    const { queries, addQuery } = useSearchStore();
    return (
        <div className="mx-auto mb-14 w-5/12">
            <ul className="flex gap-4">
                {queries?.map((keyword, index) => (
                    <li key={index} className="border-brand-100 rounded-md border px-3.5 py-1">
                        <Link href={`/search?q=${encodeURIComponent(keyword)}`}>
                            <p className="text-sm text-gray-500">{keyword}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
