---
title: React DOM APIs – React
source: https://es.react.dev/reference/react-dom
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../_index.md).

---

# React DOM APIs – React

El paquete `react-dom` incluye métodos que sólo son compatibles con aplicaciones web (aquellas que se ejecutan en el entorno del DOM del navegador). No son compatibles con React Native.

* * *

## APIs[](#apis "Link for APIs ")

Puedes importar las siguientes APIs en tus componentes, pero su uso es poco común:

*   [`createPortal`](https://es.react.dev/reference/react-dom/createPortal) permite renderizar componentes hijos en una parte diferente del árbol del DOM.
*   [`flushSync`](https://es.react.dev/reference/react-dom/flushSync) permite forzar a React a actualizar el estado y el DOM de manera síncrona.

## APIs de precarga de recursos[](#resource-preloading-apis "Link for APIs de precarga de recursos ")

Estas APIs se pueden utilizar para hacer las aplicaciones más rápidas al precargar recursos como scripts, hojas de estilos y fuentes tan pronto como sepas que los necesitarás, por ejemplo antes de navegar a otra página donde se utilizarán los recursos.

[Los frameworks basados en React](https://es.react.dev/learn/start-a-new-react-project) con frecuencia manejan la carga de recursos por ti, por lo que es posible que no necesites llamar a estas APIs tú mismo. Consulta la documentación de tu framework para más detalles.

*   [`prefetchDNS`](https://es.react.dev/reference/react-dom/prefetchDNS) te permite precargar la dirección IP de un nombre de dominio DNS al que esperas conectarte.
*   [`preconnect`](https://es.react.dev/reference/react-dom/preconnect) te permite conectarte a un servidor del que esperas solicitar recursos, incluso si aún no sabes qué recursos necesitarás.
*   [`preload`](https://es.react.dev/reference/react-dom/preload) te permite precargar una hoja de estilos, fuente, imagen o script externo que esperas utilizar.
*   [`preloadModule`](https://es.react.dev/reference/react-dom/preloadModule) te permite precargar un módulo ESM que esperas utilizar.
*   [`preinit`](https://es.react.dev/reference/react-dom/preinit) te permite precargar y evaluar un script externo o precargar e insertar una hoja de estilos.
*   [`preinitModule`](https://es.react.dev/reference/react-dom/preinitModule) te permite precargar y evaluar un módulo ESM.

* * *

## Puntos de entrada[](#entry-points "Link for Puntos de entrada ")

El paquete `react-dom` proporciona dos puntos de entrada adicionales:

*   [`react-dom/client`](https://es.react.dev/reference/react-dom/client) incluye APIs para renderizar componentes de React en el cliente, es decir, en el navegador.
*   [`react-dom/server`](https://es.react.dev/reference/react-dom/server) incluye APIs para renderizar componentes de react en el servidor.

* * *

## APIs eliminadas[](#removed-apis "Link for APIs eliminadas ")

Las siguientes API se eliminaron en React 19:

*   [`findDOMNode`](https://18.react.dev/reference/react-dom/findDOMNode): consulta las [alternativas](https://18.react.dev/reference/react-dom/findDOMNode#alternatives).
*   [`hydrate`](https://18.react.dev/reference/react-dom/hydrate): utiliza [`hydrateRoot`](https://es.react.dev/reference/react-dom/client/hydrateRoot) en su lugar.
*   [`render`](https://18.react.dev/reference/react-dom/render): utiliza [`createRoot`](https://es.react.dev/reference/react-dom/client/createRoot) en su lugar.
*   [`unmountComponentAtNode`](https://es.react.dev/reference/react-dom/unmountComponentAtNode): utiliza [`root.unmount()`](https://es.react.dev/reference/react-dom/client/createRoot#root-unmount) en su lugar.
*   [`renderToNodeStream`](https://18.react.dev/reference/react-dom/server/renderToNodeStream): utiliza las API de [`react-dom/server`](https://es.react.dev/reference/react-dom/server) en su lugar.
*   [`renderToStaticNodeStream`](https://18.react.dev/reference/react-dom/server/renderToStaticNodeStream): utiliza las API de [`react-dom/server`](https://es.react.dev/reference/react-dom/server) en su lugar.
