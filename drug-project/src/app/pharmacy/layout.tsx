import { PharmacyLayoutProps } from '@/types/pharmacy';

// Components
import SearchBar from '@/components/search/SearchBar';

export default async function PharmacyLayout({ children }: PharmacyLayoutProps) {
    return (
        <main>
            <SearchBar type={'pharmacy'} />
            <>{children}</>
        </main>
    );
}
