import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  preview: {
    allowedHosts: [
      "portfolio-website-3yrd.onrender.com",
      // optional but recommended:
      // ".onrender.com"
    ],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
