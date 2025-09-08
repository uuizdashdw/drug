import { atomWithStorage } from 'jotai/utils';

// atomWithStorage는 클라이언트에서만 저장소에 접근하며,
// SSR 시엔 초기값이 쓰이고, 하이드레이션 후 동기화.
export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light');
