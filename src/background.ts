import { match } from "ts-pattern";
import H1Png from "url:/assets/h1.png";
import H2Png from "url:/assets/h2.png";
import H3Png from "url:/assets/h3.png";
import HqPng from "url:/assets/hq.png";
import SpdyPng from "url:/assets/spdy.png";

chrome.runtime.onMessage.addListener(
  (message: string, sender, sendResponse) => {
    const tabId = sender.tab?.id;
    if (typeof tabId === "undefined") return;

    const [title, icon] = match(message)
      // h2 and hq is introduced from this post: "https://developers.google.com/web/updates/2017/12/chrome-loadtimes-deprecated"
      // But the latest Chrome (68) seems use the value like this: "http/2+quic/43"
      // Handle both cases for compatible

      // Some of this taken from "https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml"

      .with("hq", () => ["HTTP/2 + QUIC", HqPng])
      .with("http/1.0", () => ["HTTP/1.0", H1Png])
      .with("http/1.1", () => ["HTTP/1.1", H1Png])
      .otherwise((message) => {
        if (message.startsWith("h3")) return ["HTTP/3", H3Png];

        // "h2" is "HTTP/2 over TLS", "h2c" is "HTTP/2 over TCP"
        if (message.startsWith("h2")) return ["HTTP/2", H2Png];

        if (message.includes("quic")) return ["QUIC", HqPng];

        // "spdy/1", "spdy/2", "spdy/3"
        if (message.startsWith("spdy")) return ["SPDY", SpdyPng];

        return [message, H1Png];
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
