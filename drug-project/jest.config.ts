import nextJest from 'next/jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: '<rootDir>/',
        }),
    },
};

export default createJestConfig(customJestConfig);
