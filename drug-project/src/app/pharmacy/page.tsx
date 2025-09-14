import { getPharmacyList } from '@/api/pharmacy';
import Pagination from '@/components/common/Pagination';
import PharmacyList from '@/components/pharmacy/PharmacyList';
import SearchHistroy from '@/components/search/SearchHistory';
import { PharmacyPageProps } from '@/types/pharmacy';

export default async function PharmacyPage({ searchParams }: PharmacyPageProps) {
    const param = searchParams;
    const pageNo = Number(param?.page ?? '1');

    const data = await getPharmacyList({
        serviceKey: process.env.SERVICE_API_KEY ?? '',
        pageNo: pageNo,
        numOfRows: 20,
    });

    return (
        <div>
            <SearchHistroy />

            <PharmacyList pharmacies={data?.response?.body?.items?.item} />
            <Pagination
                currentPage={pageNo}
                totalCount={data?.response?.body?.totalCount ?? 0}
                pageSize={12}
            />
        </div>
    );
}
