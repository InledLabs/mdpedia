---
title: <Profiler> – React
source: https://es.react.dev/reference/react/Profiler
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# <Profiler> – React

`<Profiler>` te permite medir el rendimiento del renderizado de un árbol de componentes de React de forma programática.

```
<Profiler id="App" onRender={onRender}><App /></Profiler>
```

*   [Referencia](#reference)
    *   [`<Profiler>`](#profiler)
    *   [`onRender` callback](#onrender-callback)
*   [Uso](#usage)
    *   [Medición del rendimiento de renderizado programáticamente](#measuring-rendering-performance-programmatically)
    *   [Medición de diferentes partes de la aplicación](#measuring-different-parts-of-the-application)

* * *

## Referencia[](#reference "Link for Referencia ")

### `<Profiler>`[](#profiler "Link for this heading")

Envuelve un árbol de componentes en un `<Profiler>` para medir su rendimiento de renderizado.

```
<Profiler id="App" onRender={onRender}><App /></Profiler>
```

#### Props[](#props "Link for Props ")

*   `id`: Un string que identifica qué parte de la interfaz de usuario estás midiendo.
*   `onRender`: Un [_callback_ `onRender`](#onrender-callback) que React llama cada vez que los componentes dentro del árbol perfilado se actualizan. Recibe información sobre lo que se renderizó y cuánto tiempo llevó.

#### Advertencias[](#caveats "Link for Advertencias ")

*   El perfilado agrega cierta sobrecarga adicional, por lo que **está deshabilitado en la versión de producción de manera predeterminada.** Para optar por el perfilado en producción, debes habilitar una [versión especial de producción con el perfilado habilitado.](https://fb.me/react-profiling)

* * *

### `onRender` callback[](#onrender-callback "Link for this heading")

React llamará tu _callback_ `onRender` con información sobre lo que se renderizó.

```
function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {// Agregar o registrar tiempos de procesamiento...}
```

#### Parámetros[](#onrender-parameters "Link for Parámetros ")

*   `id`: La prop `id` del árbol `<Profiler>` que acaba de ser entregado. Esto te permite identificar qué parte del árbol se entregó si estás usando varios perfiles.
*   `phase`: `"mount"`, `"update"` o `"nested-update"`. Esto te indica si el árbol acaba de ser montado por primera vez o se ha vuelto a renderizar debido a un cambio en las props, el estado o los Hooks.
*   `actualDuration`: El número de milisegundos que se tardó en renderizar el árbol `<Profiler>` Esto indica qué tan bien el subárbol hace uso de la memoización (por ejemplo, [`memo`](https://es.react.dev/reference/react/memo) y [`useMemo`](https://es.react.dev/reference/react/useMemo)). Idealmente, este valor debería disminuir significativamente después del montaje inicial, ya que muchos de los descendientes solo necesitarán volver a renderizarse si cambian sus propiedades específicas.
*   `baseDuration`: El número de milisegundos que estima cuánto tiempo tardaría en volver a renderizar todo el subárbol `<Profiler>` sin ninguna optimización. Se calcula sumando las duraciones de renderizado más recientes de cada componente en el árbol. Este valor estima el costo del renderizado para el peor de caso (por ejemplo, el montaje inicial o un árbol sin memoización). Compara `actualDuration` con este valor para ver si la memorización está funcionando.
*   `startTime`: Una marca de tiempo numérica para cuando React comenzó a renderizar la actualización actual.
*   `commitTime`: Una marca de tiempo numérica para cuando React entregó la actualización actual. Este valor se comparte entre todos los perfiles en una entrega, lo que permite agruparlos si es deseable.

* * *

## Uso[](#usage "Link for Uso ")

### Medición del rendimiento de renderizado programáticamente[](#measuring-rendering-performance-programmatically "Link for Medición del rendimiento de renderizado programáticamente ")

Envuelve el componente `<Profiler>` alrededor de un árbol de React para medir su rendimiento de renderizado.

```
<App><Profiler id="Sidebar" onRender={onRender}><Sidebar /></Profiler><PageContent /></App>
```

Se requieren dos props: un `id` (string) y un _callback_ `onRender` (function) que React llama cada vez que un componente dentro del árbol “comete” una actualización.

### Nota

`<Profiler>` te permite recopilar mediciones de forma programática. Si estás buscando un perfilador interactivo, prueba la pestaña Profiler en las [Herramientas de Desarrollo de React](https://es.react.dev/learn/react-developer-tools). Expone funcionalidades similares a una extensión del navegador.

* * *

### Medición de diferentes partes de la aplicación[](#measuring-different-parts-of-the-application "Link for Medición de diferentes partes de la aplicación ")

Puedes usar varios componentes `<Profiler>` para medir diferentes partes de tu aplicación:

```
<App><Profiler id="Sidebar" onRender={onRender}><Sidebar /></Profiler><Profiler id="Content" onRender={onRender}><Content /></Profiler></App>
```

También puedes anidar componentes `<Profiler>`:

```
<App><Profiler id="Sidebar" onRender={onRender}><Sidebar /></Profiler><Profiler id="Content" onRender={onRender}><Content><Profiler id="Editor" onRender={onRender}><Editor /></Profiler><Preview /></Content></Profiler></App>
```

Aunque `<Profiler>` es un componente ligero, debería ser usado solo cuando sea necesario. Cada uso añade una sobrecarga de CPU y memoria a una aplicación.

* * *
