import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const isUserOrOrgPage = repo?.toLowerCase().endsWith('.github.io');

  // Use repo path for GitHub Pages project sites, root path for local dev and user/org pages.
  const pagesBase =
    process.env.GITHUB_ACTIONS === 'true' && repo && !isUserOrOrgPage
      ? `/${repo}/`
      : '/';

  return {
    base: pagesBase,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
