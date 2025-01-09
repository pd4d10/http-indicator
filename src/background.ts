/// <reference types="vite/client" />
/// <reference types="chrome" />

import { match } from "ts-pattern";
import h1 from "../assets/h1.png";
import h2 from "../assets/h2.png";
import h3 from "../assets/h3.png";
import hq from "../assets/hq.png";
import spdy from "../assets/spdy.png";

chrome.runtime.onMessage.addListener(
  (message: string, sender, sendResponse) => {
    const tabId = sender.tab?.id;
    if (typeof tabId === "undefined") return;

    const [title, icon] = match(message)
      // h2 and hq is introduced from this post: "https://developers.google.com/web/updates/2017/12/chrome-loadtimes-deprecated"
      // But the latest Chrome (68) seems use the value like this: "http/2+quic/43"
      // Handle both cases for compatible

      // Some of this taken from "https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml"

      .with("hq", () => ["HTTP/2 + QUIC", hq])
      .with("http/1.0", () => ["HTTP/1.0", h1])
      .with("http/1.1", () => ["HTTP/1.1", h1])
      .otherwise((message) => {
        if (message.startsWith("h3")) return ["HTTP/3", h3];

        // "h2" is "HTTP/2 over TLS", "h2c" is "HTTP/2 over TCP"
        if (message.startsWith("h2")) return ["HTTP/2", h2];

        if (message.includes("quic")) return ["QUIC", hq];

        // "spdy/1", "spdy/2", "spdy/3"
        if (message.startsWith("spdy")) return ["SPDY", spdy];

        return [message, "h1"];
      });

    chrome.action.setIcon({ path: icon, tabId });
    chrome.action.setTitle({ title, tabId: tabId });

    // https://github.com/pd4d10/http-indicator/pull/17
    sendResponse();
  }
);

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "chrome://net-export" });
});
