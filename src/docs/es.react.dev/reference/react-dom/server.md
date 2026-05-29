---
title: APIs del servidor de React DOM – React
source: https://es.react.dev/reference/react-dom/server
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# APIs del servidor de React DOM – React

Las APIs del `react-dom/server` te permiten renderizar del lado del servidor componentes de React a HTML. Estas API solo se usan en el servidor en el nivel superior de su aplicación para generar el HTML inicial. Un [framework](https://es.react.dev/learn/start-a-new-react-project#production-grade-react-frameworks) puede llamarlos por ti. La mayoría de tus componentes no necesitan importarlos o usarlos.

* * *

## APIs del servidor para transmisiones (streams) de Node.js[](#server-apis-for-nodejs-streams "Link for APIs del servidor para transmisiones (streams) de Node.js ")

Estos métodos solo están disponibles en los entornos con [Node.js Streams:](https://nodejs.org/api/stream.html)

*   [`renderToPipeableStream`](https://es.react.dev/reference/react-dom/server/renderToPipeableStream) renderiza un árbol de React a un [Node.js Stream.](https://nodejs.org/api/stream.html)

* * *

## APIs del servidor para Web Streams[](#server-apis-for-web-streams "Link for APIs del servidor para Web Streams ")

Estos métodos solo están disponibles en los entornos con [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), que incluye navegadores, Deno y algunos entornos de ejecución modernos:

*   [`renderToReadableStream`](https://es.react.dev/reference/react-dom/server/renderToReadableStream) renderiza un árbol de React a un [Readable Web Stream.](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)

* * *

## APIs legadas del servidor para entornos sin _streaming_[](#legacy-server-apis-for-non-streaming-environments "Link for this heading")

Estos métodos se pueden usar en los entornos que no admiten _streams_:

*   [`renderToString`](https://es.react.dev/reference/react-dom/server/renderToString) renderiza un árbol de React a un string.
*   [`renderToStaticMarkup`](https://es.react.dev/reference/react-dom/server/renderToStaticMarkup) renderiza un árbol de React no interactivo a un string.

Tienen funcionalidad limitada en comparación con las APIs de _streaming_.
