import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [vue()];

  // Only add Vue DevTools in development mode to avoid localStorage issues
  if (command === "serve") {
    plugins.push(
      vueDevTools({
        launchEditor: "vscode",
      })
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
      },
    },
    server: {
      allowedHosts: ["jobhunter.sokmeak.site"],
    },
  };
});
