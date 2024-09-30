


import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      "@components": path.resolve(__dirname, "src/components"),
      "@router": path.resolve(__dirname, "src/router"),
      "@app": path.resolve(__dirname, "src/app"),
      "@sharedTypes": path.resolve(__dirname, "src/sharedTypes"),
      "@graphql": path.resolve(__dirname, "src/graphql")
    }}
});
