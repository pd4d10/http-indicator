chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab.id
  // console.log(message, tabId)
  let title
  let icon
  switch (message) {
    case 'h2':
      title = 'HTTP/2'
      icon = 'h2'
      break
    case 'hq':
      title = 'HTTP/2 + QUIC/39'
      icon = 'hq'
      break
    default:
      title = 'HTTP/1'
      icon = 'h1'
  }
  chrome.browserAction.setIcon({ path: 'icons/' + icon + '.png', tabId })
  chrome.browserAction.setTitle({ tabId, title })
})
