---
title: use – React
source: https://es.react.dev/reference/react/use
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# use – React

`use` es una API de React que te permite leer el valor de un recurso como una [Promesa](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise) o [contexto](https://es.react.dev/learn/passing-data-deeply-with-context).

```
const value = use(resource);
```

*   [Referencia](#reference)
    *   [`use(resource)`](#use)
*   [Uso](#usage)
    *   [Leer contexto con `use`](#reading-context-with-use)
    *   [Transmisión de datos del servidor al cliente (streaming)](#streaming-data-from-server-to-client)
    *   [Lidiar con las promesas rechazadas](#dealing-with-rejected-promises)
*   [Solución de problemas](#troubleshooting)
    *   [“Excepción de Suspense: ¡Esto no es un error real!”](#suspense-exception-error)

* * *

## Referencia[](#reference "Link for Referencia ")

### `use(resource)`[](#use "Link for this heading")

Llama a `use` en tu componente para leer el valor de un recurso como una [Promesa](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise) o [contexto](https://es.react.dev/learn/passing-data-deeply-with-context).

```
import { use } from 'react';function MessageComponent({ messagePromise }) {const message = use(messagePromise);const theme = use(ThemeContext);// ...
```

A diferencia de los Hooks de React, `use` puede ser llamado dentro de bucles y condicionales como `if`. Al igual que otros Hooks de React, la función que llama a `use` tiene que ser un componente o Hook.

Cuando es llamado con una Promesa, la API `use` se integra con [`Suspense`](https://es.react.dev/reference/react/Suspense) y [barreras de error](https://es.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary). El componente que llama a `use` _se suspende_ mientras que la Promesa pasada a `use` es pendiente. Si el componente que llama a `use` es envuelto en una barrera de Suspense, el fallback será mostrado. Una vez que la Promesa es resuelta, el fallback de Suspense es remplazada por los componentes renderizados usando los datos devueltos por la API `use`. Si la Promesa pasada a `use` es rechazada, se mostrará el fallback del error mas cercano a la barrera de error.

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `resource`: esta es la fuente de los datos de los que quieres leer un valor. Un recurso puede ser una [Promesa](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise) o un [contexto](https://es.react.dev/learn/passing-data-deeply-with-context).

#### Devuelve[](#returns "Link for Devuelve ")

La API `use` devuelve el valor que se leyó del recurso como el valor resuelto de una [Promesa](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise) o [contexto](https://es.react.dev/learn/passing-data-deeply-with-context).

#### Advertencias[](#caveats "Link for Advertencias ")

*   La API `use` debe ser llamado dentro de un componente o un Hook.
*   Cuando se recupera datos en un [Componente del Servidor](https://es.react.dev/reference/rsc/server-components), se prefiere el uso de `async` y `await` por encima de `use`. `async` y `await` retoman el renderizado desde el punto donde se invocó `await`, mientras que `use` vuelve a renderizar el componente después de que se resuelvan los datos.
*   Se prefiere la creación de Promesas en los [Componente del Servidor](https://es.react.dev/reference/rsc/server-components) y pasarlos a los [Componente del Clientes](https://es.react.dev/reference/rsc/use-client) por encima de crear Promesas en los Componente del Clientes. Las Promesas creadas en los Componente del Clientes son recreadas en cada renderizado. Las Promesas que son pasadas de un Componente del Servidor a un Componente del Cliente son estables en todos los renderizados. [Ver este ejemplo](#streaming-data-from-server-to-client).

* * *

## Uso[](#usage "Link for Uso ")

### Leer contexto con `use`[](#reading-context-with-use "Link for this heading")

Cuando un [contexto](https://es.react.dev/learn/passing-data-deeply-with-context) se pasa a `use`, funciona de manera similar a [`useContext`](https://es.react.dev/reference/react/useContext). Mientras `useContext` debe ser llamado en el nivel mas alto de tu componente, `use` puede ser llamado dentro de condicionales como `if` y en bucles como `for`. Se prefiere `use` por encima de `useContext` porque es más flexible.

```
import { use } from 'react';function Button() {const theme = use(ThemeContext);// ...
```

`use` devuelve el valor de contexto para el contexto que pasas. Para determinar el valor del contexto, React busca en el árbol de componentes y encuentra **el proveedor de contexto más cercano arriba** para ese contexto en particular.

Para pasar el contexto a un `Button`, envuélvalo en uno de sus componentes padres en el proveedor de contexto correspondiente.

```
function MyPage() {return (<ThemeContext.Provider value="dark"><Form /></ThemeContext.Provider>);}function Form() {// ... renderiza botones adentro ...}
```

No importa cuántas capas de componentes hay entre el proveedor y el `Button`. Cuando un `Button` _en cualquier lugar_ dentro de un `Form` llama a `use(ThemeContext)`, recibirá `"dark"` como valor.

A diferencia de [`useContext`](https://es.react.dev/reference/react/useContext), `use` se puede llamar en condicionales y bucles como `if`.

```
function HorizontalRule({ show }) {if (show) {const theme = use(ThemeContext);return <hr className={theme} />;}return false;}
```

`use` se llama desde dentro de una declaración `if`, lo que te permite leer valores condicionalmente de un contexto.

### Atención

Al igual que `useContext`, `use(context)` siempre busca el proveedor de contexto más cercano _arriba_ del componente que lo llama. Busca hacia arriba y no considera los proveedores de contexto en el componente desde el cual llamas `use(context)`.

import { createContext, use } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value\="dark"\>
      <Form />
    </ThemeContext.Provider\>
  )
}

function Form() {
  return (
    <Panel title\="Bienvenido"\>
      <Button show\={true}\>Registrarse</Button\>
      <Button show\={false}\>Iniciar sesión</Button\>
    </Panel\>
  );
}

function Panel({ title, children }) {
  const theme = use(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className\={className}\>
      <h1\>{title}</h1\>
      {children}
    </section\>
  )
}

function Button({ show, children }) {
  if (show) {
    const theme = use(ThemeContext);
    const className = 'button-' + theme;
    return (
      <button className\={className}\>
        {children}
      </button\>
    );
  }
  return false
}

### Transmisión de datos del servidor al cliente (streaming)[](#streaming-data-from-server-to-client "Link for Transmisión de datos del servidor al cliente (streaming) ")

Se puede transmitir un flujo de datos del servidor al cliente (_streaming_) pasando una Promesa como una prop desde un Componente del Servidor a un Componente del Cliente.

```
import { fetchMessage } from './lib.js';import { Message } from './message.js';export default function App() {const messagePromise = fetchMessage();return (<Suspense fallback={<p>Esperando mensaje...</p>}><Message messagePromise={messagePromise} /></Suspense>);}
```

El Componente del Cliente toma la Promesa que ha recibido como una prop y la pasa a la API `use`. Esto permite al Componente del Cliente leer el valor de la Promesa que fue inicialmente creada por el Componente del Servidor.

```
// message.js'use client';import { use } from 'react';export function Message({ messagePromise }) {const messageContent = use(messagePromise);return <p>Aquí está el mensaje: {messageContent}</p>;}
```

Debido a que `Message` está envuelto en [`Suspense`](https://es.react.dev/reference/react/Suspense), el fallback se mostrará hasta que la Promesa esté resuelta. Cuando se resuelva la Promesa, el valor será leído por la API `use` y el componente `Message` reemplazará el fallback de Suspense.

"use client";

import { use, Suspense } from "react";

function Message({ messagePromise }) {
  const messageContent = use(messagePromise);
  return <p\>Aquí está el mensaje: {messageContent}</p\>;
}

export function MessageContainer({ messagePromise }) {
  return (
    <Suspense fallback\={<p\>⌛Descargando mensaje...</p\>}\>
      <Message messagePromise\={messagePromise} />
    </Suspense\>
  );
}

### Nota

Al pasar una Promesa de un Componente del Servidor a un Componente del Cliente, su valor resuelto debe ser serializable para pasar entre el servidor y el cliente. Los tipos de datos como las funciones no son serializables y no pueden ser el valor resuelto de dicha Promesa.

##### Profundizar

#### ¿Debo resolver una promesa en un Componente del Servidor o en un Componente del Cliente?[](#resolve-promise-in-server-or-client-component "Link for ¿Debo resolver una promesa en un Componente del Servidor o en un Componente del Cliente? ")

Una Promesa se puede pasar de un Componente del Servidor a un Componente del Cliente y resolverse en el Componente del Cliente con la API `use`. También puedes resolver la Promesa en un Componente del Servidor con `await` y pasar los datos requeridos al Componente del Cliente como una prop.

```
export default async function App() {const messageContent = await fetchMessage();return <Message messageContent={messageContent} />}
```

Pero el uso de `await` en un [Componente del Servidor](https://es.react.dev/reference/react/components#server-components) bloqueará su renderizado hasta que finalice la declaración de `await`. Pasar una Promesa de un Componente del Servidor a un Componente del Cliente evita que la Promesa bloquee la representación del Componente del Servidor.

### Lidiar con las promesas rechazadas[](#dealing-with-rejected-promises "Link for Lidiar con las promesas rechazadas ")

En algunas ocasiones una Promesa pasada a `use` puede ser rechazada. Puedes manejar Promesas rechazadas de estas maneras:

1.  [Mostrar un error a los usuarios con una barrera de error.](#displaying-an-error-to-users-with-error-boundary)
2.  [Proporcionar un valor alternativo con `Promise.catch`](#providing-an-alternative-value-with-promise-catch)

### Atención

`use` no puede ser llamado en un bloque try-catch. En vez de un bloque try-catch [envuelve tu componente con una barrera de error](#displaying-an-error-to-users-with-error-boundary), o [proporciona un valor alternativo para usar con el método `.catch` de Promise](#providing-an-alternative-value-with-promise-catch).

#### Mostrar un error a los usuarios con una barrera de error[](#displaying-an-error-to-users-with-error-boundary "Link for Mostrar un error a los usuarios con una barrera de error ")

Si quieres mostrar un error a tus usuarios cuando se rechaza una Promesa, puedes usar una [barrera de error](https://es.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary). Para usar una barrera de error, envuelve el componente donde estás llamando a la API `use` en una barrera de error. Si se rechaza la Promesa que fue pasada a `use`, se mostrará el fallback para la barrera de error.

"use client";

import { use, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function MessageContainer({ messagePromise }) {
  return (
    <ErrorBoundary fallback\={<p\>⚠️Algo ha salido mal</p\>}\>
      <Suspense fallback\={<p\>⌛Descargando el mensaje...</p\>}\>
        <Message messagePromise\={messagePromise} />
      </Suspense\>
    </ErrorBoundary\>
  );
}

function Message({ messagePromise }) {
  const content = use(messagePromise);
  return <p\>Aquí está el mensaje: {content}</p\>;
}

#### Proporcionar un valor alternativo con `Promise.catch`[](#providing-an-alternative-value-with-promise-catch "Link for this heading")

Si quieres proporcionar un valor alternativo cuando se rechaza la Promesa pasada a `use`, puedes usar el método [`catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) de la Promesa.

```
import { Message } from './message.js';export default function App() {const messagePromise = new Promise((resolve, reject) => {reject();}).catch(() => {return "no se encontró ningún mensaje nuevo.";});return (<Suspense fallback={<p>Esperando mensaje...</p>}><Message messagePromise={messagePromise} /></Suspense>);}
```

Para usar el método `catch` de la Promesa, llama a `catch` en el objeto de la Promesa. `catch` toma un solo argumento: una función que toma un mensaje de error como un argumento. Lo que sea devuelto por la función pasada a `catch` se utilizará como valor resuelto de la Promesa.

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### “Excepción de Suspense: ¡Esto no es un error real!”[](#suspense-exception-error "Link for “Excepción de Suspense: ¡Esto no es un error real!” ")

Estás llamando a `use` fuera de un Componente de React o función Hook, o llamando a `use` en un bloque try-catch. Si estás llamando a `use` dentro de un bloque try-catch, envuelve tu componente en una barrera de error o llama al `catch` de la Promesa para detectar el error y resolver la Promesa con otro valor. [Ver estos ejemplos](#dealing-with-rejected-promises).

Si estás llamando a `use` fuera de un Componente de React o función Hook, mueve la llamada de `use` a un Componente de React o función Hook.

```
function MessageComponent({messagePromise}) {function download() {// ❌ la función que llama a `use` no es un componente ni un Hookconst message = use(messagePromise);// ...
```

En su lugar, llama a `use` fuera de las clausuras de cualquier componente, donde la función que llama a `use` es un Componente o un Hook.

```
function MessageComponent({messagePromise}) {// ✅ `use` está siendo llamado desde un componente. const message = use(messagePromise);// ...
```
