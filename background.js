const h2Title = 'HTTP/2'
const hqTitle = 'HTTP/2 + QUIC'
const h1Title = 'HTTP/1'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab.id
  // console.log(message, tabId)
  let title
  let icon

  // h2 and hq is introduced from this post:
  // https://developers.google.com/web/updates/2017/12/chrome-loadtimes-deprecated
  // But the latest Chrome (68) seems use the value like this:
  // http/2+quic/43
  // Handle both cases for compatible
  if (message === 'h2') {
    title = h2Title
    icon = 'h2'
  } else if (message === 'hq') {
    title = hqTitle
    icon = 'hq'
  } else if (message.includes('quic') || message.startsWith('h3')) {
    title = message
    icon = 'hq'
  } else {
    title = h1Title
    icon = 'h1'
  }

  chrome.browserAction.setIcon({ path: 'icons/' + icon + '.png', tabId })
  chrome.browserAction.setTitle({ tabId, title })
})

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.create({
    url: 'chrome://net-export',
  })
})
