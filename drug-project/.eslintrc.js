module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json'], // 필요 없으면 지워도 됨(성능 ↑)
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'jest',
        'testing-library',
        'import',
        'prettier',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jest/recommended',
        'plugin:testing-library/react',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'next/core-web-vitals', // Next.js 권장 셋
        'plugin:prettier/recommended', // + eslint-config-prettier
    ],
    settings: {
        react: { version: 'detect' },
        'import/resolver': {
            typescript: {}, // tsconfig paths 지원
        },
    },
    rules: {
        // Prettier를 오류로 승격 (포맷 불일치 즉시 발견)
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'react-hooks/exhaustive-deps': 'off',

        // 타입스크립트에서 any 허용 범위 조정 등(팀 정책에 맞게)
        '@typescript-eslint/no-explicit-any': 'off',

        // import 순서/정리 원하면 아래 켜세요
        // 'import/order': ['warn', { 'newlines-between': 'always' }],

        // 필요 시 jsx 확장자 허용
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    },

    overrides: [
        // 테스트 파일 전용 룰
        {
            files: ['**/*.{test,spec}.{ts,tsx}'],
            env: { jest: true },
            rules: {
                // 테스트에서만 허용할 규칙들 추가 가능
            },
        },
        // 구성 파일(CJS require 허용) — no-require-imports 우회
        {
            files: [
                'jest.config.js',
                'next.config.js',
                'eslint.config.js',
                'tailwind.config.js',
                '**/*.cjs',
            ],
            rules: {
                '@typescript-eslint/no-require-imports': 'off',
            },
        },
    ],
    ignorePatterns: ['node_modules/', '.next/', 'dist/', 'coverage/'],
};
