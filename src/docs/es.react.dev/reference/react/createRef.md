---
title: createRef – React
source: https://es.react.dev/reference/react/createRef
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# createRef – React

`createRef` crea un objeto [ref](https://es.react.dev/learn/referencing-values-with-refs) que puede contener un valor arbitrario.

```
class MyInput extends Component {inputRef = createRef();// ...}
```

*   [Referencia](#reference)
    *   [`createRef()`](#createref)
*   [Uso](#usage)
    *   [Declarar una referencia en un componente de clase](#declaring-a-ref-in-a-class-component)
*   [Alternativas](#alternatives)
    *   [Migrando de una clase con `createRef` a una función con `useRef`](#migrating-from-a-class-with-createref-to-a-function-with-useref)

* * *

## Referencia[](#reference "Link for Referencia ")

### `createRef()`[](#createref "Link for this heading")

Invoca a `createRef` para declarar una [ref](https://es.react.dev/learn/referencing-values-with-refs) dentro de un [componente de clase.](https://es.react.dev/reference/react/Component)

```
import { createRef, Component } from 'react';class MyComponent extends Component {intervalRef = createRef();inputRef = createRef();// ...
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

`createRef` no recibe parámetros.

#### Devuelve[](#returns "Link for Devuelve ")

`createRef` devuelve un objeto con una única propiedad:

*   `current`: Inicialmente, se inicializa en `null`. Posteriormente, se puede asignar a cualquier otra cosa. Si pasas el objeto ref a React como un atributo `ref` de un nodo JSX, React asignará su propiedad `current`.

#### Advertencias[](#caveats "Link for Advertencias ")

*   `createRef` siempre devuelve un objeto _diferente_. Es equivalente a escribir `{ current: null }` manualmente.
*   En un componente de función, probablemente querrás usar [`useRef`](https://es.react.dev/reference/react/useRef) en su lugar, que siempre devuelve el mismo objeto.
*   `const ref = useRef()` es equivalente a `const [ref, _] = useState(() => createRef(null))`.

* * *

## Uso[](#usage "Link for Uso ")

### Declarar una referencia en un componente de clase[](#declaring-a-ref-in-a-class-component "Link for Declarar una referencia en un componente de clase ")

Para declarar una referencia ref dentro de un [componente de clase](https://es.react.dev/reference/react/Component), invoca a `createRef` y asigna el resultado a un campo de clase:

```
import { Component, createRef } from 'react';class Form extends Component {inputRef = createRef();// ...}
```

Si ahora pasas `ref={this.inputRef}` a un `<input>` en tu JSX, React llenará `this.inputRef.current` con el nodo del DOM del input. Por ejemplo, así es como puedes crear un botón que enfoca el input:

### Atención

`createRef` se usa principalmente para [componentes de clase](https://es.react.dev/reference/react/Component). Los componentes de función generalmente dependen de [`useRef`](https://es.react.dev/reference/react/useRef) en su lugar.

* * *

## Alternativas[](#alternatives "Link for Alternativas ")

### Migrando de una clase con `createRef` a una función con `useRef`[](#migrating-from-a-class-with-createref-to-a-function-with-useref "Link for this heading")

Recomendamos utilizar componentes de función en lugar de [componentes de clase](https://es.react.dev/reference/react/Component) en código nuevo. Si tienes componentes de clase existentes que utilizan `createRef`, así es cómo puedes convertirlos. Este es el código original:
