import SearchBar from '@/components/search/SearchBar';
import React, { ReactNode } from 'react';

interface SearchLayoutProps {
    children: ReactNode;
}

export default async function SearchLayout({ children }: SearchLayoutProps) {
    return (
        <main>
            <SearchBar type="drug" />
            <>{children}</>
        </main>
    );
}
