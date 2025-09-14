// API
import { getMedicineList } from '@/api/drugs';

// Components
import DrugList from '@/components/common/DrugList';
import Pagination from '@/components/common/Pagination';
import SearchHistroy from '@/components/search/SearchHistory';

// Types
import { MedicineListParams } from '@/types/api';
import { HomeProps } from '@/types/home';

export default async function Home({ searchParams }: HomeProps) {
    const pageNo = Number(searchParams?.page ?? '1');

    const data = await getMedicineList({
        serviceKey: process.env.SERVICE_API_KEY ?? '',
        itemName: '',
        numOfRows: 20,
        pageNo: pageNo,
        type: 'json',
    });

    return (
        <div>
            <SearchHistroy />

            <DrugList drugs={data.body?.items} />
            <Pagination
                currentPage={pageNo}
                totalCount={data.body?.totalCount ?? 0}
                pageSize={12}
            />
        </div>
    );
}
