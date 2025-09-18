'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useSearchStore } from '@/store/zustand/searchKeyword';
import { SearchBarProps } from '@/types/common';

export default function SearchBar({ type }: SearchBarProps) {
    const { addQuery } = useSearchStore();
    const [searchValue, setSearchValue] = useState('');

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const typeName = useMemo(() => {
        return type === 'pharmacy' ? '약국' : '의약품';
    }, [type]);

    // 검색어를 핸들링합니다
    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e?.target?.value);
    };

    const handleOnSearch = useCallback(() => {
        const q = searchValue.trim();

        if (!q) return; // 빈 검색어 방지

        addQuery(q);

        if (pathName === '/search' || pathName === '/') {
            router.push(`/search?q=${encodeURIComponent(q)}`);
        } else {
            router.push(`/search/pharmacy?q=${encodeURIComponent(q)}&pageNo=1`);
        }
    }, [searchValue]);

    useEffect(() => {
        if (!searchValue?.trim()) return;
        const q = searchValue?.trim();

        if (pathName === 'search' || pathName === '/') {
            router.prefetch(`/search?q=${encodeURIComponent(q)}`);
        } else {
            router.prefetch(`/search/pharmacy?q=${encodeURIComponent(q)}&pageNo=1`);
        }
    }, [searchValue, pathName]);

    useEffect(() => {
        const q = searchParams.get('q') ?? '';
        setSearchValue(q);
    }, [searchParams]);

    return (
        <div className="mx-auto mb-4 flex w-8/12 items-center justify-center gap-10">
            <input
                type="text"
                name="search"
                placeholder={`찾고자 하는 ${typeName}을 검색해주세요!`}
                value={searchValue}
                onChange={onChangeSearchValue}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key !== 'Enter') return;
                    handleOnSearch();
                }}
                className="border-brand-300 w-6/12 rounded-sm border-2 outline-0 focus:ring-0 focus:outline-none"
            />
            <button
                className="bg-brand-300 cursor-pointer rounded-sm px-5 py-2.5 font-bold text-white"
                onClick={handleOnSearch}
            >
                검색
            </button>
        </div>
    );
}
