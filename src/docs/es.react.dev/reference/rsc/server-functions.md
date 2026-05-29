---
title: Server Functions – React
source: https://es.react.dev/reference/rsc/server-functions
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# Server Functions – React

### React Server Components

Las Server Functions son para usarse en [React Server Components](https://es.react.dev/reference/rsc/server-components).

**Nota:** Hasta Septiembre de 2024, nos referíamos a todas las Server Functions como “Server Actions”. Si una Server Function se pasa a una propiedad de acción o se llama desde dentro de una acción, entonces es una Server Action, pero no todas las Server Functions son Server Actions. La nomenclatura en esta documentación ha sido actualizada para reflejar que las Server Functions pueden ser usadas para múltiples propósitos.

Las Server Functions permiten a los Client Components llamar a funciones asíncronas ejecutadas en el servidor.

### Nota

#### ¿Cómo se crea la compatibilidad con las Server Functions?[](#how-do-i-build-support-for-server-functions "Link for ¿Cómo se crea la compatibilidad con las Server Functions? ")

Mientras que las Server Functions en React 19 son estables y no se romperán entre versiones menores, las APIs subyacentes utilizadas para implementar Server Functions en un bundler o framework de React Server Components no siguen un versionado semántico y pueden romperse entre versiones menores en React 19.x.

Para soportar Server Functions como bundler o framework, recomendamos usar una versión específica de React, o usar la versión Canary. Seguiremos trabajando con bundlers y frameworks para estabilizar las API utilizadas para implementar Server Functions en el futuro.

Cuando se define una Server Function con la directiva [`"use server"`](https://es.react.dev/reference/rsc/use-server), tu framework creará automáticamente una referencia a la Server Function, y pasará esa referencia al Client Component. Cuando esa función es llamada en el cliente, React enviará una petición al servidor para ejecutar la función, y devolver el resultado.

Las Server Functions pueden crearse en Server Components y pasarse como props a los Client Components, o pueden importarse y utilizarse en Client Components.

## Uso[](#usage "Link for Uso ")

### Creación de una Server Function a partir de un Server Component[](#creating-a-server-function-from-a-server-component "Link for Creación de una Server Function a partir de un Server Component ")

Los Server Components pueden definir Server Functions con la directiva `"use server"`:

```
// Server Componentimport Button from './Button';function EmptyNote () {async function createNoteAction() {// Server Function'use server';await db.notes.create();}return <Button onClick={createNoteAction}/>;}
```

Cuando React renderiza la Server Function `EmptyNote`, creará una referencia a la función `createNoteAction`, y pasará esa referencia al Client Component `Button`. Cuando se pulse el botón, React enviará una petición al servidor para ejecutar la función `createNoteAction` con la referencia proporcionada:

```
"use client";export default function Button({onClick}) { console.log(onClick); // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNoteAction'}return <button onClick={() => onClick()}>Create Empty Note</button>}
```

Para más información, consulte la documentación de [`"use server"`](https://es.react.dev/reference/rsc/use-server).

### Importar Server Functions desde Client Components[](#importing-server-functions-from-client-components "Link for Importar Server Functions desde Client Components ")

Los Client Components pueden importar Server Functions desde archivos que utilicen la directiva `"use server"`:

```
"use server";export async function createNote() {await db.notes.create();}
```

Cuando el bundler construye el Client Component `EmptyNote`, creará una referencia a la función `createNote` en el bundle. Cuando se pulse el botón, React enviará una petición al servidor para ejecutar la función `createNote` utilizando la referencia proporcionada:

```
"use client";import {createNote} from './actions';function EmptyNote() {console.log(createNote);// {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNote'}<button onClick={() => createNote()} />}
```

Para más información, consulte la documentación de [`"use server"`](https://es.react.dev/reference/rsc/use-server).

### Server Functions con Actions[](#server-functions-with-actions "Link for Server Functions con Actions ")

Las Server Functions pueden ser llamadas desde Actions en el cliente:

```
"use server";export async function updateName(name) {if (!name) {return {error: 'Name is required'};}await db.users.updateName(name);}
```

```
"use client";import {updateName} from './actions';function UpdateName() {const [name, setName] = useState('');const [error, setError] = useState(null);const [isPending, startTransition] = useTransition();const submitAction = async () => {startTransition(async () => {const {error} = await updateName(name);if (error) {setError(error);} else {setName('');}})}return (<form action={submitAction}><input type="text" name="name" disabled={isPending}/>{error && <span>Failed: {error}</span>}</form>)}
```

Esto te permite acceder al estado `isPending` de la Server Function envolviéndola en una Action en el cliente.

Para más información, consulte la documentación de [Llamada a una Server Function fuera de `<form>`](https://es.react.dev/reference/rsc/use-server#calling-a-server-function-outside-of-form)

### Server Functions con Form Actions[](#using-server-functions-with-form-actions "Link for Server Functions con Form Actions ")

Las Server Functions funcionan con las nuevas funciones de Form de React 19.

Puede pasar una Server Function a un Form para automáticamente enviar el formulario al servidor:

```
"use client";import {updateName} from './actions';function UpdateName() {return (<form action={updateName}><input type="text" name="name" /></form>)}
```

Cuando el envío del Form tiene éxito, React restablecerá automáticamente el formulario. Puedes añadir `useActionState` para acceder al estado pendiente, última respuesta, o para soportar la mejora progresiva.

Para más información, consulte la documentación de [Server Functions en Forms](https://es.react.dev/reference/rsc/use-server#server-functions-in-forms).

### Server Functions con `useActionState`[](#server-functions-with-use-action-state "Link for this heading")

Puede llamar a las Server Functions con `useActionState` para el caso común en el que sólo necesite acceder al estado pendiente de la acción y a la última respuesta devuelta:

```
"use client";import {updateName} from './actions';function UpdateName() {const [state, submitAction, isPending] = useActionState(updateName, {error: null});return (<form action={submitAction}><input type="text" name="name" disabled={isPending}/>{state.error && <span>Failed: {state.error}</span>}</form>);}
```

Al utilizar `useActionState` con Server Functions, React también reproducirá automáticamente los envíos de formularios introducidos antes de que finalice la hidratación. Esto significa que los usuarios pueden interactuar con la aplicación incluso antes de que esta se haya hidratado.

Para más información, consulte la documentación de [`useActionState`](https://es.react.dev/reference/react/useActionState).

### Mejora progresiva con `useActionState`[](#progressive-enhancement-with-useactionstate "Link for this heading")

Las Server Functions también admiten la mejora progresiva con el tercer argumento de `useActionState`.

```
"use client";import {updateName} from './actions';function UpdateName() {const [, submitAction] = useActionState(updateName, null, `/name/update`);return (<form action={submitAction}>      ...</form>);}
```

Cuando se proporciona permalink a `useActionState`, React redirigirá a la URL proporcionada si el formulario se envía antes de que se cargue el paquete JavaScript.

Para más información, consulte la documentación de [`useActionState`](https://es.react.dev/reference/react/useActionState).
