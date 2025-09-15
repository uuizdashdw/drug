'use client';

import ReactQueryProvider from './reactQuery';

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
