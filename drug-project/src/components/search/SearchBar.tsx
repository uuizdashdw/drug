'use client';

import { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');

    const router = useRouter();

    // 검색어를 핸들링합니다
    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e?.target?.value);
    };

    const handleOnSearch = useCallback(() => {
        const q = searchValue.trim();
        if (!q) return; // 빈 검색어 방지
        router.push(`/search?q=${encodeURIComponent(q)}`);
    }, [searchValue]);

    return (
        <div className="mx-auto mb-14 flex w-8/12 items-center justify-center gap-10">
            <input
                type="text"
                name="search"
                placeholder="찾고자 하는 의약품을 검색해주세요!"
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
