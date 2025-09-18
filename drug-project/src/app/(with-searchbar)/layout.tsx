import SearchBar from '@/components/search/SearchBar';
import React, { ReactNode, Suspense } from 'react';

interface SearchLayoutProps {
    children: ReactNode;
}

export default async function SearchLayout({ children }: SearchLayoutProps) {
    return (
        <main>
            <Suspense fallback={null}>
                <SearchBar type="drug" />
            </Suspense>
            <>{children}</>
        </main>
    );
}
