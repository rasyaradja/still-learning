import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: [
        '**/*.js',
        '**/*.jsx',
      ],
      jsxRuntime: 'automatic',
    }),
  ],
  esbuild: {
    loader: 'jsx',
    include: /src|components|pages|context|services|data|backend|App\.js|index\.js/,
    exclude: [],
  },
}); 