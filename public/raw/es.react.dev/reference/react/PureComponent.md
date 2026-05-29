---
title: PureComponent – React
source: https://es.react.dev/reference/react/PureComponent
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# PureComponent – React

### Atención

Recomendamos definir los componentes como funciones en lugar de clases. [Ver cómo migrar.](#alternatives)

`PureComponent` es parecido a [`Component`](https://es.react.dev/reference/react/Component) pero se salta los rerenderizados para las mismas props y estado. Los componentes de clase todavía son compatibles con React, pero no recomendamos usarlos en código nuevo.

```
class Greeting extends PureComponent {render() {return <h1>¡Hola, {this.props.name}!</h1>;}}
```

*   [Referencia](#reference)
    *   [`PureComponent`](#purecomponent)
*   [Uso](#usage)
    *   [Omitir renderizados innecesarios para componentes de clase](#skipping-unnecessary-re-renders-for-class-components)
*   [Alternativas](#alternatives)
    *   [Migración de un componente de clase `PureComponent` a una función](#migrating-from-a-purecomponent-class-component-to-a-function)

* * *

## Referencia[](#reference "Link for Referencia ")

### `PureComponent`[](#purecomponent "Link for this heading")

Para omitir volver a renderizar un componente de clase para las mismas props y estado, extiende `PureComponent` en lugar de [`Component`:](https://es.react.dev/reference/react/Component)

```
import { PureComponent } from 'react';class Greeting extends PureComponent {render() {return <h1>¡Hola, {this.props.name}!</h1>;}}
```

`PureComponent` es una subclase de `Component` y admite [todas las APIs de `Component`.](https://es.react.dev/reference/react/Component#reference) Extender `PureComponent` es equivalente a definir un método personalizado [`shouldComponentUpdate`](https://es.react.dev/reference/react/Component#shouldcomponentupdate) que compara superficialmente las props y el estado.

[Ver más ejemplos abajo.](#usage)

* * *

## Uso[](#usage "Link for Uso ")

### Omitir renderizados innecesarios para componentes de clase[](#skipping-unnecessary-re-renders-for-class-components "Link for Omitir renderizados innecesarios para componentes de clase ")

React normalmente rerenderiza un componente cada vez que su padre se rerenderiza. Como optimización, puedes crear un componente que React no rerenderizará cuando su padre se renderice, siempre que sus props y estado nuevos sean los mismos que los anteriores. [Los componentes de clase](https://es.react.dev/reference/react/Component) pueden optar por este comportamiento extendiendo `PureComponent`:

```
class Greeting extends PureComponent {render() {return <h1>¡Hola, {this.props.name}!</h1>;}}
```

Un componente de React siempre debe tener [lógica de renderizado pura.](https://es.react.dev/learn/keeping-components-pure) Esto significa que debe devolver el mismo resultado si sus props, estado y contexto no han cambiado. Al usar `PureComponent`, le estás diciendo a React que tu componente cumple con este requisito, por lo que React no necesita volver a renderizar siempre que sus props y estado no hayan cambiado. Sin embargo, tu componente aún se rerenderizará si cambia un contexto que esté usando.

En este ejemplo, observa que el componente `Greeting` se vuelve a renderizar cada vez que se cambia `name` (porque es una de sus props), pero no cuando se cambia `address` (porque no se pasa a `Greeting` como prop):

### Atención

Recomendamos definir los componentes como funciones en lugar de clases. [Ver cómo migrar.](#alternatives)

* * *

## Alternativas[](#alternatives "Link for Alternativas ")

### Migración de un componente de clase `PureComponent` a una función[](#migrating-from-a-purecomponent-class-component-to-a-function "Link for this heading")

Recomendamos usar componentes de función en lugar de [componentes de clase](https://es.react.dev/reference/react/Component) en código nuevo. Si tienes algunos componentes de clase existentes que usan `PureComponent`, te mostramos como puedes convertirlos. Este es el código original:
