// @ts-check
const { defineConfig } = require("@norm/cli");

module.exports = defineConfig({
  mode: "web-extension",
  manifest: {
    manifest_version: 3,
    name: "HTTP Indicator",
    version: "0.1.0",
    description: "Indicator for HTTP/2, QUIC and HTTP/3",
    homepage_url: "https://github.com/pd4d10/http-indicator",
    icons: {
      128: "icons/icon.png",
    },
    background: {
      service_worker: "src/background.js",
    },
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["src/content-script.js"],
        run_at: "document_end",
      },
    ],
    action: {
      default_icon: "icons/default.png",
    },
  },
});
