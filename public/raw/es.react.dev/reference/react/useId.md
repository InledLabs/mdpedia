---
title: useId – React
source: https://es.react.dev/reference/react/useId
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useId – React

`useId` es un Hook de React para generar IDs únicos que se pueden pasar a los atributos de accesibilidad.

```
const id = useId()
```

*   [Referencia](#reference)
    *   [`useId()`](#useid)
*   [Uso](#usage)
    *   [Generación de ID únicos para atributos de accesibilidad](#generating-unique-ids-for-accessibility-attributes)
    *   [Generar IDs para varios elementos relacionados](#generating-ids-for-several-related-elements)
    *   [Especificación de un prefijo compartido para todos los IDs generados](#specifying-a-shared-prefix-for-all-generated-ids)
    *   [Uso del mismo prefijo de ID en el cliente y el servidor](#using-the-same-id-prefix-on-the-client-and-the-server)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useId()`[](#useid "Link for this heading")

Llama a `useId` en el nivel superior de tu componente para generar un ID único:

```
import { useId } from 'react';function PasswordField() {const passwordHintId = useId();// ...
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

`useId` no toma ningún parámetro.

#### Devuelve[](#returns "Link for Devuelve ")

`useId` devuelve una cadena de ID única asociada con esta llamada `useId` llamado en un componente particular.

#### Advertencias[](#caveats "Link for Advertencias ")

*   `useId` es un Hook, así que solo puedes llamarlo **en el nivel superior de tu componente** o en tus propios hooks. No puedes llamarlo dentro de bucles o condiciones. Si necesitas hacerlo, extrae un nuevo componente y mueve allí el estado.
    
*   `useId` **no debe usarse para generar _keys_** en una lista. [Las _keys_ deben generarse a partir de tus datos.](https://es.react.dev/learn/rendering-lists#where-to-get-your-key)
    
*   `useId` currently cannot be used in [async Server Components](https://es.react.dev/reference/rsc/server-components#async-components-with-server-components).
    

* * *

## Uso[](#usage "Link for Uso ")

### Generación de ID únicos para atributos de accesibilidad[](#generating-unique-ids-for-accessibility-attributes "Link for Generación de ID únicos para atributos de accesibilidad ")

Llama a `useId` en el nivel superior de tu componente para generar un ID único:

```
import { useId } from 'react';function PasswordField() {const passwordHintId = useId();// ...
```

A continuación, puedes pasar el ID generado a los diferentes atributos:

```
<><input type="password" aria-describedby={passwordHintId} /><p id={passwordHintId}></>
```

**Veamos un ejemplo para ver cuándo es útil.**

[Atributos de accesibilidad HTML](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) como [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) te permiten especificar que dos etiquetas están relacionadas entre sí. Por ejemplo, puedes especificar que un determinado elemento (como una entrada de texto) sea descrito por otro elemento (como un párrafo).

En HTML normal, lo escribirías así:

```
<label>  Password:<inputtype="password"aria-describedby="password-hint"/></label><p id="password-hint">  The password should contain at least 18 characters</p>
```

Sin embargo, escribir IDs fijos como este no es una buena práctica en React. Un componente puede renderizarse más de una vez en la página, ¡pero los IDs tienen que ser únicos! En lugar de utilizar un ID fijo, puedes generar un ID único con `useId`:

```
import { useId } from 'react';function PasswordField() {const passwordHintId = useId();return (<><label>        Password:<inputtype="password"aria-describedby={passwordHintId}/></label><p id={passwordHintId}>        The password should contain at least 18 characters</p></>);}
```

Ahora, incluso si `PasswordField` aparece varias veces en la pantalla, no habrá conflicto entre los IDs generados.

[Mira este video](https://www.youtube.com/watch?v=0dNzNcuEuOo) para ver la diferencia en la experiencia de usuario con tecnologías de asistencia.

### Atención

**`useId` requiere un árbol de componentes idéntico en el servidor y el cliente** cuando utilizas [renderizado en el servidor](https://es.react.dev/reference/react-dom/server). Si los árboles que se renderizan en el servidor y el cliente no coinciden exactamente, los IDs generados no coincidirán.

##### Profundizar

#### ¿Por qué useId es mejor que un contador incremental?[](#why-is-useid-better-than-an-incrementing-counter "Link for ¿Por qué useId es mejor que un contador incremental? ")

Puede que te preguntes por qué `useId` es mejor que incrementar una variable global como `nextId++`.

El principal beneficio de `useId` es que React se asegura de que funcione con el [renderizado en el servidor.](https://es.react.dev/reference/react-dom/server) Durante el renderizado en el servidos, tus componentes generan salida HTML. Más tarde, en el cliente, [la hidratación](https://es.react.dev/reference/react-dom/client/hydrateRoot) adjunta tus controladores de eventos al HTML generado. Para que la hidratación funcione, la salida del cliente debe coincidir con el HTML del servidor.

Esto es muy difícil de garantizar con un contador incremental porque el orden en que se hidratan los Componentes del Cliente puede no coincidir con el orden en que se emitió el HTML del servidor. Al llamar a `useId`, te aseguras de que la hidratación funcionará y la salida coincidirá entre el servidor y el cliente.

Dentro de React, `useId` se genera a partir de la “ruta del padre” del componente llamado. Esta es la razón por la que, si el cliente y el árbol del servidor son iguales, la “ruta del padre” coincidirá independientemente del orden del renderizado.

* * *

Si necesitas proporcionar IDs a varios elementos relacionados, puedes llamar a `useId` para generar un prefijo compartido para ellos:

Esto te permite evitar llamar a `useId` para cada elemento que necesite un ID único.

* * *

### Especificación de un prefijo compartido para todos los IDs generados[](#specifying-a-shared-prefix-for-all-generated-ids "Link for Especificación de un prefijo compartido para todos los IDs generados ")

Si renderizas varias aplicaciones de React independientes en una sola página, puedes pasar `identifierPrefix` como una opción para las llamadas [`createRoot`](https://es.react.dev/reference/react-dom/client/createRoot#parameters) o [`hydrateRoot`](https://es.react.dev/reference/react-dom/client/hydrateRoot). Esto garantiza que los IDs generados por las dos aplicaciones diferentes nunca entren en conflicto porque cada identificador generado con `useId` comenzará con el prefijo distinto que hayas especificado.

* * *

### Uso del mismo prefijo de ID en el cliente y el servidor[](#using-the-same-id-prefix-on-the-client-and-the-server "Link for Uso del mismo prefijo de ID en el cliente y el servidor ")

Si [renderizas múltiples aplicaciones de React independientes en la misma página](#specifying-a-shared-prefix-for-all-generated-ids), y algunas de esas aplicaciones son renderizadas en el servidor, asegúrate de que el prefijo `identifierPrefix` que le pases a la llamada a [`hydrateRoot`](https://es.react.dev/reference/react-dom/client/hydrateRoot) en el lado del cliente sea el mismo `identifierPrefix` que le pases a las [APIs del servidor](https://es.react.dev/reference/react-dom/server) tales como [`renderToPipeableStream`.](https://es.react.dev/reference/react-dom/server/renderToPipeableStream)

```
// Serverimport { renderToPipeableStream } from 'react-dom/server';const { pipe } = renderToPipeableStream(<App />,{ identifierPrefix: 'react-app1' });
```

```
// Clientimport { hydrateRoot } from 'react-dom/client';const domNode = document.getElementById('root');const root = hydrateRoot(domNode,reactNode,{ identifierPrefix: 'react-app1' });
```

No necesitas pasar `identifierPrefix` si solo tienes una aplicación de React en la página.
