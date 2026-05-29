---
title: <option> – React
source: https://es.react.dev/reference/react-dom/components/option
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../../_index.md).

---

# <option> – React

El [componente integrado `<option>` del navegador](https://developer.mozilla.org/es/docs/Web/HTML/Element/option) te permite mostrar una opción dentro de un cuadro [`<select>`](https://es.react.dev/reference/react-dom/components/select).

```
<select><option value="someOption">Alguna opción</option><option value="otherOption">Otra opción</option></select>
```

*   [Referencia](#reference)
    *   [`<option>`](#option)
*   [Uso](#usage)
    *   [Mostrar un cuadro de selección con opciones](#displaying-a-select-box-with-options)

* * *

## Referencia[](#reference "Link for Referencia ")

### `<option>`[](#option "Link for this heading")

El [componente integrado `<option>` del navegador](https://developer.mozilla.org/es/docs/Web/HTML/Element/option) te permite mostrar una opción dentro de un cuadro [`<select>`](https://es.react.dev/reference/react-dom/components/select).

```
<select><option value="someOption">Alguna opción</option><option value="otherOption">Otra opción</option></select>
```

[Ver más ejemplos abajo.](#usage)

#### Props[](#props "Link for Props ")

`<option>` es compatible con todas las [props de elementos comunes.](https://es.react.dev/reference/react-dom/components/common#props)

Además, `<option>` admite estas props:

*   [`disabled`](https://developer.mozilla.org/es/docs/Web/HTML/Element/option#attr-disabled): Un booleano. Si es `verdadero`, la opción no se podrá seleccionar y aparecerá atenuada.
*   [`label`](https://developer.mozilla.org/es/docs/Web/HTML/Element/option#attr-label): Una string. Especifica el significado de la opción. Si no se especifica, se utiliza el texto dentro de la opción.
*   \[`value`\]([https://developer.mozilla.org/es/docs/Web/HTML/Element/option#attr-value](https://developer.mozilla.org/es/docs/Web/HTML/Element/option#attr-value): El valor que se usará [al enviar el `<select>` padre en un formulario](https://es.react.dev/reference/react-dom/components/select#reading-the-select-box-value-when-submitting-a-form) si se selecciona esta opción.

#### Advertencias[](#caveats "Link for Advertencias ")

*   React no admite el atributo `selected` en `<option>`. En su lugar, pasa el `value` de esta opción al padre [`<select defaultValue>`](https://es.react.dev/reference/react-dom/components/select#providing-an-initially-selected-option) para un cuadro de selección no controlado, o [`<select value>`](https://es.react.dev/reference/react-dom/components/select#controlling-a-select-box-with-a-state-variable) para un cuadro de selección controlado.

* * *

## Uso[](#usage "Link for Uso ")

### Mostrar un cuadro de selección con opciones[](#displaying-a-select-box-with-options "Link for Mostrar un cuadro de selección con opciones ")

Representa un `<select>` con una lista de componentes `<option>` dentro para mostrar un cuadro de selección. Asigna a cada `<option>` un `value` que represente los datos que se enviarán con el formulario.

[Obtén más información sobre cómo mostrar un `<select>` con una lista de componentes `<option>`.](https://es.react.dev/reference/react-dom/components/select)
