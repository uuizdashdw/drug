import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SearchStore = {
    queries: string[];
    addQuery: (q: string) => void;
    clearQueries: () => void;
};

export const useSearchStore = create<SearchStore>()(
    persist(
        (set, get) => ({
            queries: [],
            addQuery: (q) => {
                if (!q) return;
                const prev = get().queries;

                // 중복 제거 + 맨 앞에 추가
                const updated = [q, ...prev.filter((item) => item !== q)];

                // 최대 5개만 유지 (앞에서부터 채우고, 뒤는 잘라냄)
                set({ queries: updated.slice(0, 5) });
            },
            clearQueries: () => set({ queries: [] }),
        }),
        { name: 'search-history-storage' },
    ),
);
