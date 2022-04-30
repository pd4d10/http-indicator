import { defineConfig } from "vite";
import webExtension from "@vite-preset/web-extension";

export default defineConfig({
  plugins: [
    webExtension({
      manifest: {
        manifest_version: 2,
        name: "HTTP Indicator",
        version: "1.1.0",
        description: "Indicator for HTTP/2, QUIC and HTTP/3",
        homepage_url: "https://github.com/pd4d10/http-indicator",
        icons: {
          128: "icons/icon.png",
        },
        background: {
          persistent: false,
          page: "background.html",
        },
        content_scripts: [
          {
            matches: ["<all_urls>"],
            js: ["src/content-script.js"],
            run_at: "document_end",
          },
        ],
        browser_action: {
          default_icon: "icons/default.png",
        },
      },
    }),
  ],
});
