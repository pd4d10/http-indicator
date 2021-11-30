chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab.id;
  // console.log(message, tabId)
  let title = message;
  let icon = "h1";

  // h2 and hq is introduced from this post:
  // https://developers.google.com/web/updates/2017/12/chrome-loadtimes-deprecated
  // But the latest Chrome (68) seems use the value like this:
  // http/2+quic/43
  // Handle both cases for compatible
  if (message === "hq") {
    title = "HTTP/2 + QUIC";
    icon = "hq";
  } else if (message.startsWith("h3")) {
    title = "HTTP/3";
    icon = "h3";
  } else if (message.startsWith("h2")) { // "h2", "h2c"
    title = "HTTP/2";
    icon = "h2";
  } else if (message.includes("quic")) {
    title = "QUIC";
    icon = "hq";
  } else if (message.startsWith("spdy")) { // "spdy/1", "spdy/2", "spdy/3"
    title = "SPDY";
    icon = "spdy";
  } else if (message === "http/1.1") {
    title = "HTTP/1.1";
  } else if (message === "http/1.0") {
    title = "HTTP/1.0";
  }

  chrome.browserAction.setIcon({ path: "icons/" + icon + ".png", tabId });
  chrome.browserAction.setTitle({ tabId, title });
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: "chrome://net-export",
  });
});
