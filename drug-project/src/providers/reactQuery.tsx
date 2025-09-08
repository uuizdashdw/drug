'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

// 개발 환경에서만 로드
let Devtools: React.ComponentType | null = null;
if (process.env.NODE_ENV === 'development') {
    const { ReactQueryDevtools } = require('@tanstack/react-query-devtools');
    Devtools = (props) => <ReactQueryDevtools initialIsOpen={false} {...props} />;
}

type Props = { children: React.ReactNode };

export default function ReactQueryProvider({ children }: Props) {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        gcTime: 5 * 60 * 1000,
                        refetchOnWindowFocus: false,
                        retry: 1,
                    },
                    mutations: { retry: 0 },
                },
            }),
    );

    return (
        <QueryClientProvider client={client}>
            {children}
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}
