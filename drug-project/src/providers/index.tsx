'use client';

import ReactQueryProvider from './reactQuery';
// import ThemeProvider from './theme';  // 예: 테마/다크모드 관리 추가 시
// import ReduxProvider from './redux';  // 예: Redux 쓰는 경우

type Props = { children: React.ReactNode };

export default function Providers({ children }: Props) {
    return (
        <ReactQueryProvider>
            {/*
                향후 Provider를 추가하면 여기서 순서만 관리하면 됨.
                <ThemeProvider>
                <ReduxProvider> ... </ReduxProvider>
                </ThemeProvider>
      */}
            {children}
        </ReactQueryProvider>
    );
}
