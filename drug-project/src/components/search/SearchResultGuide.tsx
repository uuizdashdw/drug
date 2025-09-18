// Types
import { SearchResultGuideProps } from '@/types/common';

export default function SearchResultGuide({ itemName, totalCount }: SearchResultGuideProps) {
    return (
        <div className="mb-8 px-6">
            <p>
                <strong>{itemName}</strong> 에 대한 검색 결과 : <strong>{totalCount}</strong> 개
            </p>
        </div>
    );
}
