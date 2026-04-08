import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@features": resolve(__dirname, "./src/features"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@lib": resolve(__dirname, "./src/lib"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@types": resolve(__dirname, "./src/types"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
