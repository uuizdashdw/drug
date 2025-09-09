import React, { ReactNode } from 'react';

interface SearchLayoutProps {
    children: ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
    return (
        <div>
            <div>서치바 부분</div>

            <div>{children}</div>
        </div>
    );
}
