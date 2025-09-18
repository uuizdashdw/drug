import { getPharmacyList } from '@/api/pharmacy';
import ListSkeleton from '@/components/common/ListSkeleton';
import Pagination from '@/components/common/Pagination';
import PharmacyList from '@/components/pharmacy/PharmacyList';
import NoContent from '@/components/search/NoContent';
import SearchHistroy from '@/components/search/SearchHistory';
import SearchPharmacyList from '@/components/search/SearchPharmacyList';
import SearchResultGuide from '@/components/search/SearchResultGuide';
import { SearchPharmacyPageProps } from '@/types/search';

export default async function PharmacySearchPage({ searchParams }: SearchPharmacyPageProps) {
    const param = await searchParams;
    const keyword = param?.q;
    const pageNo = Number(param?.pageNo ?? 1);

    // const data = await getPharmacyList({
    //     serviceKey: process.env.SERVICE_API_KEY ?? '',
    //     yadmNm: keyword,
    //     pageNo: Number(pageNo),
    //     numOfRows: 20,
    // });

    return (
        <div className="container">
            <SearchHistroy />
            <SearchPharmacyList itemName={keyword} pageNo={pageNo} />

            {/* {Array.isArray(data?.response?.body?.items?.item) &&
                data?.response?.body?.items?.item?.length > 0 && (
                    <>
                        {keyword && (
                            <SearchResultGuide
                                itemName={keyword}
                                length={data?.response?.body?.items?.item?.length}
                            />
                        )}
                        <PharmacyList pharmacies={data.response?.body?.items?.item || []} />
                    </>
                )}

            {!Array.isArray(data?.response?.body?.items?.item) && <NoContent keyword={keyword} />}

            {Array.isArray(data?.response?.body?.items?.item) &&
                data?.response?.body?.items?.item?.length > 0 && (
                    <Pagination
                        currentPage={Number(pageNo)}
                        totalCount={data?.response?.body?.totalCount ?? 0}
                        pageSize={12}
                    />
                )} */}
        </div>
    );
}
