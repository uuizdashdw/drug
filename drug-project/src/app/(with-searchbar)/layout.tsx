import SearchBar from '@/components/search/SearchBar';
import React, { ReactNode } from 'react';

interface SearchLayoutProps {
    children: ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
    return (
        <div>
            <SearchBar />
            <div>{children}</div>
        </div>
    );
}
