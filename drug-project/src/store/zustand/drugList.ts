import { DrugItem } from '@/types/drug';
import { create } from 'zustand';

type DrugListStore = {
    drugs: DrugItem[];
    totalCount: number;
    setDrugs: (items: DrugItem[], total: number) => void;
    clear: () => void;
};

export const useDrugListStore = create<DrugListStore>((set) => ({
    drugs: [],
    totalCount: 0,
    setDrugs: (items, total) => set({ drugs: items, totalCount: total }),
    clear: () => set({ drugs: [], totalCount: 0 }),
}));
