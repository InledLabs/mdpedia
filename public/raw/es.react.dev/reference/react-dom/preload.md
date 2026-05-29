---
title: preload – React
source: https://es.react.dev/reference/react-dom/preload
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# preload – React

### Nota

Los [frameworks basados en React](https://es.react.dev/learn/start-a-new-react-project) frecuentemente manejan la carga de recursos por ti, por lo que es posible que no necesites llamar a esta API tú mismo. Consulta la documentación de tu framework para más detalles.

`preload` te permite obtener anticipadamente un recurso como una hoja de estilos, fuente o script externo que esperas utilizar.

```
preload("https://example.com/font.woff2", {as: "font"});
```

Para precargar un recurso, llama a la función `preload` de `react-dom`.

La función `preload` proporciona al navegador una sugerencia de que debería comenzar a descargar el recurso dado, lo cual puede ahorrar tiempo.

`preload` no devuelve nada.

Llama a `preload` al renderizar un componente si sabes que él o sus hijos usarán un recurso específico.
