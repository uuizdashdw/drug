import { DrugItemType } from '@/types/drug';
import { create } from 'zustand';

type DrugListStore = {
    drugs: DrugItemType[];
    totalCount: number;
    setDrugs: (items: DrugItemType[], total: number) => void;
    clear: () => void;
};

export const useDrugListStore = create<DrugListStore>((set) => ({
    drugs: [],
    totalCount: 0,
    setDrugs: (items, total) => set({ drugs: items, totalCount: total }),
    clear: () => set({ drugs: [], totalCount: 0 }),
}));
