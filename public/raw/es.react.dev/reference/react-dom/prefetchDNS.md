---
title: prefetchDNS – React
source: https://es.react.dev/reference/react-dom/prefetchDNS
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# prefetchDNS – React

`prefetchDNS` te permite buscar anticipadamente la IP de un servidor desde el cual esperas cargar recursos.

```
prefetchDNS("https://example.com");
```

Para buscar un host, llama a la función `prefetchDNS` de `react-dom`.

La función `prefetchDNS` proporciona al navegador una sugerencia de que debería buscar la dirección IP de un servidor determinado. Si el navegador decide hacerlo, esto puede acelerar la carga de recursos desde ese servidor.

`prefetchDNS` no devuelve nada.

Llama a `prefetchDNS` al renderizar un componente si sabes que sus hijos cargarán recursos externos desde ese host.

Llama a `prefetchDNS` en un controlador de eventos antes de hacer la transición a una página o estado donde se necesitarán recursos externos. Esto inicia el proceso antes que si lo llamas durante el renderizado de la nueva página o estado.
