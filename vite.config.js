import { defineConfig } from 'vite';

// Vite configuration for multi-page build
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html',
        users: './users.html',
        roles: './roles.html',
        analytics: './analytics.html',
        logs: './logs.html',
        notifications: './notifications.html',
        sidebar: './sidebar.html',
        examples: './examples.html'
      }
    }
  }
}); 