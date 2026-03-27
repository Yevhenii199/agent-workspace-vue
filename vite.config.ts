import { defineConfig } from "vitest/config"; 
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },

  test: {
    globals: true,                
    environment: "jsdom",        
    setupFiles: "./src/components/ui/__tests__/PriorityBadge.test.tsx", 
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
}));