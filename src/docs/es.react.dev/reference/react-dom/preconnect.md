---
title: preconnect – React
source: https://es.react.dev/reference/react-dom/preconnect
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# preconnect – React

`preconnect` te permite conectarte anticipadamente a un servidor desde el cual esperas cargar recursos.

```
preconnect("https://example.com");
```

Para preconectarte a un host, llama a la función `preconnect` de `react-dom`.

La función `preconnect` proporciona al navegador una sugerencia de que debería abrir una conexión al servidor dado. Si el navegador decide hacerlo, esto puede acelerar la carga de recursos desde ese servidor.

`preconnect` no devuelve nada.

Llama a `preconnect` al renderizar un componente si sabes que sus hijos cargarán recursos externos desde ese host.

Llama a `preconnect` en un controlador de eventos antes de hacer la transición a una página o estado donde se necesitarán recursos externos. Esto inicia el proceso antes que si lo llamas durante el renderizado de la nueva página o estado.
