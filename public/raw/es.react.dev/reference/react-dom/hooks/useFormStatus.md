---
title: useFormStatus – React
source: https://es.react.dev/reference/react-dom/hooks/useFormStatus
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../../_index.md).

---

# useFormStatus – React

`useFormStatus` es un Hook que brinda información de estado del último formulario enviado.

```
const { pending, data, method, action } = useFormStatus();
```

*   [Referencia](#reference)
    *   [`useFormStatus()`](#use-form-status)
*   [Uso](#usage)
    *   [Muestra un estado pendiente durante el envío de un formulario](#display-a-pending-state-during-form-submission)
    *   [Lee los datos del formulario que se envían](#read-form-data-being-submitted)
*   [Solución de problemas](#troubleshooting)
    *   [`status.pending` nunca es `true`](#pending-is-never-true)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useFormStatus()`[](#use-form-status "Link for this heading")

El Hook `useFormStatus` provee información de estado del último formulario enviado.

```
import { useFormStatus } from "react-dom";import action from './actions';function Submit() {const status = useFormStatus();return <button disabled={status.pending}>Enviar</button>}export default function App() {return (<form action={action}><Submit /></form>);}
```

Para obtener información de estado, el componente de `Enviar` tiene que ser renderizado dentro de un `<form>`. El Hook retorna información como la propiedad `pending` que te dice si el formulario se está enviando activamente.

En el ejemplo de arriba, `Enviar` usa esta información para deshabilitar la pulsación de `<button>` mientras el formulario se está enviando.

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

`useFormStatus` no toma ningún parámetro.

#### Retorna[](#returns "Link for Retorna ")

Un objeto de `status` con las siguientes propiedades:

*   `pending`: Un booleano. Si es `true` significa que el `<form>` padre está pendiente de enviarse. De otro modo es `false`.
    
*   `data`:Un objeto que implementa la [`interfaz FormData`](https://developer.mozilla.org/es/docs/Web/API/FormData) que contiene los datos que el `<form>` padre está enviando. Si no hay ningún envío activo o no hay `<form>`, va a ser `null`.
    
*   `method`: El valor de un string ya sea `'get'` o `'post'`. Este representa si el `<form>` se está enviando con el [método HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Methods) `GET` o `POST`. Por defecto, un `<form>` va a usar el método `GET` y puede estar especificado con la propiedad de [`method`](https://developer.mozilla.org/es/docs/Web/HTML/Element/form#method).
    

*   `action`: Una referencia a la función que es pasada al prop de `action` en el `<form>` padre. Si no hay un `<form>` padre, la propiedad es `null`. Si se ha proporcionado un valor URI al prop de `action`, o no se ha especificado un prop de `action`, `status.action` va a ser `null`.

#### Advertencias[](#caveats "Link for Advertencias ")

*   El Hook `useFormStatus` debe llamarse desde un componente que se renderiza dentro de un `<form>`.
*   `useFormStatus` solo retornará información de estado para un `<form>` padre. No retornará información de estado a ningún `<form>` renderizado en ese mismo componente o componente hijos.

* * *

## Uso[](#usage "Link for Uso ")

### Muestra un estado pendiente durante el envío de un formulario[](#display-a-pending-state-during-form-submission "Link for Muestra un estado pendiente durante el envío de un formulario ")

Para mostrar un estado pendiente mientras un formulario se está enviando, puedes llamar al Hook `useFormStatus` en un componente renderizado en un `<form>` y leer la propiedad `pending` que retorna.

Aquí, usamos la propiedad `pending` para indicar que el formulario se está enviando.

import { useFormStatus } from "react-dom";
import { submitForm } from "./actions.js";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type\="submit" disabled\={pending}\>
      {pending ? "Enviando..." : "Enviar"}
    </button\>
  );
}

function Form({ action }) {
  return (
    <form action\={action}\>
      <Submit />
    </form\>
  );
}

export default function App() {
  return <Form action\={submitForm} />;
}

### Atención

##### `useFormStatus` no retorna información de estado a un `<form>` renderizado en el mismo componente.[](#useformstatus-will-not-return-status-information-for-a-form-rendered-in-the-same-component "Link for this heading")

El Hook `useFormStatus` solo retorna información de estado a un `<form>` padre y no para ningún `<form>` renderizado en el mismo componente que llama el Hook, o componentes hijos.

```
function Form() {// 🚩 `pending` nunca será true// useFormStatus no rastrea el formulario renderizado en este componenteconst { pending } = useFormStatus();return <form action={submit}></form>;}
```

En su lugar llama a `useFormStatus` desde dentro de un componente que se encuentra dentro de un `<form>`.

```
function Submit() {// ✅ `pending` se derivará del formulario que envuelve el componente Enviarconst { pending } = useFormStatus(); return <button disabled={pending}>...</button>;}function Form() {// Este es el <form> que `useFormStatus` rastreareturn (<form action={submit}><Submit /></form>);}
```

### Lee los datos del formulario que se envían[](#read-form-data-being-submitted "Link for Lee los datos del formulario que se envían ")

Puedes usar la propiedad `data` de la información de estado que retorna del `useFormStatus` para mostrar qué datos está siendo enviando por el usuario.

Aquí, tenemos un formulario donde los usuarios pueden solicitar un nombre de usuario. Podemos usar `useFormStatus` para mostrar temporalmente un mensaje de estado que confirme qué nombre de usuario han solicitado.

import {useState, useMemo, useRef} from 'react';
import {useFormStatus} from 'react-dom';

export default function UsernameForm() {
  const {pending, data} = useFormStatus();

  return (
    <div\>
      <h3\>Solicita un nombre de usuario: </h3\>
      <input type\="text" name\="username" disabled\={pending}/>
      <button type\="submit" disabled\={pending}\>
        Enviar
      </button\>
      <br />
      <p\>{data ? \`Solicitando ${data?.get("username")}...\`: ''}</p\>
    </div\>
  );
}

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### `status.pending` nunca es `true`[](#pending-is-never-true "Link for this heading")

`useFormStatus` solo retornará información de estado a un `<form>` padre.

Si el componente que llama a `useFormStatus` no está anidado en un `<form>`, `status.pending` siempre retornará `false`. Verifica que `useFormStatus` está siendo llamado en un componente que es hijo de un elemento `<form>`.

`useFormStatus` no rastreará al estado de un `<form>` renderizado en el mismo componente. Mira [Atención](#useformstatus-will-not-return-status-information-for-a-form-rendered-in-the-same-component) para más detalles.
