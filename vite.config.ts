import { defineConfig, Plugin } from "vite";
import { crx } from "@crxjs/vite-plugin";
import pkg from "./package.json";

// https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919
const viteManifestHackIssue846: Plugin & {
  renderCrxManifest: (manifest: any, bundle: any) => void;
} = {
  // Workaround from https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919.
  name: "manifestHackIssue846",
  renderCrxManifest(_manifest, bundle) {
    bundle["manifest.json"] = bundle[".vite/manifest.json"];
    bundle["manifest.json"].fileName = "manifest.json";
    delete bundle[".vite/manifest.json"];
  },
};

export default defineConfig({
  plugins: [
    viteManifestHackIssue846,
    crx({
      manifest: {
        manifest_version: 3,
        name: "HTTP Indicator",
        description: "Indicator for HTTP/2, QUIC and HTTP/3",
        version: pkg.version,
        homepage_url: "https://github.com/pd4d10/http-indicator",
        icons: {
          128: "icon.png",
        },
        background: {
          service_worker: "src/background.ts",
        },
        content_scripts: [
          {
            matches: ["<all_urls>"],
            js: ["src/content.ts"],
          },
        ],
        action: {
          default_icon: "default.png",
        },
      },
    }),
  ],
});
