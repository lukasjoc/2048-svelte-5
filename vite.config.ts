import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath } from "node:url";

export default defineConfig({
    plugins: [svelte()],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ],
    },
    server: {
        host: true,
        port: 8080,
        strictPort: true,
    },
    test: {
        includeSource: ["src/**/*.ts"],
    },
    define: {
        "import.meta.vitest": "undefined",
    },
});
