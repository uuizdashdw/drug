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
        <div>
            <input
                type="text"
                placeholder="찾고자 하는 의약품을 검색해주세요!"
                value={searchValue}
                onChange={onChangeSearchValue}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key !== 'Enter') return;
                    handleOnSearch();
                }}
            />
            <button onClick={handleOnSearch}>검색</button>
        </div>
    );
}
