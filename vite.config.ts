import react from '@vitejs/plugin-react'

import { defineConfig, loadEnv } from 'vite';


export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
      define: {
          // If you want to exposes all env variables, which is not recommended
          'process.env': env
      },
  };
});