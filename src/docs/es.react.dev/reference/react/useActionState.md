---
title: useActionState – React
source: https://es.react.dev/reference/react/useActionState
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useActionState – React

`useActionState` es un Hook de React que te permite actualizar el estado basándote en el resultado de una acción de formulario.

```
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

### Nota

En versiones anteriores de React Canary, esta API era parte de React DOM y se llamaba `useFormState`.

*   [Referencia](#reference)
    *   [`useActionState(action, initialState, permalink?)`](#useactionstate)
*   [Uso](#usage)
    *   [Usar información devuelta por una acción de formulario](#using-information-returned-by-a-form-action)
*   [Solución de problemas](#troubleshooting)
    *   [Mi acción ya no puede leer los datos del formulario enviado](#my-action-can-no-longer-read-the-submitted-form-data)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useActionState(action, initialState, permalink?)`[](#useactionstate "Link for this heading")

Llama a `useActionState` en el nivel superior de tu componente para crear un estado del componente que se actualiza [cuando se invoca una acción de formulario](https://es.react.dev/reference/react-dom/components/form). Le pasas a `useActionState` una función de acción de formulario existente junto con un estado inicial, y te devuelve una nueva acción que puedes usar en tu formulario, junto con el estado más reciente del formulario y si la acción aún está pendiente. El estado más reciente del formulario también se pasa a la función que proporcionaste.

```
import { useActionState } from "react";async function increment(previousState, formData) {return previousState + 1;}function StatefulForm({}) {const [state, formAction] = useActionState(increment, 0);return (<form>{state}<button formAction={formAction}>Increment</button></form>)}
```

El estado del formulario es el valor que devuelve la acción la última vez que se envió el formulario. Si el formulario aún no se ha enviado, es el estado inicial que proporcionaste.

Si se usa con una Función de Servidor, `useActionState` permite mostrar la respuesta del servidor al enviar el formulario incluso antes de que la hidratación haya completado.

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `fn`: La función que se llamará cuando se envíe el formulario o se presione el botón. Cuando se llama a la función, recibirá el estado previo del formulario (inicialmente el `initialState` que pasaste, y posteriormente su valor de retorno anterior) como primer argumento, seguido de los argumentos que una acción de formulario normalmente recibe.
*   `initialState`: El valor que deseas que tenga el estado inicialmente. Puede ser cualquier valor serializable. Este argumento se ignora después de que la acción se invoque por primera vez.
*   **opcional** `permalink`: Un string que contiene la URL única de la página que este formulario modifica. Para usar en páginas con contenido dinámico (por ejemplo: feeds) en conjunto con mejora progresiva: si `fn` es una [función de servidor](https://es.react.dev/reference/rsc/server-functions) y el formulario se envía antes de que el paquete de JavaScript se cargue, el navegador navegará a la URL de permalink especificada, en lugar de la URL de la página actual. Asegúrate de que el mismo componente de formulario se renderice en la página de destino (incluyendo la misma acción `fn` y `permalink`) para que React sepa cómo pasar el estado. Una vez que el formulario se haya hidratado, este parámetro no tiene efecto.

#### Devuelve[](#returns "Link for Devuelve ")

`useActionState` devuelve un _array_ con los siguientes valores:

1.  El estado actual. Durante el primer renderizado, coincidirá con el `initialState` que hayas pasado. Después de que la acción se invoque, coincidirá con el valor que devolvió la acción.
2.  Una nueva acción que puedes pasar como la prop `action` a tu componente `form` o como la prop `formAction` a cualquier componente `button` dentro del formulario. La acción también puede llamarse manualmente dentro de [`startTransition`](https://es.react.dev/reference/react/startTransition).
3.  El flag `isPending` que te indica si hay una Transición pendiente.

#### Advertencias[](#caveats "Link for Advertencias ")

*   Cuando se usa con un framework que soporta React Server Components, `useActionState` permite hacer los formularios interactivos antes de que JavaScript se haya ejecutado en el cliente. Cuando se usa sin Server Components, es equivalente al estado local del componente.
*   La función pasada a `useActionState` recibe un argumento extra, el estado previo o inicial, como su primer argumento. Esto hace que su firma sea diferente a si se usara directamente como una acción de formulario sin usar `useActionState`.

* * *

## Uso[](#usage "Link for Uso ")

### Usar información devuelta por una acción de formulario[](#using-information-returned-by-a-form-action "Link for Usar información devuelta por una acción de formulario ")

Llama a `useActionState` en el nivel superior de tu componente para acceder al valor de retorno de una acción desde la última vez que se envió el formulario.

```
import { useActionState } from 'react';import { action } from './actions.js';function MyComponent() {const [state, formAction] = useActionState(action, null);// ...return (<form action={formAction}>{/* ... */}</form>);}
```

`useActionState` devuelve un _array_ con los siguientes elementos:

1.  El estado actual del formulario, que inicialmente se establece con el estado inicial que proporcionaste, y después de enviar el formulario se establece con el valor de retorno de la acción que proporcionaste.
2.  Una nueva acción que pasas a `<form>` como su prop `action` o la llamas manualmente dentro de `startTransition`.
3.  Un estado pendiente que puedes utilizar mientras tu acción se está procesando.

Cuando se envía el formulario, se llamará a la función de acción que proporcionaste. Su valor de retorno se convertirá en el nuevo estado actual del formulario.

La acción que proporcionaste también recibirá un nuevo primer argumento, el estado actual del formulario. La primera vez que se envía el formulario, este será el estado inicial que proporcionaste, mientras que en envíos posteriores, será el valor de retorno de la última vez que se llamó a la acción. El resto de los argumentos son los mismos que si no se hubiera usado `useActionState`.

```
function action(currentState, formData) {// ...return 'next state';}
```

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### Mi acción ya no puede leer los datos del formulario enviado[](#my-action-can-no-longer-read-the-submitted-form-data "Link for Mi acción ya no puede leer los datos del formulario enviado ")

Cuando envuelves una acción con `useActionState`, recibe un argumento extra _como su primer argumento_. Los datos del formulario enviado son por lo tanto su _segundo_ argumento en lugar de ser el primero como sería normalmente. El nuevo primer argumento que se agrega es el estado actual del formulario.

```
function action(currentState, formData) {// ...}
```
