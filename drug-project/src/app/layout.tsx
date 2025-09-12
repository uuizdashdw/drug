import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_KR } from 'next/font/google';
import './globals.css';

// 프로바이더 모음
import Providers from '@/providers';

// Components
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
    title: '이약저약',
    description: '궁금한 약을 검색해보세요!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${notoSansKr.variable} container antialiased`}>
                <Header />
                <Providers>{children}</Providers>
                <Footer />
            </body>
        </html>
    );
}
