import eslint from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

export default [
  {
    ignores: ["build/**", "node_modules/**", "output/**"],
  },
  eslint.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      ...eslintReact.configs.recommended.plugins,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    settings: eslintReact.configs.recommended.settings,
    rules: {
      ...(reactHooks.configs.flat?.recommended?.rules || {}),
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@eslint-react/no-missing-key": "error",
      "@eslint-react/dom-no-unknown-property": "error",
      "@eslint-react/dom-no-unsafe-target-blank": "error",
      "react-refresh/only-export-components": "off",
    },
  },
];
