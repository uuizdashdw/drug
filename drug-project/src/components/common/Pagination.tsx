'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

// Zustand
import { useSearchStore } from '@/store/zustand/searchKeyword';

// Types
import { PaginationProps } from '@/types/common';

export default function Pagination({ currentPage, pageSize, totalCount }: PaginationProps) {
    const { queries } = useSearchStore();
    const totalPages = useMemo(() => Math.ceil(totalCount / pageSize), [totalCount, pageSize]);

    const pathName = usePathname();
    if (totalPages <= 1) return null;

    const pageRange = 12;
    const startPage = useMemo(
        () => Math.floor((currentPage - 1) / pageRange) * pageRange + 1,
        [currentPage, pageRange],
    );
    const endPage = useMemo(
        () => Math.min(startPage + pageRange - 1, totalPages),
        [startPage, pageRange, totalPages],
    );

    return (
        <nav className="mt-4 flex justify-center gap-4" data-testid="pagination">
            {currentPage > 1 && (
                <Link
                    data-testid="prev-button"
                    href={`/?page=${currentPage - 1}`}
                    className="rounded border px-3 py-1"
                >
                    이전
                </Link>
            )}

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
                (page, idx) => {
                    const href = `${pathName}?page=${page}${
                        pathName === '/search' ? `&Prduct=${encodeURIComponent(queries[idx])}` : ''
                    }`;
                    return (
                        <Link
                            data-testid={`page-button-${page}`}
                            key={page}
                            href={href}
                            className={`rounded border px-3 py-1 ${
                                page === currentPage
                                    ? 'bg-brand-300 text-white'
                                    : 'bg-white text-gray-700'
                            }`}
                        >
                            {page}
                        </Link>
                    );
                },
            )}

            {currentPage < totalPages && (
                <Link
                    data-testid="next-button"
                    href={`/?page=${currentPage + 1}`}
                    className="rounded border px-3 py-1"
                >
                    다음
                </Link>
            )}
        </nav>
    );
}
