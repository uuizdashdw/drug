'use client';

import Link from 'next/link';

// Types
import { PaginationProps } from '@/types/common';
import { useMemo } from 'react';

export default function Pagination({ currentPage, pageSize, totalCount }: PaginationProps) {
    const totalPages = useMemo(() => {
        return Math.ceil(totalCount / pageSize);
    }, [totalCount, pageSize]);

    if (totalPages <= 1) return null;

    // 한 번에 5페이지 버튼만 보여주고 싶을 때
    const pageRange = 12;
    const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const endPage = Math.min(startPage + pageRange - 1, totalPages);

    return (
        <nav className="mt-4 flex justify-center gap-4">
            {currentPage > 1 && (
                <Link href={`/?page=${currentPage - 1}`} className="rounded border px-3 py-1">
                    이전
                </Link>
            )}

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
                (page) => (
                    <Link
                        key={page}
                        href={`/?page=${page}`}
                        className={`rounded border px-3 py-1 ${
                            page === currentPage
                                ? 'bg-brand-300 text-white'
                                : 'bg-white text-gray-700'
                        }`}
                    >
                        {page}
                    </Link>
                ),
            )}

            {currentPage < totalPages && (
                <Link href={`/?page=${currentPage + 1}`} className="rounded border px-3 py-1">
                    다음
                </Link>
            )}
        </nav>
    );
}
