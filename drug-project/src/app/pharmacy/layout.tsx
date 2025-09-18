import { PharmacyLayoutProps } from '@/types/pharmacy';

// Components
import SearchBar from '@/components/search/SearchBar';
import { Suspense } from 'react';

export default async function PharmacyLayout({ children }: PharmacyLayoutProps) {
    return (
        <main>
            <Suspense fallback={null}>
                <SearchBar type={'pharmacy'} />
            </Suspense>
            <>{children}</>
        </main>
    );
}
