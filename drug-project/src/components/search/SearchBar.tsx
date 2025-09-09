'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');

    const router = useRouter();

    // 검색어를 핸들링합니다
    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e?.target?.value);
    };

    // 검색어를 기반으로 검색합니다
    const handleOnSubmit = () => {
        router.push(`/search?q=${searchValue}`);
    };

    return (
        <div>
            <input type="text" value={searchValue} onChange={onChangeSearchValue} />
            <button onClick={handleOnSubmit}>검색</button>
        </div>
    );
}
