---
title: useTransition – React
source: https://es.react.dev/reference/react/useTransition
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useTransition – React

`useTransition` es un Hook de React que te permite renderizar una parte de la interfaz de usuario en segundo plano.

```
const [isPending, startTransition] = useTransition()
```

*   [Referencia](#reference)
    *   [`useTransition()`](#usetransition)
    *   [Función `startTransition`](#starttransition)
*   [Uso](#usage)
    *   [Perform non-blocking updates with Actions](#perform-non-blocking-updates-with-actions)
    *   [Exposing `action` prop from components](#exposing-action-props-from-components)
    *   [Displaying a pending visual state](#displaying-a-pending-visual-state)
    *   [Evitar indicadores de carga no deseados](#preventing-unwanted-loading-indicators)
    *   [Construir un enrutador preparado para Suspense](#building-a-suspense-enabled-router)
    *   [Displaying an error to users with an error boundary](#displaying-an-error-to-users-with-error-boundary)
*   [Solución de problemas](#troubleshooting)
    *   [No funciona la actualización de una entrada en una Transición](#updating-an-input-in-a-transition-doesnt-work)
    *   [React no trata mi actualización de estado como una Transición](#react-doesnt-treat-my-state-update-as-a-transition)
    *   [React doesn’t treat my state update after `await` as a Transition](#react-doesnt-treat-my-state-update-after-await-as-a-transition)
    *   [Quiero llamar a `useTransition` desde fuera de un componente](#i-want-to-call-usetransition-from-outside-a-component)
    *   [La función que paso a `startTransition` se ejecuta inmediatamente](#the-function-i-pass-to-starttransition-executes-immediately)
    *   [My state updates in Transitions are out of order](#my-state-updates-in-transitions-are-out-of-order)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useTransition()`[](#usetransition "Link for this heading")

Llama a `useTransition` en el nivel superior de tu componente para marcar algunas actualizaciones de estado como Transiciones.

```
import { useTransition } from 'react';function TabContainer() {const [isPending, startTransition] = useTransition();// ...}
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

`useTransition` no recibe ningun parámetro.

#### Devuelve[](#returns "Link for Devuelve ")

`useTransition` devuelve un _array_ con exactamente dos elementos:

1.  `isPending` que indica si hay una Transición pendiente.
2.  [`startTransition` function](#starttransition) que permite marcar actualizaciones como una Transición.

* * *

### Función `startTransition`[](#starttransition "Link for this heading")

La función `startTransition` devuelta por `useTransition` permite marcar una actualización de estado como una Transición.

```
function TabContainer() {const [isPending, startTransition] = useTransition();const [tab, setTab] = useState('about');function selectTab(nextTab) {startTransition(() => {setTab(nextTab);});}// ...}
```

### Nota

#### Functions called in `startTransition` are called “Actions”.[](#functions-called-in-starttransition-are-called-actions "Link for this heading")

The function passed to `startTransition` is called an “Action”. By convention, any callback called inside `startTransition` (such as a callback prop) should be named `action` or include the “Action” suffix:

```
function SubmitButton({ submitAction }) {const [isPending, startTransition] = useTransition();return (<buttondisabled={isPending}onClick={() => {startTransition(async () => {await submitAction();});}}>      Submit</button>);}
```

#### Parameters[](#starttransition-parameters "Link for Parameters ")

*   `action`: A function that updates some state by calling one or more [`set` functions](https://es.react.dev/reference/react/useState#setstate). React calls `action` immediately with no parameters and marks all state updates scheduled synchronously during the `action` function call as Transitions. Any async calls that are awaited in the `action` will be included in the Transition, but currently require wrapping any `set` functions after the `await` in an additional `startTransition` (see [Troubleshooting](#react-doesnt-treat-my-state-update-after-await-as-a-transition)). State updates marked as Transitions will be [non-blocking](#marking-a-state-update-as-a-non-blocking-transition) and [will not display unwanted loading indicators](#preventing-unwanted-loading-indicators).

#### Devuelve[](#starttransition-returns "Link for Devuelve ")

`startTransition` no devuelve nada.

#### Advertencias[](#starttransition-caveats "Link for Advertencias ")

*   `useTransition` es un Hook, por lo que sólo puede ser llamado dentro de componentes o Hooks personalizados. Si necesitas iniciar una Transición en otro lugar (por ejemplo, desde una biblioteca de datos), llama a la función independiente [`startTransition`](https://es.react.dev/reference/react/startTransition) en su lugar.
    
*   Puedes envolver una actualización en una Transición sólo si tienes acceso a la función `set` de ese estado. Si deseas iniciar una Transición en respuesta a alguna prop o algún valor de un Hook personalizado, prueba [`useDeferredValue`](https://es.react.dev/reference/react/useDeferredValue) en su lugar.
    
*   The function you pass to `startTransition` is called immediately, marking all state updates that happen while it executes as Transitions. If you try to perform state updates in a `setTimeout`, for example, they won’t be marked as Transitions.
    
*   You must wrap any state updates after any async requests in another `startTransition` to mark them as Transitions. This is a known limitation that we will fix in the future (see [Troubleshooting](#react-doesnt-treat-my-state-update-after-await-as-a-transition)).
    
*   La función `startTransition` tiene una identidad estable, por lo que a menudo verás que se omite de las dependencias de los Efectos, pero que se incluya no causa que el Efecto se dispare. Si el _linter_ te permite omitir una dependencia sin errores, es seguro hacerlo. [Aprende más sobre eliminar dependencias de los Efectos.](https://es.react.dev/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)
    
*   Una actualización de estado marcada como Transición será interrumpida por otras actualizaciones de estado. Por ejemplo, si actualizas un componente gráfico dentro de una Transición, pero luego empiezas a escribir en un input mientras el gráfico está en medio de un rerenderizado, React reiniciará el trabajo de renderizado en el componente gráfico después de gestionar la actualización del input.
    
*   Las actualizaciones de Transición no pueden utilizarse para controlar las entradas de texto.
    
*   Si hay varias Transiciones en curso, React las agrupa. Se trata de una limitación que podría eliminarse en una versión futura.
    

## Uso[](#usage "Link for Uso ")

### Perform non-blocking updates with Actions[](#perform-non-blocking-updates-with-actions "Link for Perform non-blocking updates with Actions ")

Call `useTransition` at the top of your component to create Actions, and access the pending state:

```
import {useState, useTransition} from 'react';function CheckoutForm() {const [isPending, startTransition] = useTransition();// ...}
```

`useTransition` devuelve un array con exactamente dos elementos:

1.  `isPending` flag que te indica si hay una Transición pendiente.
2.  `startTransition` function que te permite crear una Acción.

Para iniciar una Transición pasa una función a `startTransition` de esta manera:

```
import {useState, useTransition} from 'react';import {updateQuantity} from './api';function CheckoutForm() {const [isPending, startTransition] = useTransition();const [quantity, setQuantity] = useState(1);function onSubmit(newQuantity) {startTransition(async function () {const savedQuantity = await updateQuantity(newQuantity);startTransition(() => {setQuantity(savedQuantity);});});}// ...}
```

The function passed to `startTransition` is called the “Action”. You can update state and (optionally) perform side effects within an Action, and the work will be done in the background without blocking user interactions on the page. A Transition can include multiple Actions, and while a Transition is in progress, your UI stays responsive. For example, if the user clicks a tab but then changes their mind and clicks another tab, the second click will be immediately handled without waiting for the first update to finish.

To give the user feedback about in-progress Transitions, to `isPending` state switches to `true` at the first call to `startTransition`, and stays `true` until all Actions complete and the final state is shown to the user. Transitions ensure side effects in Actions to complete in order to [prevent unwanted loading indicators](#preventing-unwanted-loading-indicators), and you can provide immediate feedback while the Transition is in progress with `useOptimistic`.

#### 

Ejemplo

1

de

2:

Updating the quantity in an Action[](#updating-the-quantity-in-an-action "Link for this heading")

In this example, the `updateQuantity` function simulates a request to the server to update the item’s quantity in the cart. This function is _artificially slowed down_ so that it takes at least a second to complete the request.

Update the quantity multiple times quickly. Notice that the pending “Total” state is shown while any requests are in progress, and the “Total” updates only after the final request is complete. Because the update is in an Action, the “quantity” can continue to be updated while the request is in progress.

import { useState, useTransition } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";

export default function App({}) {
  const \[quantity, setQuantity\] = useState(1);
  const \[isPending, startTransition\] = useTransition();

  const updateQuantityAction = async newQuantity \=> {
    
    
    startTransition(async () \=> {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() \=> {
        setQuantity(savedQuantity);
      });
    });
  };

  return (
    <div\>
      <h1\>Checkout</h1\>
      <Item action\={updateQuantityAction}/>
      <hr />
      <Total quantity\={quantity} isPending\={isPending} />
    </div\>
  );
}

This is a basic example to demonstrate how Actions work, but this example does not handle requests completing out of order. When updating the quantity multiple times, it’s possible for the previous requests to finish after later requests causing the quantity to update out of order. This is a known limitation that we will fix in the future (see [Troubleshooting](#my-state-updates-in-transitions-are-out-of-order) below).

For common use cases, React provides built-in abstractions such as:

*   [`useActionState`](https://es.react.dev/reference/react/useActionState)
*   [`<form>` actions](https://es.react.dev/reference/react-dom/components/form)
*   [Server Functions](https://es.react.dev/reference/rsc/server-functions)

These solutions handle request ordering for you. When using Transitions to build your own custom hooks or libraries that manage async state transitions, you have greater control over the request ordering, but you must handle it yourself.

* * *

### Exposing `action` prop from components[](#exposing-action-props-from-components "Link for this heading")

You can expose an `action` prop from a component to allow a parent to call an Action.

For example, this `TabButton` component wraps its `onClick` logic in an `action` prop:

```
export default function TabButton({ action, children, isActive }) {const [isPending, startTransition] = useTransition();if (isActive) {return <b>{children}</b>}return (<button onClick={() => {startTransition(async () => {// await the action that's passed in.// This allows it to be either sync or async. await action();});}}>{children}</button>);}
```

Because the parent component updates its state inside the `action`, that state update gets marked as a Transition. This means you can click on “Posts” and then immediately click “Contact” and it does not block user interactions:

import { useTransition } from 'react';

export default function TabButton({ action, children, isActive }) {
  const \[isPending, startTransition\] = useTransition();
  if (isActive) {
    return <b\>{children}</b\>
  }
  if (isPending) {
    return <b className\="pending"\>{children}</b\>;
  }
  return (
    <button onClick\={async () \=> {
      startTransition(async () \=> {
        
        
        await action();
      });
    }}\>
      {children}
    </button\>
  );
}

### Nota

When exposing an `action` prop from a component, you should `await` it inside the transition.

This allows the `action` callback to be either synchronous or asynchronous without requiring an additional `startTransition` to wrap the `await` in the action.

* * *

### Displaying a pending visual state[](#displaying-a-pending-visual-state "Link for Displaying a pending visual state ")

Puedes utilizar el valor booleano `isPending` devuelto por `useTransition` para indicar al usuario que una Transición está en curso. Por ejemplo, el botón de la pestaña puede tener un estado visual especial “pendiente”:

```
function TabButton({ action, children, isActive }) {const [isPending, startTransition] = useTransition();// ...if (isPending) {return <b className="pending">{children}</b>;}// ...
```

Fíjate en que hacer clic en _“Posts”_ ahora es más sensible porque el botón de la pestaña se actualiza inmediatamente:

import { useTransition } from 'react';

export default function TabButton({ action, children, isActive }) {
  const \[isPending, startTransition\] = useTransition();
  if (isActive) {
    return <b\>{children}</b\>
  }
  if (isPending) {
    return <b className\="pending"\>{children}</b\>;
  }
  return (
    <button onClick\={() \=> {
      startTransition(async () \=> {
        await action();
      });
    }}\>
      {children}
    </button\>
  );
}

* * *

### Evitar indicadores de carga no deseados[](#preventing-unwanted-loading-indicators "Link for Evitar indicadores de carga no deseados ")

In this example, the `PostsTab` component fetches some data using [use](https://es.react.dev/reference/react/use). When you click the “Posts” tab, the `PostsTab` component _suspends_, causing the closest loading fallback to appear:

import { Suspense, useState } from 'react';
import TabButton from './TabButton.js';
import AboutTab from './AboutTab.js';
import PostsTab from './PostsTab.js';
import ContactTab from './ContactTab.js';

export default function TabContainer() {
  const \[tab, setTab\] = useState('about');
  return (
    <Suspense fallback\={<h1\>🌀 Loading...</h1\>}\>
      <TabButton
        isActive\={tab === 'about'}
        action\={() \=> setTab('about')}
      \>
        Acerca de
      </TabButton\>
      <TabButton
        isActive\={tab === 'posts'}
        action\={() \=> setTab('posts')}
      \>
        Posts
      </TabButton\>
      <TabButton
        isActive\={tab === 'contact'}
        action\={() \=> setTab('contact')}
      \>
        Contact
      </TabButton\>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </Suspense\>
  );
}

Hiding the entire tab container to show a loading indicator leads to a jarring user experience. If you add `useTransition` to `TabButton`, you can instead display the pending state in the tab button instead.

Observa que al hacer clic en “Entradas” ya no se sustituye todo el contenedor de la pestaña por un spinner:

import { useTransition } from 'react';

export default function TabButton({ action, children, isActive }) {
  const \[isPending, startTransition\] = useTransition();
  if (isActive) {
    return <b\>{children}</b\>
  }
  if (isPending) {
    return <b className\="pending"\>{children}</b\>;
  }
  return (
    <button onClick\={() \=> {
      startTransition(async () \=> {
        await action();
      });
    }}\>
      {children}
    </button\>
  );
}

[Más información sobre el uso de Transiciones con Suspense.](https://es.react.dev/reference/react/Suspense#preventing-already-revealed-content-from-hiding)

### Nota

Transitions only “wait” long enough to avoid hiding _already revealed_ content (like the tab container). If the Posts tab had a [nested `<Suspense>` boundary,](https://es.react.dev/reference/react/Suspense#revealing-nested-content-as-it-loads) the Transition would not “wait” for it.

* * *

### Construir un enrutador preparado para Suspense[](#building-a-suspense-enabled-router "Link for Construir un enrutador preparado para Suspense ")

Si estás construyendo un framework de React o un enrutador, te recomendamos marcar las navegaciones de página como Transiciones.

```
function Router() {const [page, setPage] = useState('/');const [isPending, startTransition] = useTransition();function navigate(url) {startTransition(() => {setPage(url);});}// ...
```

This is recommended for three reasons:

*   [Transitions are interruptible,](#marking-a-state-update-as-a-non-blocking-transition) which lets the user click away without waiting for the re-render to complete.
*   [Transitions prevent unwanted loading indicators,](#preventing-unwanted-loading-indicators) which lets the user avoid jarring jumps on navigation.
*   [Transitions wait for all pending actions](#perform-non-blocking-updates-with-actions) which lets the user wait for side effects to complete before the new page is shown.

Here is a simplified router example using Transitions for navigations.

import { Suspense, useState, useTransition } from 'react';
import IndexPage from './IndexPage.js';
import ArtistPage from './ArtistPage.js';
import Layout from './Layout.js';

export default function App() {
  return (
    <Suspense fallback\={<BigSpinner />}\>
      <Router />
    </Suspense\>
  );
}

function Router() {
  const \[page, setPage\] = useState('/');
  const \[isPending, startTransition\] = useTransition();

  function navigate(url) {
    startTransition(() \=> {
      setPage(url);
    });
  }

  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate\={navigate} />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist\={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout isPending\={isPending}\>
      {content}
    </Layout\>
  );
}

function BigSpinner() {
  return <h2\>🌀 Loading...</h2\>;
}

### Nota

Se espera que los enredadores [preparados para Suspense](https://es.react.dev/reference/react/Suspense) envuelvan las actualizaciones de navegación en Transiciones por defecto.

* * *

### Displaying an error to users with an error boundary[](#displaying-an-error-to-users-with-error-boundary "Link for Displaying an error to users with an error boundary ")

If a function passed to `startTransition` throws an error, you can display an error to your user with an [error boundary](https://es.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary). To use an error boundary, wrap the component where you are calling the `useTransition` in an error boundary. Once the function passed to `startTransition` errors, the fallback for the error boundary will be displayed.

import { useTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function AddCommentContainer() {
  return (
    <ErrorBoundary fallback\={<p\>⚠️Something went wrong</p\>}\>
      <AddCommentButton />
    </ErrorBoundary\>
  );
}

function addComment(comment) {
  
  if (comment == null) {
    throw new Error("Example Error: An error thrown to trigger error boundary");
  }
}

function AddCommentButton() {
  const \[pending, startTransition\] = useTransition();

  return (
    <button
      disabled\={pending}
      onClick\={() \=> {
        startTransition(() \=> {
          
          
          addComment();
        });
      }}
    \>
      Add comment
    </button\>
  );
}

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### No funciona la actualización de una entrada en una Transición[](#updating-an-input-in-a-transition-doesnt-work "Link for No funciona la actualización de una entrada en una Transición ")

No se puede utilizar una Transición para una variable de estado que controla una entrada:

```
const [text, setText] = useState('');// ...function handleChange(e) {// ❌ Can't use Transitions for controlled input statestartTransition(() => {setText(e.target.value);});}// ...return <input value={text} onChange={handleChange} />;
```

Esto se debe a que las Transiciones son no bloqueantes, pero la actualización de una entrada en respuesta al evento de cambio debe producirse de forma sincrónica. Si deseas ejecutar una Transición en respuesta a la escritura, tiene dos opciones:

1.  Puedes declarar dos variables de estado separadas: una para el estado de la entrada (que siempre se actualiza de forma sincrónica), y otra que actualizarás en una Transición. Esto te permite controlar la entrada utilizando el estado síncrono, y pasar la variable de estado de Transición (que “irá por detrás” de la entrada) al resto de tu lógica de renderizado.
2.  Alternativamente, puedes tener una variable de estado, y añadir [`useDeferredValue`](https://es.react.dev/reference/react/useDeferredValue) que “irá por detrás” del valor real. Se activarán rerenderizados no bloqueantes para “ponerse al día” con el nuevo valor de forma automática.

* * *

### React no trata mi actualización de estado como una Transición[](#react-doesnt-treat-my-state-update-as-a-transition "Link for React no trata mi actualización de estado como una Transición ")

Cuando envuelvas una actualización de estado en una Transición, asegúrate de que ocurre _durante_ la llamada `startTransition`:

```
startTransition(() => {// ✅ Setting state *during* startTransition callsetPage('/about');});
```

The function you pass to `startTransition` must be synchronous. You can’t mark an update as a Transition like this:

```
startTransition(() => {// ❌ Setting state *after* startTransition callsetTimeout(() => {setPage('/about');}, 1000);});
```

En su lugar, podrías hacer esto:

```
setTimeout(() => {startTransition(() => {// ✅ Setting state *during* startTransition callsetPage('/about');});}, 1000);
```

* * *

### React doesn’t treat my state update after `await` as a Transition[](#react-doesnt-treat-my-state-update-after-await-as-a-transition "Link for this heading")

When you use `await` inside a `startTransition` function, the state updates that happen after the `await` are not marked as Transitions. You must wrap state updates after each `await` in a `startTransition` call:

```
startTransition(async () => {await someAsyncFunction();// ❌ Not using startTransition after awaitsetPage('/about');});
```

Sin embargo, esto funciona en su lugar:

```
startTransition(async () => {await someAsyncFunction();// ✅ Using startTransition *after* awaitstartTransition(() => {setPage('/about');});});
```

This is a JavaScript limitation due to React losing the scope of the async context. In the future, when [AsyncContext](https://github.com/tc39/proposal-async-context) is available, this limitation will be removed.

* * *

### Quiero llamar a `useTransition` desde fuera de un componente[](#i-want-to-call-usetransition-from-outside-a-component "Link for this heading")

No puedes llamar a `useTransition` fuera de un componente porque es un Hook. En este caso, utiliza el método independiente [`startTransition`](https://es.react.dev/reference/react/startTransition). Funciona de la misma manera, pero no proporciona el indicador `isPending`.

* * *

### La función que paso a `startTransition` se ejecuta inmediatamente[](#the-function-i-pass-to-starttransition-executes-immediately "Link for this heading")

Si ejecutas este código, imprimirá 1, 2, 3:

```
console.log(1);startTransition(() => {console.log(2);setPage('/about');});console.log(3);
```

**Se espera que imprima 1, 2, 3.** La función que pasas a `startTransition` no se retrasa. Al contrario que con el `setTimeout` del navegador, no ejecuta el callback más tarde. React ejecuta tu función inmediatamente, pero cualquier actualización de estado programada _mientras se está ejecutando_ se marca como Transición. Puedes imaginar que funciona así:

```
// A simplified version of how React workslet isInsideTransition = false;function startTransition(scope) {isInsideTransition = true;scope();isInsideTransition = false;}function setState() {if (isInsideTransition) {// ... schedule a Transition state update ...} else {// ... schedule an urgent state update ...}}
```

### My state updates in Transitions are out of order[](#my-state-updates-in-transitions-are-out-of-order "Link for My state updates in Transitions are out of order ")

If you `await` inside `startTransition`, you might see the updates happen out of order.

In this example, the `updateQuantity` function simulates a request to the server to update the item’s quantity in the cart. This function _artificially returns the every other request after the previous_ to simulate race conditions for network requests.

Try updating the quantity once, then update it quickly multiple times. You might see the incorrect total:

import { useState, useTransition } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";

export default function App({}) {
  const \[quantity, setQuantity\] = useState(1);
  const \[isPending, startTransition\] = useTransition();
  
  const \[clientQuantity, setClientQuantity\] = useState(1);
  
  const updateQuantityAction = newQuantity \=> {
    setClientQuantity(newQuantity);

    
    
    startTransition(async () \=> {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() \=> {
        setQuantity(savedQuantity);
      });
    });
  };

  return (
    <div\>
      <h1\>Checkout</h1\>
      <Item action\={updateQuantityAction}/>
      <hr />
      <Total clientQuantity\={clientQuantity} savedQuantity\={quantity} isPending\={isPending} />
    </div\>
  );
}

When clicking multiple times, it’s possible for previous requests to finish after later requests. When this happens, React currently has no way to know the intended order. This is because the updates are scheduled asynchronously, and React loses context of the order across the async boundary.

This is expected, because Actions within a Transition do not guarantee execution order. For common use cases, React provides higher-level abstractions like [`useActionState`](https://es.react.dev/reference/react/useActionState) and [`<form>` actions](https://es.react.dev/reference/react-dom/components/form) that handle ordering for you. For advanced use cases, you’ll need to implement your own queuing and abort logic to handle this.
