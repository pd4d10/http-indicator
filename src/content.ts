chrome.runtime.sendMessage(
  // @ts-ignore
  performance.getEntriesByType("navigation")[0].nextHopProtocol,
);
