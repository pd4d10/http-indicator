let message = %raw(`performance.getEntriesByType("navigation")[0].nextHopProtocol`)

Chrome.Runtime.sendMessage(message, () => ())
