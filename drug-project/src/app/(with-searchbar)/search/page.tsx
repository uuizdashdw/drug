interface SearchPageProps {
    searchParams: Promise<{ q: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;

    // console.log('## 쿼리 스트링 :: ', q);
    return <div className="container">서치 페이지 : {q}</div>;
}
