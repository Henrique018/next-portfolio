import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    extends: ['next', 'prettier'],
    ignorePatterns: ['node_modules/', 'dist/', '.next/', 'out/', 'next-env.d.ts'],
  }),
];

export default eslintConfig;
