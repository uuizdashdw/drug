import { atom } from 'jotai';

// 기본 UI 상태들
export const modalOpenAtom = atom(false);
export const filterAtom = atom<{ q: string; tag?: string }>({ q: '' });

// 파생 상태(읽기 전용)
export const hasQueryAtom = atom((get) => get(filterAtom).q.trim().length > 0);
