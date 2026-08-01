import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const mailchimpUrl =
  "https://upir.us8.list-manage.com/subscribe/post-json" +
  "?u=3f6ccc8a6a63be50b4bb9b1b1&id=3a8ffa6e4f&c=?";
const apiProxy = {
  "/api": {
    target: "https://api.infoeducatie.ro",
    changeOrigin: true,
    secure: true,
    rewrite: (requestPath) => requestPath.replace(/^\/api/, ""),
  },
};

const environmentDefaults = {
  development: {
    API_URL: "http://localhost:3000/v1/",
    PASSWORD_RESET_URL: "http://localhost:3000/users/password/new",
    MAILCHIMP_URL: mailchimpUrl,
    SENTRY_DSN: "",
    GA_TRACKING_ID: "",
  },
  smoke: {
    API_URL: "/api/v1/",
    PASSWORD_RESET_URL: "https://api.infoeducatie.ro/users/password/new",
    MAILCHIMP_URL: mailchimpUrl,
    SENTRY_DSN: "",
    GA_TRACKING_ID: "",
  },
  staging: {
    API_URL: "https://api.staging.infoeducatie.ro/v1/",
    PASSWORD_RESET_URL: "https://api.staging.infoeducatie.ro/users/password/new",
    MAILCHIMP_URL: mailchimpUrl,
    SENTRY_DSN:
      "https://e141d851f5d54ed58c5de9b1c2cf9eb4@sentry.infoeducatie.ro/5",
    GA_TRACKING_ID: "",
  },
  production: {
    API_URL: "https://api.infoeducatie.ro/v1/",
    PASSWORD_RESET_URL: "https://api.infoeducatie.ro/users/password/new",
    MAILCHIMP_URL: mailchimpUrl,
    SENTRY_DSN:
      "https://430b5651bbe24287aac4c5e4175a65a7@sentry.infoeducatie.ro/3",
    GA_TRACKING_ID: "UA-3656229-13",
  },
};

function runtimeConfigPlugin(config) {
  return {
    name: "infoeducatie-runtime-config",
    transformIndexHtml() {
      return [
        {
          tag: "script",
          children: `window.config = ${JSON.stringify(config)};`,
          injectTo: "head-prepend",
        },
      ];
    },
  };
}

function legacyAssetsPlugin() {
  return {
    name: "infoeducatie-legacy-assets",
    apply: "build",
    writeBundle() {
      fs.cpSync(
        path.resolve(rootDirectory, "assets"),
        path.resolve(rootDirectory, "build/assets"),
        { recursive: true },
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDirectory, "VITE_");
  const defaults = environmentDefaults[mode] || environmentDefaults.production;
  const runtimeConfig = Object.fromEntries(
    Object.entries(defaults).map(([key, value]) => [
      key,
      env[`VITE_${key}`] || value,
    ]),
  );

  return {
    plugins: [react(), runtimeConfigPlugin(runtimeConfig), legacyAssetsPlugin()],
    resolve: {
      alias: {
        "@lib": path.resolve(rootDirectory, "src/lib"),
        "@ui": path.resolve(rootDirectory, "src/components/ui"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
        },
      },
    },
    build: {
      outDir: "build",
      assetsDir: "static",
      emptyOutDir: true,
    },
    server: {
      host: "0.0.0.0",
      port: 3001,
    },
    preview: {
      host: "0.0.0.0",
      port: 4173,
      proxy: apiProxy,
    },
  };
});
