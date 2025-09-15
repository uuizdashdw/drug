import { DrugItemType } from '@/types/drug';
import { PharmacyItem } from '@/types/pharmacy';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type RecentItem = (PharmacyItem & { type: 'pharmacy' }) | (DrugItemType & { type: 'drug' });

type SearchStore = {
    queries: string[];
    addQuery: (q: string) => void;
    removeQuery: (q: string) => void;
    clearQueries: () => void;

    recentItems: RecentItem[];
    addItem: (item: RecentItem) => void;
    clearItems: () => void;
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
                set({ queries: updated.slice(0, 4) });
            },
            removeQuery: (q) => {
                const prev = get().queries;
                const updated = prev?.filter((item) => item !== q);
                set({ queries: updated });
            },
            clearQueries: () => set({ queries: [] }),

            recentItems: [],
            addItem: (item) => {
                const prev = get().recentItems;

                // 중복 제거 기준: type + 주요 키값 (약국이면 yadmNm, 약품이면 ITEM_SEQ)
                const updated = [
                    item,
                    ...prev.filter((i) => {
                        if (i.type === 'pharmacy' && item.type === 'pharmacy') {
                            return i.yadmNm !== item.yadmNm;
                        }
                        if (i.type === 'drug' && item.type === 'drug') {
                            return i.itemSeq !== item.itemSeq;
                        }
                        return true;
                    }),
                ];

                // 최대 3개 유지
                set({ recentItems: updated.slice(0, 3) });
            },
            clearItems: () => set({ recentItems: [] }),
        }),

        { name: 'search-history-storage' },
    ),
);
