import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.js", "**/*.jsx"], // Only for JS files
    rules: {
      "@typescript-eslint/no-implicit-any": "off",
      "no-unused-vars": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"], // Different rules for TS files
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Just warn instead of error
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
]);

export default eslintConfig;
