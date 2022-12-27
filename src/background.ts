import h1 from "url:/assets/h1.png";
import h2 from "url:/assets/h2.png";
import h3 from "url:/assets/h3.png";
import hq from "url:/assets/hq.png";
import spdy from "url:/assets/spdy.png";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab?.id;
  if (!tabId) return;

  // console.log(message, tabId)
  let title = message;
  let icon = h1;

  // h2 and hq is introduced from this post: "https://developers.google.com/web/updates/2017/12/chrome-loadtimes-deprecated"
  // But the latest Chrome (68) seems use the value like this: "http/2+quic/43"
  // Handle both cases for compatible

  // Some of this taken from "https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml"
  if (message === "hq") {
    title = "HTTP/2 + QUIC";
    icon = hq;
  } else if (message.startsWith("h3")) {
    title = "HTTP/3";
    icon = h3;
  } else if (message.startsWith("h2")) {
    // "h2" is "HTTP/2 over TLS", "h2c" is "HTTP/2 over TCP"
    title = "HTTP/2";
    icon = h2;
  } else if (message.includes("quic")) {
    title = "QUIC";
    icon = hq;
  } else if (message.startsWith("spdy")) {
    // "spdy/1", "spdy/2", "spdy/3"
    title = "SPDY";
    icon = spdy;
  } else if (message === "http/1.1") {
    title = "HTTP/1.1";
  } else if (message === "http/1.0") {
    title = "HTTP/1.0";
  }

  chrome.browserAction.setIcon({ path: icon, tabId });
  chrome.browserAction.setTitle({ tabId, title });
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: "chrome://net-export",
  });
});
