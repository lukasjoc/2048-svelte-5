import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
// import svelteConfig from "./svelte.config.js";
// import tsParser from "@typescript-eslint/parser";
// import svelteParser from "svelte-eslint-parser";
// import eslintPluginSvelte from "eslint-plugin-svelte";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    ...[{ignores: ["dist", "src/assets"]}],
    ...[{rules: {
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "comma-dangle": ["error", "always-multiline"],
        "eol-last": ["error", "always"],
        "spaced-comment": ["error", "always"]},
    }],
    // ...eslintPluginSvelte.configs["flat/recommended"],
    // ...[{
    //     files: [
    //         "**/*.svelte",
    //         "*.svelte",
    //         "**/*.svelte.ts", "*.svelte.ts", "**/*.svelte.js", "*.svelte.js",
    //     ],
    //     languageOptions: {
    //         parser: svelteParser,
    //         parserOptions: {
    //
    //             parser: tsParser,
    //             projectService: "./tsconfig.json",
    //             extraFileExtensions: [".svelte"],
    //             svelteConfig,
    //         },
    //     },
    // }],
);
