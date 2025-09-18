import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off', // 👈 여기서 끄기
            '@typescript-eslint/no-unused-vars': 'off',
            'react-hooks/exhaustive-deps': 'off',
            '@next/next/no-img-element': 'off',
        },
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts',
            'src/__test__/**',
        ],
    },
    {
        files: [
            'src/__test__/**/*.{ts,tsx}', // ✅ 테스트 코드 전체
            '**/*.test.{ts,tsx}', // ✅ 혹시 다른 경로의 테스트도 커버
        ],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off', // ✅ 테스트에서는 any 허용
            '@next/next/no-img-element': 'off', // ✅ <img> 허용
            '@typescript-eslint/no-unused-vars': 'off', // ✅ 안 쓰는 변수 허용
        },
    },
];

export default eslintConfig;
