import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   port: 3000
  // },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@helper": path.resolve(__dirname, "./src/helper"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [react()],
});
