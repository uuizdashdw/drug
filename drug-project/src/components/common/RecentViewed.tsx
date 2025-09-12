'use client';

import { useSearchStore } from '@/store/zustand/searchKeyword';
import Link from 'next/link';
import { useEffect } from 'react';

export default function RecentViewed() {
    const { recentItems, clearItems } = useSearchStore();

    useEffect(() => {
        console.log('## 최근 아이템 :: ', recentItems);
    }, [recentItems]); // ✅ 항상 호출됨

    if (!recentItems || recentItems.length === 0) {
        return null; // ✅ 렌더링만 조건부로
    }

    return (
        <div className="border-brand-300 fixed right-16 bottom-16 w-48 rounded-lg border-2 bg-white p-4 shadow-lg">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-bold">최근 본 아이템</h3>

                <button
                    onClick={clearItems}
                    className="hover:text-brand-500 cursor-pointer text-xs text-gray-500"
                >
                    전체 지우기
                </button>
            </div>

            <ul className="max-h-60 space-y-2 overflow-y-auto">
                {recentItems?.reverse()?.map((item, idx) => (
                    <li key={idx} className="text-sm">
                        {item.type === 'pharmacy' ? (
                            <Link href={`/pharmacy/${item.ykiho}`} className="hover:text-brand-500">
                                🏥 {item.yadmNm}
                            </Link>
                        ) : (
                            <Link href={`/drug/${item?.itemSeq}`} className="hover:text-brand-500">
                                💊 {item?.itemName}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
