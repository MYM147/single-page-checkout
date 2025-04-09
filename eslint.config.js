import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import pluginJestDom from "eslint-plugin-jest-dom";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginTestingLibrary from "eslint-plugin-testing-library";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  // Base configurations
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        vi: "readonly",
      },
      parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  
  // TypeScript configurations
  ...tseslint.configs.recommended,
  
  // React configurations
  pluginReact.configs.flat.recommended,
  
  // Custom rules configuration
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "jsx-a11y": pluginJsxA11y,
      prettier: pluginPrettier,
      "react-hooks": pluginReactHooks,
      "jest-dom": pluginJestDom,
      "testing-library": pluginTestingLibrary,
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src/"],
        },
      },
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "arrow-body-style": 0,
      "no-unused-vars": 0,
      "@typescript-eslint/no-unused-vars": "warn",
      "semi": 1,
      "max-len": [
        2,
        {
          "code": 100,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreRegExpLiterals": true,
          "ignoreTemplateLiterals": true,
          "ignoreComments": true,
        },
      ],
      "no-trailing-spaces": [1, { "ignoreComments": true }],
      "no-multiple-empty-lines": [1, { "max": 1 }],
      "sort-imports": [1, { "ignoreDeclarationSort": true }],
      "max-lines": [2, { "max": 250, "skipComments": true, "skipBlankLines": true }],
      "react/react-in-jsx-scope": 0,
      "react/prop-types": 1,
      "react/require-default-props": 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
      "react/jsx-props-no-spreading": [
        2,
        {
          "html": "enforce",
          "custom": "enforce",
          "explicitSpread": "enforce",
          "exceptions": ["TestProviderWrapper", "Route", "Slide", "RouterLink", "Grow"],
        },
      ],
      "react/function-component-definition": 0,
      "react/no-unstable-nested-components": [2, { "allowAsProps": true }],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "js": "never",
          "jsx": "never",
          "ts": "never",
          "tsx": "never",
        },
      ],
      "jsx-a11y/label-has-associated-control": [
        2,
        {
          "labelAttributes": ["id"],
          "controlComponents": ["Field"],
          "depth": 2,
        },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          "devDependencies": ["**/*{.,_}{test,spec}.{ts,tsx}", "**/tests/*.tsx", "**/setupTests.ts"],
        },
      ],
    },
  },
]);
