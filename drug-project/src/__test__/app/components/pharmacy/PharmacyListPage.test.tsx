import { render, screen } from '@testing-library/react';
import PharmacyListPage from '@/components/pharmacy/PharmacyListPage';

// 👉 usePharmacyList 훅 모킹
jest.mock('@/hooks/usePharmacyList', () => ({
    usePharmacyList: jest.fn(),
}));

// 👉 하위 컴포넌트 모킹
jest.mock('@/components/pharmacy/PharmacyList', () => {
    const MockPharmacyList = ({ pharmacies }: { pharmacies: any[] }) => (
        <div data-testid="mock-pharmacy-list">{`PharmacyList length=${pharmacies.length}`}</div>
    );
    MockPharmacyList.displayName = 'MockPharmacyList';
    return { __esModule: true, default: MockPharmacyList };
});

jest.mock('@/components/common/Pagination', () => {
    const MockPagination = ({
        currentPage,
        totalCount,
    }: {
        currentPage: number;
        totalCount: number;
    }) => (
        <div data-testid="mock-pagination">{`Pagination currentPage=${currentPage}, totalCount=${totalCount}`}</div>
    );
    MockPagination.displayName = 'MockPagination';
    return { __esModule: true, default: MockPagination };
});

jest.mock('@/components/search/NoContent', () => {
    const Mock = ({ keyword }: { keyword: string }) => (
        <div data-testid="no-content">{`no result: ${keyword}`}</div>
    );
    Mock.displayName = 'NoContent';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/Loading', () => {
    const MockLoading = () => <div data-testid="mock-loading">Loading...</div>;
    MockLoading.displayName = 'MockLoading';
    return { __esModule: true, default: MockLoading };
});

jest.mock('@/components/common/ErrorModal', () => {
    const MockErrorModal = () => <div data-testid="mock-errormodal">ErrorModal</div>;
    MockErrorModal.displayName = 'MockErrorModal';
    return { __esModule: true, default: MockErrorModal };
});

// zustand store 모킹 (open 함수만)
jest.mock('@/store/zustand/common/errorModalState', () => ({
    useErrorModalStore: () => ({ open: jest.fn() }),
}));

// 모킹된 훅 불러오기
import { usePharmacyList } from '@/hooks/usePharmacyList';
const mockedUsePharmacyList = usePharmacyList as jest.Mock;

describe('PharmacyListPage', () => {
    it('약국 데이터가 있으면 리스트와 페이지네이션을 렌더링한다', () => {
        mockedUsePharmacyList.mockReturnValue({
            data: {
                response: {
                    body: {
                        items: { item: [{ id: 1 }, { id: 2 }] },
                        totalCount: 2,
                    },
                },
            },
            isLoading: false,
            isError: false,
            error: null,
        });

        render(<PharmacyListPage pageNo={1} />);

        expect(screen.getByTestId('mock-pharmacy-list')).toHaveTextContent('length=2');
        expect(screen.getByTestId('mock-pagination')).toHaveTextContent('currentPage=1');
    });

    it('약국 데이터가 없으면 NoContent를 렌더링한다', () => {
        mockedUsePharmacyList.mockReturnValue({
            data: {
                response: {
                    body: {
                        items: { item: [] },
                        totalCount: 0,
                    },
                },
            },
            isLoading: false,
            isError: false,
            error: null,
        });

        render(<PharmacyListPage pageNo={1} />);

        expect(screen.getByTestId('no-content')).toBeInTheDocument();
    });

    it('로딩 중이면 LoadingModal을 보여준다', () => {
        mockedUsePharmacyList.mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
            error: null,
        });

        render(<PharmacyListPage pageNo={1} />);

        expect(screen.getByTestId('mock-loading')).toBeInTheDocument();
    });

    it('에러 발생 시 ErrorModal을 렌더링한다', () => {
        mockedUsePharmacyList.mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
            error: new Error('에러 발생'),
        });

        render(<PharmacyListPage pageNo={1} />);

        expect(screen.getByTestId('mock-errormodal')).toBeInTheDocument();
    });
});
