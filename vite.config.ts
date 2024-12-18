import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from 'vite-svg-loader';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
    }
  },
  plugins: [vue(), svgLoader()],
});
