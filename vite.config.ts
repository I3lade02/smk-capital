import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Production (smkcapital.cz) is deployed at the domain root.
  // The GitHub Pages showcase build overrides this via VITE_BASE_PATH.
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
});