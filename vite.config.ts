import { defineConfig } from "vite"
import handlebars from "vite-plugin-handlebars";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist"
  },
  server: {
    port: 3000,
    force: true,
    watch: {
      usePolling: true,
    },
  },
  plugins: [handlebars()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
