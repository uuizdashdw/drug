import { getMedicineList } from '@/api/drugs';
import DrugList from '@/components/common/DrugList';
import { MedicineListParams } from '@/types/api';

export default async function Home() {
    const params: MedicineListParams = {
        serviceKey: process.env?.DRUG_API_KEY ?? '',
        numOfRows: 12,
        pageNo: 1,
        Prduct: '',
        type: 'json',
    };
    const data = await getMedicineList(params);

    console.log('## 데이터 :: ', data);

    // const data = await fetchDrugs('');
    return (
        <div>
            <DrugList drugs={data.body?.items} />
        </div>
    );
}
