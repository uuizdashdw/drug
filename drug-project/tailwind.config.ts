import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/app/**/*.{ts,tsx}',
        './src/pages/**/*.{ts,tsx}',
        // './src/components/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            // container: { center: true, padding: '1rem' },
            colors: {
                brand: {
                    50: '#f5f8ff',
                    100: '#e6efff',
                    500: '#3b82f6',
                    600: '#2563eb',
                    900: '#1e3a8a',
                },
            },
        },
    },
    // plugins: [typography, forms, lineClamp],
};
export default config;
