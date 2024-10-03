chrome.runtime.sendMessage(
  (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)
    .nextHopProtocol,
);
