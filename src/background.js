chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab.id;
  // console.log(message, tabId)
  let title = message;
  let icon;

  // h2 and hq is introduced from this post:
  // https://developers.google.com/web/updates/2017/12/chrome-loadtimes-deprecated
  // But the latest Chrome (68) seems use the value like this:
  // http/2+quic/43
  // Handle both cases for compatible
  if (message === "h2") {
    title = "HTTP/2";
    icon = "h2";
  } else if (message === "hq") {
    title = "HTTP/2 + QUIC";
    icon = "hq";
  } else if (message.startsWith("h3")) {
    icon = "h3";
  } else if (message.includes("quic")) {
    icon = "hq";
  } else {
    icon = "h1";
  }

  chrome.action.setIcon({
    path: chrome.runtime.getURL("icons/" + icon + ".png"),
    tabId,
  });
  chrome.action.setTitle({ tabId, title });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: "chrome://net-export",
  });
});
