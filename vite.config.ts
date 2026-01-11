import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
export defineConfig(() => ({
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        try {
          copyFileSync('public/_redirects', 'dist/_redirects');
        } catch (e) {
          console.log('Note: _redirects file not found');
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
