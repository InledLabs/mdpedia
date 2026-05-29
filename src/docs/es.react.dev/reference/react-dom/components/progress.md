---
title: <progress> – React
source: https://es.react.dev/reference/react-dom/components/progress
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../../_index.md).

---

# <progress> – React

El [componente `<progress>` integrado en el navegador](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) te permite renderizar un indicador de progreso.

```
<progress value={0.5} />
```

*   [Referencia](#reference)
    *   [`<progress>`](#progress)
*   [Uso](#usage)
    *   [Control de un indicador de progreso](#controlling-a-progress-indicator)

* * *

## Referencia[](#reference "Link for Referencia ")

### `<progress>`[](#progress "Link for this heading")

Para mostrar un indicador de progreso, renderiza el componente [`<progress>` incorporado del navegador](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress).

```
<progress value={0.5} />
```

[Ver más ejemplos abajo.](#usage)

#### Props[](#props "Link for Props ")

`<progress>` admite todas las [propiedades comunes de los elementos.](https://es.react.dev/reference/react-dom/components/common#props)

Además, `<progress>` admite estas propiedades:

*   [`max`](https://developer.mozilla.org/es/docs/Web/HTML/Element/progress#max): Un número. Especifica el `valor` máximo. Por defecto es `1`.
*   [`value`](https://developer.mozilla.org/es/docs/Web/HTML/Element/progress#value): Un número entre `0` y `max`, o `null` para un progreso indeterminado. Especifica cuánto se ha completado.

* * *

## Uso[](#usage "Link for Uso ")

### Control de un indicador de progreso[](#controlling-a-progress-indicator "Link for Control de un indicador de progreso ")

Para mostrar un indicador de progreso, renderiza un componente `<progress>`. Puedes pasar un `valor` numérico entre `0` y el valor `max` que especifiques. Si no pasas un valor `max`, se asumirá que es `1` por defecto.

Si la operación no está en curso, pasa `value={null}` para poner el indicador de progreso en un estado indeterminado.
