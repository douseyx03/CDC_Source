import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [react()];

  // The source locator plugin is only useful in development and can break
  // server-side bundlers like Vercel's Rollup setup, so keep it out of
  // production builds.
  if (mode !== "production") {
    const { viteSourceLocator } = await import("@metagptx/vite-plugin-source-locator");
    plugins.unshift(
      viteSourceLocator({
        prefix: "mgx",
      })
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
