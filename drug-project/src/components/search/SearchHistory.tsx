'use client';

import Link from 'next/link';

// Zustand
import { useSearchStore } from '@/store/zustand/searchKeyword';

export default function SearchHistroy() {
    const { queries } = useSearchStore();
    return (
        <div className="mx-auto mb-6 w-5/12">
            <ul className="flex flex-wrap items-center gap-4 px-4">
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
