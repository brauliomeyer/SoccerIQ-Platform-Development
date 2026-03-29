import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const explicitBase = process.env.VITE_BASE_PATH;

export default defineConfig({
  base: explicitBase ?? (process.env.GITHUB_ACTIONS === 'true' && repoName ? `/${repoName}/` : '/'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
