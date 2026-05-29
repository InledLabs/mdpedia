---
title: hydrateRoot – React
source: https://es.react.dev/reference/react-dom/client/hydrateRoot
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../../_index.md).

---

# hydrateRoot – React

`hydrateRoot` te permite mostrar componentes de React dentro de un nodo DOM del navegador cuyo contenido HTML fue generado previamente por [`react-dom/server`.](https://es.react.dev/reference/react-dom/server)

```
const root = hydrateRoot(domNode, reactNode, options?)
```

*   [Referencia](#reference)
    *   [`hydrateRoot(domNode, reactNode, options?)`](#hydrateroot)
    *   [`root.render(reactNode)`](#root-render)
    *   [`root.unmount()`](#root-unmount)
*   [Uso](#usage)
    *   [Hidratación de HTML renderizado en el servidor](#hydrating-server-rendered-html)
    *   [Hidratar un documento completo](#hydrating-an-entire-document)
    *   [Suprimir errores inevitables de desajuste de hidratación](#suppressing-unavoidable-hydration-mismatch-errors)
    *   [Manejar diferentes contenidos de cliente y servidor](#handling-different-client-and-server-content)
    *   [Actualización de un componente raíz hidratado](#updating-a-hydrated-root-component)
    *   [Error logging in production](#error-logging-in-production)
*   [Troubleshooting](#troubleshooting)
    *   [I’m getting an error: “You passed a second argument to root.render”](#im-getting-an-error-you-passed-a-second-argument-to-root-render)

* * *

## Referencia[](#reference "Link for Referencia ")

### `hydrateRoot(domNode, reactNode, options?)`[](#hydrateroot "Link for this heading")

Llama a `hydrateRoot` para “adjuntar” React al HTML existente que ya fue renderizado por React en un entorno del servidor.

```
import { hydrateRoot } from 'react-dom/client';const domNode = document.getElementById('root');const root = hydrateRoot(domNode, reactNode);
```

React se unirá al HTML que existe dentro de `domNode`, y se encargará de gestionar el DOM dentro de él. Una aplicación completamente construida con React normalmente sólo tendrá una llamada a `hydrateRoot` con su componente raíz.

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `domNode`: Un [elemento del DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element) que se ha renderizado como el elemento raíz en el servidor.
    
*   `reactNode`: El “nodo de React” utilizado para renderizar el HTML existente. Normalmente será un trozo de JSX como `<App />` que se ha renderizado con un método de `ReactDOM Server` como `renderToPipeableStream(<App />)`.
    
*   **opcional** `options`: Un objeto que contiene opciones para esta raíz de React.
    
    *   **optional** `onCaughtError`: Callback called when React catches an error in an Error Boundary. Called with the `error` caught by the Error Boundary, and an `errorInfo` object containing the `componentStack`.
    *   **optional** `onUncaughtError`: Callback called when an error is thrown and not caught by an Error Boundary. Called with the `error` that was thrown and an `errorInfo` object containing the `componentStack`.
    *   **optional** `onRecoverableError`: Callback called when React automatically recovers from errors. Called with the `error` React throws, and an `errorInfo` object containing the `componentStack`. Some recoverable errors may include the original error cause as `error.cause`.
    *   **opcional** `identifierPrefix`: Prefijo que React utiliza para los IDs generados por [`useId`.](https://es.react.dev/reference/react/useId) Útil para evitar conflictos cuando se utilizan varias raíces en la misma página. Debe ser el mismo prefijo que se utiliza en el servidor.

#### Devuelve[](#returns "Link for Devuelve ")

`hydrateRoot` devuelve un objeto con dos métodos: [`render`](#root-render) y [`unmount`.](#root-unmount)

#### Advertencias[](#caveats "Link for Advertencias ")

*   `hydrateRoot()` espera que el contenido renderizado sea idéntico al contenido renderizado por el servidor. Deberías tratar los desajustes como errores y solucionarlos.
*   En el modo de desarrollo, React avisa de los desajustes durante la hidratación. No hay garantías de que las diferencias de atributos sean parcheadas en caso de desajustes. Esto es importante por razones de rendimiento, ya que en la mayoría de las aplicaciones, los desajustes son raros, por lo que validar todo el marcado sería prohibitivamente caro.
*   Es probable que sólo tengas una llamada a `hydrateRoot` en tu aplicación. Si utilizas un _framework_, puede que la haga por ti.
*   Si tu aplicación está renderizada en el cliente y no tiene HTML renderizado, el uso de `hydrateRoot()` no es válido. Utiliza [`createRoot()`](https://es.react.dev/reference/react-dom/client/createRoot) en su lugar.

* * *

### `root.render(reactNode)`[](#root-render "Link for this heading")

Llama a `root.render` para actualizar un componente de React dentro de una raíz de React hidratada para un elemento DOM del navegador.

```
root.render(<App />);
```

React actualizará `<App />` en la raíz hidratada (`root`).

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#root-render-parameters "Link for Parámetros ")

*   `reactNode`: Un “nodo de React” que quieres actualizar. Normalmente será un trozo de JSX como `<App />`, pero también puedes pasar un elemento React construido con [`createElement()`.](https://es.react.dev/reference/react/createElement), un _string_, un número, `null`, o `undefined`.

#### Devuelve[](#root-render-returns "Link for Devuelve ")

`root.render` devuelve `undefined`.

#### Advertencias[](#root-render-caveats "Link for Advertencias ")

*   Si llamas a `root.render` antes de que la raíz haya terminado de hidratarse, React borrará el contenido HTML existente renderizado por el servidor y cambiará toda la raíz a renderizado del cliente.

* * *

### `root.unmount()`[](#root-unmount "Link for this heading")

Llama a `root.unmount` para destruir un árbol renderizado dentro de una raíz de React.

```
root.unmount();
```

Una aplicación completamente construida con React normalmente no tendrá ninguna llamada a `root.unmount`.

Esto es útil mayormente si el nodo DOM de tu raíz de React (o cualquiera de sus ancestros) puede ser eliminado del DOM por algún otro código. Por ejemplo, imagina un panel de pestañas jQuery que elimina las pestañas inactivas del DOM. Si se elimina una pestaña, todo lo que hay dentro de ella (incluyendo las raíces React que hay dentro) se eliminará también del DOM. En ese caso, tienes que decirle a React que “deje” de gestionar el contenido de la raíz eliminada llamando a `root.unmount`. De lo contrario, los componentes dentro de la raíz eliminada no sabrán limpiar y liberar recursos globales como las suscripciones.

Al llamar a `root.unmount` se desmontarán todos los componentes de la raíz y se “separará” React del nodo DOM raíz, incluyendo la eliminación de cualquier controlador de evento o estado en el árbol.

#### Parámetros[](#root-unmount-parameters "Link for Parámetros ")

`root.unmount` no acepta ningún parámetro.

#### Devuelve[](#root-unmount-returns "Link for Devuelve ")

`root.unmount` devuelve `undefined`.

#### Advertencias[](#root-unmount-caveats "Link for Advertencias ")

*   Llamando a `root.unmount` se desmontarán todos los componentes del árbol y se “separará” React del nodo DOM raíz.
    
*   Una vez que se llama a `root.unmount` no se puede volver a llamar a `root.render` en la raíz. El intento de llamar a `root.render` en una raíz desmontada arrojará el error “Cannot update an unmounted root” (No se puede actualizar una raíz desmontada).
    

* * *

## Uso[](#usage "Link for Uso ")

### Hidratación de HTML renderizado en el servidor[](#hydrating-server-rendered-html "Link for Hidratación de HTML renderizado en el servidor ")

Si el HTML de tu aplicación fue generado por [`react-dom/server`](https://es.react.dev/reference/react-dom/client/createRoot), hay que _hidratarlo_ en el cliente.

```
import { hydrateRoot } from 'react-dom/client';hydrateRoot(document.getElementById('root'), <App />);
```

Esto hidratará el HTML del servidor dentro del nodo DOM del navegador con el componente de React para tu aplicación. Por lo general, lo harás una vez al inicio. Si utilizas un _framework_, puede que tras bambalinas lo haga por ti.

Para hidratar tu aplicación, React “adjuntará” la lógica de tus componentes al HTML inicial generado desde el servidor. La hidratación convierte la instantánea inicial de HTML del servidor en una aplicación totalmente interactiva que se ejecuta en el navegador.

No deberías necesitar llamar a `hydrateRoot` de nuevo o llamarlo en más sitios. A partir de este punto, React gestionará el DOM de tu aplicación. Si quieres actualizar la interfaz de usuario, tus componentes pueden hacerlo [usando el estado.](https://es.react.dev/reference/react/useState)

### Atención

El árbol de React que pases a `hydrateRoot` tiene que producir **la misma salida** que en el servidor.

Esto es importante para la experiencia del usuario. El usuario pasará algún tiempo mirando el HTML generado por el servidor antes de que se cargue tu código JavaScript. El renderizado del servidor crea la ilusión de que la aplicación se carga más rápido al mostrar la instantánea del HTML de su salida. Mostrar de repente un contenido diferente rompe esa ilusión. Por ello, la salida de renderizado del servidor debe coincidir con la salida del renderizado inicial en el cliente durante la hidratación.

Las causas más comunes que conducen a errores de hidratación incluyen:

*   Espacios en blanco extra (como nuevas líneas) alrededor del HTML generado por React dentro del nodo raíz.
*   Utilizar comprobaciones como `typeof window !== 'undefined'` en tu lógica de renderizado.
*   Utilizar APIs exclusivas del navegador como [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) en tu lógica de renderizado.
*   Renderizar datos diferentes en el servidor y en el cliente.

React puede recuperarse de algunos errores de hidratación, pero **debes solucionarlos como cualquier otro error.** En el mejor de los casos, conducirán a una aplicación más lenta; en el peor, los controladores de eventos se adjuntarán a los elementos equivocados.

* * *

### Hidratar un documento completo[](#hydrating-an-entire-document "Link for Hidratar un documento completo ")

Las aplicaciones construidas completamente con React pueden renderizar un documento completo a partir del componente raíz, incluyendo la etiqueta [`html`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html):

```
function App() {return (<html><head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><link rel="stylesheet" href="/styles.css"></link><title>My app</title></head><body><Router /></body></html>);}
```

Para hidratar el documento completo, pasa la variable global [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Window/document) como primer argumento a `hydrateRoot`:

```
import { hydrateRoot } from 'react-dom/client';import App from './App.js';hydrateRoot(document, <App />);
```

* * *

### Suprimir errores inevitables de desajuste de hidratación[](#suppressing-unavoidable-hydration-mismatch-errors "Link for Suprimir errores inevitables de desajuste de hidratación ")

Si el atributo o contenido de texto de un único elemento es inevitablemente diferente entre el servidor y el cliente (por ejemplo, una marca de tiempo), puede silenciar la advertencia de desajuste de hidratación.

Para silenciar las advertencias de hidratación en un elemento, agrega `suppressHydrationWarning={true}`:

Esto sólo funciona a un nivel de profundidad, y pretende ser una vía de escape. No abuses de su uso. A menos que sea contenido de texto, React aún no intentará parchearlo, por lo que puede permanecer inconsistente hasta futuras actualizaciones.

* * *

### Manejar diferentes contenidos de cliente y servidor[](#handling-different-client-and-server-content "Link for Manejar diferentes contenidos de cliente y servidor ")

Si intencionalmente necesitas renderizar algo diferente en el servidor y en el cliente, puedes hacer un renderizado de dos pasadas. Los componentes que renderizan algo diferente en el cliente pueden leer una [variable de estado](https://es.react.dev/reference/react/useState) como `isClient`, que puedes establecer en `true` en un [Efecto](https://es.react.dev/reference/react/useEffect):

De esta forma el pase de render inicial renderizará el mismo contenido que el servidor, evitando desajustes, pero un pase adicional sucederá de forma sincrónica justo después de la hidratación.

### Atención

Este enfoque hace que la hidratación sea más lenta porque sus componentes tienen que renderizar dos veces. Tenga en cuenta la experiencia del usuario en conexiones lentas. El código JavaScript puede cargarse significativamente más tarde que el renderizado HTML inicial, por lo que renderizar una interfaz de usuario diferente inmediatamente después de la hidratación también puede resultar molesto para el usuario.

* * *

### Actualización de un componente raíz hidratado[](#updating-a-hydrated-root-component "Link for Actualización de un componente raíz hidratado ")

Después de que la raíz haya terminado de hidratarse, puedes llamar a [`root.render`](#root-render) para actualizar el componente raíz de React. **Al contrario que con [`createRoot`](https://es.react.dev/reference/react-dom/client/createRoot), normalmente no es necesario hacerlo porque el contenido inicial ya se ha renderizado como HTML.**

Si llamas a `root.render` en algún momento después de la hidratación, y la estructura del árbol de componentes coincide con lo que se renderizó previamente, React [preservará el estado.](https://es.react.dev/learn/preserving-and-resetting-state) Fíjate que puedes escribir en la entrada de texto, lo que significa que las actualizaciones de las llamadas sucesivas a `render` cada segundo en este ejemplo no son destructivas:

Es poco común llamar a [`root.render`](#root-render) en una raíz hidratada. Por lo general, lo que deberías hacer es [actualizar el estado](https://es.react.dev/reference/react/useState) dentro de uno de los componentes.

### Error logging in production[](#error-logging-in-production "Link for Error logging in production ")

By default, React will log all errors to the console. To implement your own error reporting, you can provide the optional error handler root options `onUncaughtError`, `onCaughtError` and `onRecoverableError`:

```
import { hydrateRoot } from "react-dom/client";import App from "./App.js";import { reportCaughtError } from "./reportError";const container = document.getElementById("root");const root = hydrateRoot(container, <App />, {onCaughtError: (error, errorInfo) => {if (error.message !== "Known error") {reportCaughtError({error,componentStack: errorInfo.componentStack,});}},});
```

The onCaughtError option is a function called with two arguments:

1.  The error that was thrown.
2.  An errorInfo object that contains the componentStack of the error.

Together with `onUncaughtError` and `onRecoverableError`, you can implement your own error reporting system:

import { hydrateRoot } from "react-dom/client";
import App from "./App.js";
import {
  onCaughtErrorProd,
  onRecoverableErrorProd,
  onUncaughtErrorProd,
} from "./reportError";

const container = document.getElementById("root");
hydrateRoot(container, <App />, {
  
  
  
  onCaughtError: onCaughtErrorProd,
  onRecoverableError: onRecoverableErrorProd,
  onUncaughtError: onUncaughtErrorProd,
});

## Troubleshooting[](#troubleshooting "Link for Troubleshooting ")

### I’m getting an error: “You passed a second argument to root.render”[](#im-getting-an-error-you-passed-a-second-argument-to-root-render "Link for I’m getting an error: “You passed a second argument to root.render” ")

A common mistake is to pass the options for `hydrateRoot` to `root.render(...)`:

Console

Warning: You passed a second argument to root.render(…) but it only accepts one argument.

To fix, pass the root options to `hydrateRoot(...)`, not `root.render(...)`:

```
// 🚩 Wrong: root.render only takes one argument.root.render(App, {onUncaughtError});// ✅ Correct: pass options to createRoot.const root = hydrateRoot(container, <App />, {onUncaughtError});
```
