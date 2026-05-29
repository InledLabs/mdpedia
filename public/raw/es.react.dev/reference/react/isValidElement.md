---
title: isValidElement – React
source: https://es.react.dev/reference/react/isValidElement
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# isValidElement – React

`isValidElement` comprueba si un valor es un elemento de React.

```
const isElement = isValidElement(value)
```

*   [Referencia](#reference)
    *   [`isValidElement(value)`](#isvalidelement)
*   [Uso](#usage)
    *   [Comprobar si algo es un elemento de React](#checking-if-something-is-a-react-element)

* * *

## Referencia[](#reference "Link for Referencia ")

### `isValidElement(value)`[](#isvalidelement "Link for this heading")

Llama a `isValidElement(value)` para comprobar si `value` es un elemento de React.

```
import { isValidElement, createElement } from 'react';// ✅ Elementos de Reactconsole.log(isValidElement(<p />)); // verdaderoconsole.log(isValidElement(createElement('p'))); // verdadero// ❌ No son elementos de Reactconsole.log(isValidElement(25)); // falsoconsole.log(isValidElement('Hola')); // falsoconsole.log(isValidElement({ age: 42 })); // falso
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `value`: El `valor` que deseas comprobar. Puede ser cualquier valor de cualquier tipo.

#### Devuelve[](#returns "Link for Devuelve ")

`isValidElement` devuelve `true` si `value` es un elemento de React. En caso contrario, devuelve `false`.

#### Advertencias[](#caveats "Link for Advertencias ")

*   **Sólo las [etiquetas JSX](https://es.react.dev/learn/writing-markup-with-jsx) y los objetos devueltos por [`createElement`](https://es.react.dev/reference/react/createElement) se consideran elementos de React.** Por ejemplo, aunque un número como `42` es un _nodo_ de React válido (y puede ser devuelto desde un componente), no es un elemento de React válido. Los arrays y portales creados con [`createPortal`](https://es.react.dev/reference/react-dom/createPortal) tampoco se consideran elementos de React.

* * *

## Uso[](#usage "Link for Uso ")

### Comprobar si algo es un elemento de React[](#checking-if-something-is-a-react-element "Link for Comprobar si algo es un elemento de React ")

Llama `isValidElement` para comprobar si algún valor es un _elemento de React._

Los elementos de React son:

*   Los valores producidos al escribir una [etiqueta JSX](https://es.react.dev/learn/writing-markup-with-jsx)
*   Los valores producidos por llamar [`createElement`](https://es.react.dev/reference/react/createElement)

Para los elementos de React, `isValidElement` devuelve `true`:

```
import { isValidElement, createElement } from 'react';// ✅ Las etiquetas JSX son elementos de Reactconsole.log(isValidElement(<p />)); // verdaderoconsole.log(isValidElement(<MyComponent />)); // verdadero// ✅ Los valores devueltos por createElement son elementos de Reactconsole.log(isValidElement(createElement('p'))); // verdaderoconsole.log(isValidElement(createElement(MyComponent))); // verdadero
```

Cualquier otro valor, como _strings_, números u objetos arbitrarios y _arrays_, no son elementos de React.

Para ellos, `isValidElement` devuelve `false`:

```
// ❌ Estos *no* son elementos de Reactconsole.log(isValidElement(null)); // falsoconsole.log(isValidElement(25)); // falsoconsole.log(isValidElement('Hola')); // falsoconsole.log(isValidElement({ age: 42 })); // falsoconsole.log(isValidElement([<div />, <div />])); // falsoconsole.log(isValidElement(MyComponent)); // falso
```

Es muy poco común necesitar `isValidElement`. Es más útil si estás llamando a otra API que _sólo_ acepta elementos (como hace [`cloneElement`](https://es.react.dev/reference/react/cloneElement) y quieres evitar un error cuando tu argumento no es un elemento de React.

A menos que tengas alguna razón muy específica para añadir una comprobación con `isValidElement`, probablemente no la necesites.

##### Profundizar

#### Elementos de React vs nodos de React[](#react-elements-vs-react-nodes "Link for Elementos de React vs nodos de React ")

Cuando escribas un componente, puedes devolver cualquier tipo de _nodo de React_ de él:

```
function MyComponent() {// ... puedes devolver cualquier nodo de React ...}
```

Un nodo de React puede ser:

*   Un elemento de React creado como `<div />` o `createElement('div')`
*   Un portal creado con [`createPortal`](https://es.react.dev/reference/react-dom/createPortal)
*   Un _string_
*   Un número
*   `true`, `false`, `null`, o `undefined` (que no se visualizan)
*   Un _array_ de otros nodos de React

**Nota que `isValidElement` comprueba si el argumento es un _elemento de React,_ no si es un nodo de React.** Por ejemplo, `42` no es un elemento de React válido. Sin embargo, es un nodo de React perfectamente válido:

```
function MyComponent() {return 42; // Está bien devolver un número del componente}
```

Por eso no deberías usar `isValidElement` como forma de comprobar si algo puede ser renderizado.
