@module("url:/assets/h1.png") external h1: string = "default"
@module("url:/assets/h2.png") external h2: string = "default"
@module("url:/assets/h3.png") external h3: string = "default"
@module("url:/assets/hq.png") external hq: string = "default"
@module("url:/assets/spdy.png") external spdy: string = "default"

Chrome.Runtime.OnMessage.addListener((message, sender, sendResponse) => {
  switch sender.tab->Option.flatMap(tab => tab.id) {
  | None => ()
  | Some(tabId) => {
      let (title, icon) = switch message {
      // h2 and hq is introduced from this post: "https://developers.google.com/web/updates/2017/12/chrome-loadtimes-deprecated"
      // But the latest Chrome (68) seems use the value like this: "http/2+quic/43"
      // Handle both cases for compatible

      // Some of this taken from "https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml"

      | "hq" => ("HTTP/2 + QUIC", hq)
      | "http/1.1" => ("HTTP/1.1", h1)
      | "http/1.0" => ("HTTP/1.0", h1)
      | _ =>
        if message->Js.String2.startsWith("h3") {
          ("HTTP/3", h3)
        } else if message->Js.String2.startsWith("h2") {
          // "h2" is "HTTP/2 over TLS", "h2c" is "HTTP/2 over TCP"
          ("HTTP/2", h2)
        } else if message->Js.String2.includes("quic") {
          ("QUIC", hq)
        } else if message->Js.String2.startsWith("spdy") {
          // "spdy/1", "spdy/2", "spdy/3"
          ("SPDY", spdy)
        } else {
          (message, h1)
        }
      }

      Chrome.Action.setIcon({path: icon, tabId})
      Chrome.Action.setTitle({tabId, title})->ignore
    }
  }

  // https://github.com/pd4d10/http-indicator/pull/17
  sendResponse()
})

Chrome.Action.OnClicked.addListener(_tab => {
  Chrome.Tabs.create({
    url: "chrome://net-export",
  })->ignore
})
