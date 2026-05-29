---
title: Static React DOM APIs – React
source: https://es.react.dev/reference/react-dom/static
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# Static React DOM APIs – React

The `react-dom/static` APIs let you generate static HTML for React components. They have limited functionality compared to the streaming APIs. A [framework](https://es.react.dev/learn/start-a-new-react-project#production-grade-react-frameworks) may call them for you. Most of your components don’t need to import or use them.

* * *

## Static APIs for Web Streams[](#static-apis-for-web-streams "Link for Static APIs for Web Streams ")

These methods are only available in the environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), which includes browsers, Deno, and some modern edge runtimes:

*   [`prerender`](https://es.react.dev/reference/react-dom/static/prerender) renders a React tree to static HTML with a [Readable Web Stream.](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)

* * *

## Static APIs for Node.js Streams[](#static-apis-for-nodejs-streams "Link for Static APIs for Node.js Streams ")

These methods are only available in the environments with [Node.js Streams](https://nodejs.org/api/stream.html):

*   [`prerenderToNodeStream`](https://es.react.dev/reference/react-dom/static/prerenderToNodeStream) renders a React tree to static HTML with a [Node.js Stream.](https://nodejs.org/api/stream.html)
