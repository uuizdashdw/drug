'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQueryDevtools = dynamic(
    () => import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools),
    { ssr: false }, // 서버에서 렌더링 안 함
);

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
