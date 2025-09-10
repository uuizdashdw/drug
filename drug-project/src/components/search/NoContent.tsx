import { NoContentProps } from '@/types/search';

export default function NoContent({ keyword }: NoContentProps) {
    return (
        <div className="mb-14 flex h-96 w-full items-center justify-center">
            <p>
                <strong>{keyword}</strong> 에 대한 검색 결과가 없습니다.
            </p>
        </div>
    );
}
