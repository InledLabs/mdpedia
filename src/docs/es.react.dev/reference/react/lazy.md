---
title: lazy – React
source: https://es.react.dev/reference/react/lazy
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# lazy – React

`lazy` te permite diferir la carga del código del componente hasta que se renderice por primera vez.

```
const SomeComponent = lazy(load)
```

*   [Referencia](#reference)
    *   [`lazy(load)`](#lazy)
    *   [Función `load`](#load)
*   [Uso](#usage)
    *   [Componentes de carga diferida con Suspense](#suspense-for-code-splitting)
*   [Solución de problemas](#troubleshooting)
    *   [Mi estado del componente `lazy` se reinicia inesperadamente](#my-lazy-components-state-gets-reset-unexpectedly)

* * *

## Referencia[](#reference "Link for Referencia ")

### `lazy(load)`[](#lazy "Link for this heading")

Llama a `lazy` fuera de tus componentes para declarar un componente de carga diferida:

```
import { lazy } from 'react';const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `load`: Una función que devuelve una [Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise) u otro _thenable_ (un objeto tipo Promise con un método `then`). React no llamará a `load` hasta la primera vez que intentes renderizar el componente devuelto. Después de que React llame por primera vez a `load`, esperará a que se resuelva, y entonces renderizará el valor resuelto `.default` como un componente React. Tanto la Promise devuelta como el valor resuelto de la Promise se almacenarán en caché, por lo que React no llamará a `load` más de una vez. Si la Promise es rechazada, React lanzará el motivo de rechazo a la barrera de error más cercana.

#### Devuelve[](#returns "Link for Devuelve ")

`lazy` devuelve un componente React que puedes renderizar en tu árbol. Mientras el código del componente lazy sigue cargando, el intento de renderizarlo se _suspenderá._ Usa [`<Suspense>`](https://es.react.dev/reference/react/Suspense) para mostrar un indicador de carga mientras se carga.

* * *

### Función `load`[](#load "Link for this heading")

#### Parámetros[](#load-parameters "Link for Parámetros ")

`load` no recibe parámetros.

#### Devuelve[](#load-returns "Link for Devuelve ")

Necesitas devolver una [Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise) o algún otro _thenable_ (un objeto tipo Promise con un método `then`). Es necesario que eventualmente resuelva a un objeto cuya propiedad `.default` sea un tipo de componente React válido, como una función, [`memo`](https://es.react.dev/reference/react/memo), o un componente [`forwardRef`](https://es.react.dev/reference/react/forwardRef).

* * *

## Uso[](#usage "Link for Uso ")

### Componentes de carga diferida con Suspense[](#suspense-for-code-splitting "Link for Componentes de carga diferida con Suspense ")

Por lo general, importas componentes con la declaración estática [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import):

```
import MarkdownPreview from './MarkdownPreview.js';
```

Para diferir la carga del código de este componente hasta que se renderice por primera vez, reemplaza esta importación con:

```
import { lazy } from 'react';const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
```

Este código se basa en [`import()` dinámico](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import), que puede requerir el soporte de tu empaquetador o framework. Usar este patrón requiere que el componente lazy que estás importando haya sido exportado como export `default`.

Ahora que el código de tu componente se carga bajo demanda, también debes especificar qué debe mostrarse mientras se carga. Puedes hacer esto envolviendo el componente lazy o cualquiera de sus padres en una barrera de [`<Suspense>`](https://es.react.dev/reference/react/Suspense):

```
<Suspense fallback={<Loading />}><h2>Preview</h2><MarkdownPreview /></Suspense>
```

En este ejemplo, el código para `MarkdownPreview` no se cargará hasta que intentes renderizarlo. Si `MarkdownPreview` aún no se ha cargado, `Loading` se mostrará en su lugar. Intenta marcar el checkbox:

Esta demostración se carga con un retraso artificial. La próxima vez que desmarques y marques el checkbox, `Preview` se almacenará en caché, por lo que no se mostrará ningún estado de carga. Para ver nuevamente el estado de carga, haz clic en “Reiniciar” en el sandbox.

[Obtén más información sobre cómo administrar los estados de carga con Suspense.](https://es.react.dev/reference/react/Suspense)

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### Mi estado del componente `lazy` se reinicia inesperadamente[](#my-lazy-components-state-gets-reset-unexpectedly "Link for this heading")

No declarares componentes `lazy` _dentro_ de otros componentes:

```
import { lazy } from 'react';function Editor() {// 🔴 Mal: Esto causará que todo el estado se reinicie en los re-renderizados.const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));// ...}
```

En cambio, decláralos siempre en el nivel superior de tu módulo:

```
import { lazy } from 'react';// ✅ Bien: Declarar componentes lazy fuera de tus componentesconst MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));function Editor() {// ...}
```
