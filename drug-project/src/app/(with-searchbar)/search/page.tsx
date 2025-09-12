import { getMedicineList } from '@/api/drugs';
import DrugList from '@/components/common/DrugList';
import Pagination from '@/components/common/Pagination';
import NoContent from '@/components/search/NoContent';
import SearchHistroy from '@/components/search/SearchHistory';
import SearchResultGuide from '@/components/search/SearchResultGuide';

import { SearchPageProps } from '@/types/search';

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const param = await searchParams;
    const itemName = param?.q ?? '';
    const pageNo = Number(param?.page ?? '1');

    const data = await getMedicineList({
        serviceKey: process.env.SERVICE_API_KEY ?? '',
        itemName: itemName,
        numOfRows: 12,
        pageNo: pageNo,
        type: 'json',
    });

    console.log(' ??? ', data.body?.items);

    return (
        <div className="container">
            <SearchHistroy />

            {Array.isArray(data.body?.items) && data.body?.items?.length > 0 && (
                <>
                    <SearchResultGuide itemName={itemName} length={data.body?.items?.length} />
                    <DrugList drugs={data.body?.items} />
                </>
            )}

            {(!Array.isArray(data.body?.items) || data?.body?.items?.length === 0) && (
                <NoContent keyword={itemName} />
            )}

            <Pagination
                currentPage={pageNo}
                totalCount={data.body?.totalCount ?? 0}
                pageSize={12}
            />
        </div>
    );
}
