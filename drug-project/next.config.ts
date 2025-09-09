import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: ['nedrug.mfds.go.kr'], // 허용할 외부 이미지 도메인 추가
    },
};

export default nextConfig;
