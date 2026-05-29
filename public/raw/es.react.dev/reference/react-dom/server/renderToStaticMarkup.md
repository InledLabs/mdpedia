---
title: renderToStaticMarkup – React
source: https://es.react.dev/reference/react-dom/server/renderToStaticMarkup
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../../_index.md).

---

# renderToStaticMarkup – React

`renderToStaticMarkup` renderiza un árbol React no interactivo a un _string_ de HTML.

```
const html = renderToStaticMarkup(reactNode, options?)
```

En el servidor, llama a `renderToStaticMarkup` para renderizar tu aplicación a HTML.

Esto producirá una salida de HTML no interactiva de tus componentes de React.

Un _string_ de HTML.

Llama a `renderToStaticMarkup` para renderizar tu aplicación a un _string_ de HTML que puedas enviar con la respuesta del servidor:

Esto producirá la salida inicial de HTML no interactiva de tus componentes de React.
