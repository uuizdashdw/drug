// API
import { getMedicineList } from '@/api/drugs';

// Components
import DrugList from '@/components/common/DrugList';
import Pagination from '@/components/common/Pagination';

// Types
import { MedicineListParams } from '@/types/api';
import { HomeProps } from '@/types/home';

export default async function Home({ searchParams }: HomeProps) {
    const pageNo = Number(searchParams?.page ?? '1');

    const params: MedicineListParams = {
        serviceKey: process.env?.DRUG_API_KEY ?? '',
        numOfRows: 12,
        pageNo: pageNo,
        Prduct: '',
        type: 'json',
    };
    const data = await getMedicineList(params);
    console.log('## 데이터 :: ', data);

    return (
        <div>
            <DrugList drugs={data.body?.items} />
            <Pagination
                currentPage={pageNo}
                totalCount={data.body?.totalCount ?? 0}
                pageSize={12}
            />
        </div>
    );
}
