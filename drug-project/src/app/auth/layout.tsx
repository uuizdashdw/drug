import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main>
            로그인/회원가입 레이아웃
            <>{children}</>
        </main>
    );
}
