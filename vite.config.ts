import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import history from 'connect-history-api-fallback'; // 👈 hinzugefügt
import { createServer as createMiddlewareServer } from 'vite';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    middlewareMode: false,
    setupMiddlewares: (middlewares) => {
      // 👇 stellt sicher, dass im Dev-Server alle Pfade auf /index.html fallen
      middlewares.use(history());
      return middlewares;
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
}));
