---
title: useEffect – React
source: https://es.react.dev/reference/react/useEffect
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useEffect – React

`useEffect` es un Hook de React que te permite [sincronizar un componente con un sistema externo.](https://es.react.dev/learn/synchronizing-with-effects)

```
useEffect(setup, dependencies?)
```

*   [Referencia](#reference)
    *   [`useEffect(configuración, dependencias?)`](#useeffect)
*   [Uso](#usage)
    *   [Conexión a un sistema externo](#connecting-to-an-external-system)
    *   [Envolver los efectos en Hooks personalizados](#wrapping-effects-in-custom-hooks)
    *   [Controlar un widget que no sea de React](#controlling-a-non-react-widget)
    *   [Obtención de datos con Efectos](#fetching-data-with-effects)
    *   [Especificación de dependencias reactivas](#specifying-reactive-dependencies)
    *   [Actualización del estado basado en el estado anterior de un efecto](#updating-state-based-on-previous-state-from-an-effect)
    *   [Eliminación de dependencias de objetos innecesarios](#removing-unnecessary-object-dependencies)
    *   [Eliminación de dependencias de funciones innecesarias](#removing-unnecessary-function-dependencies)
    *   [Lectura de las últimas props y el estado desde un Efecto](#reading-the-latest-props-and-state-from-an-effect)
    *   [Mostrar contenidos diferentes en el servidor y en el cliente](#displaying-different-content-on-the-server-and-the-client)
*   [Solución de problemas](#troubleshooting)
    *   [Mi efecto se ejecuta dos veces cuando el componente se monta](#my-effect-runs-twice-when-the-component-mounts)
    *   [Mi efecto se ejecuta después de cada rerenderizado](#my-effect-runs-after-every-re-render)
    *   [Mi efecto se repite en un ciclo infinito](#my-effect-keeps-re-running-in-an-infinite-cycle)
    *   [Mi lógica de limpieza se ejecuta a pesar de que mi componente no se ha desmontado](#my-cleanup-logic-runs-even-though-my-component-didnt-unmount)
    *   [Mi efecto hace algo visual, y veo un parpadeo antes de que se ejecute](#my-effect-does-something-visual-and-i-see-a-flicker-before-it-runs)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useEffect(configuración, dependencias?)`[](#useeffect "Link for this heading")

Declara un efecto con `useEffect` en el nivel superior de tu componente:

```
import { useState, useEffect } from 'react';import { createConnection } from './chat.js';function ChatRoom({ roomId }) {const [serverUrl, setServerUrl] = useState('https://localhost:1234');useEffect(() => {const connection = createConnection(serverUrl, roomId);connection.connect();return () => {connection.disconnect();};}, [serverUrl, roomId]);// ...}
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `configuración`: La función con la lógica de tu Efecto. Tu función de configuración también puede devolver opcionalmente una función de limpieza. Cuando tu componente se añade por primera vez al DOM, React ejecutará tu función de configuración. Después de cada renderizado con dependencias cambiadas, React ejecutará primero la función de limpieza (si la proporcionaste) con los valores antiguos, y luego ejecutará tu función de configuración con los nuevos valores. Después de que tu componente sea eliminado del DOM, React ejecutará tu función de limpieza una última vez.
    
*   `dependencias` **opcionales**: La lista de todos los valores reactivos referenciados dentro del código de `configuración`. Los valores reactivos incluyen props, estados, y todas las variables y funciones declaradas directamente dentro del cuerpo de tu componente. Si tu linter está [configurado para React](https://es.react.dev/learn/editor-setup#linting), verificará que cada valor reactivo esté correctamente especificado como una dependencia. La lista de dependencias debe tener un número constante de elementos y estar escrita en línea como `[dep1, dep2, dep3]`. React comparará cada dependencia con su valor anterior utilizando el algoritmo de comparación [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is). Si no se especifican las dependencias en absoluto, su efecto se volverá a ejecutar después de cada renderizado del componente. [Mira la diferencia entre pasar un _array_ de dependencias, un _array_ vacío y ninguna dependencia.](#examples-dependencies)
    

#### Devuelve[](#returns "Link for Devuelve ")

`useEffect` devuelve `undefined`.

#### Advertencias[](#caveats "Link for Advertencias ")

*   `useEffect` es un Hook, por lo que sólo puedes llamarlo en **el nivel superior de tu componente** o en tus propios Hooks. No puedes llamarlo dentro de bucles o condiciones. Si lo necesitas, extrae un nuevo componente y mueve el estado a él.
    
*   Si **no estás tratando de sincronizar con algún sistema externo,** [probablemente no necesites un Efecto.](https://es.react.dev/learn/you-might-not-need-an-effect)
    
*   Cuando el modo estricto está activado, React en el modo desarrollo **ejecutará un ciclo extra de configuración y limpieza** antes de la primera configuración real. Esta es una prueba de estrés que asegura que tu lógica de limpieza “refleje” tu lógica de configuración y que detenga o deshaga cualquier cosa que la configuración esté haciendo. Si esto causa un problema, [necesitas implementar la función de limpieza.](https://es.react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)
    
*   Si alguna de tus dependencias son objetos o funciones definidas dentro del componente, existe el riesgo de que **provoquen que el Efecto se re-ejecute más veces de las necesarias.** Para solucionar esto, elimina las dependencias innecesarias de [objetos](#removing-unnecessary-object-dependencies) y [funciones](#removing-unnecessary-function-dependencies). También puedes [extraer las actualizaciones de estados](#updating-state-based-on-previous-state-from-an-effect) y la [lógica no reactiva](#reading-the-latest-props-and-state-from-an-effect) fuera de tu Efecto.
    
*   Si tu efecto no ha sido causado por una interacción (como un clic), React dejará que el navegador **pinte primero la pantalla actualizada antes de ejecutar tu efecto.** Si tu efecto está haciendo algo visual (por ejemplo, posicionar un tooltip), y el retraso es notable (por ejemplo, parpadea), tendrás que reemplazar `useEffect` por [`useLayoutEffect`.](https://es.react.dev/reference/react/useLayoutEffect)
    
*   Si tu Efecto es causado por una interacción (como un clic), **React puede ejecutar tu Efecto antes de que el navegador pinte la pantalla actualizada**. Esto asegura que el resultado del Efecto pueda ser observado por el sistema de eventos. Normalmente, esto funciona como se espera. Sin embargo, si necesitas posponer el trabajo hasta después de pintar, como una `alert()`, puedes usar `setTimeout`. Consulta [reactwg/react-18/128](https://github.com/reactwg/react-18/discussions/128) para más información.
    
*   Incluso si tu Efecto fue causado por una interacción (como un clic), **React podría permitir al navegador que volviera a pintar la pantalla antes de procesar las actualizaciones de estado dentro de tu Efecto.** Normalmente, eso es lo que quieres. Sin embargo, si debes impedir que el navegador pinte de nuevo la pantalla, tendrás que reemplazar `useEffect` por [`useLayoutEffect`.](https://es.react.dev/reference/react/useLayoutEffect)
    
*   Los efectos **sólo se ejecutan en el lado del cliente.** No se ejecutan durante el renderizado del lado del servidor.
    

* * *

## Uso[](#usage "Link for Uso ")

### Conexión a un sistema externo[](#connecting-to-an-external-system "Link for Conexión a un sistema externo ")

A veces, un componente puede necesitar permanecer conectado a la red, a alguna API del navegador, o a una biblioteca de terceros, mientras se muestra en la página. Estos sistemas no están controlados por React, por lo que se denominan _externos._

Para [conectar tu componente a algún sistema externo,](https://es.react.dev/learn/synchronizing-with-effects) declara `useEffect` en el nivel superior de tu componente:

```
import { useState, useEffect } from 'react';import { createConnection } from './chat.js';function ChatRoom({ roomId }) {const [serverUrl, setServerUrl] = useState('https://localhost:1234');useEffect(() => {const connection = createConnection(serverUrl, roomId);connection.connect();return () => {connection.disconnect();};}, [serverUrl, roomId]);// ...}
```

Tienes que pasar dos argumentos a `useEffect`:

1.  Una _función de configuración_ con código de configuración que se conecta a ese sistema.
    *   La cual debería devolver una _función de limpieza_ con código de limpieza que se desconecta de ese sistema.
2.  Una lista de dependencias incluyendo cada valor de tu componente utilizado dentro de esas funciones.

**React llama a tus funciones de configuración y limpieza siempre que sea necesario, lo que puede ocurrir varias veces:**

1.  Tu código de configuración se ejecuta cuando su componente se añade a la página _(montaje)_.
2.  Después de cada rerenderizado de tu componente donde las dependencias han cambiado:
    *   Primero, tu código de limpieza se ejecuta con las antiguas props y estados.
    *   Luego, tu código de configuración se ejecutará con las nuevas props y estados.
3.  Tu código de limpieza se ejecutará una última vez después de que tu componente sea eliminado de la página _(desmontaje)._

**Vamos a mostrar esta secuencia para el ejemplo anterior.**

Cuando el componente `ChatRoom` se añade a la página, se conectará a la sala de conversación con `serverUrl` y `roomId`. Si cualquiera de los dos, `serverUrl` o `roomId` cambian como resultado de un rerenderizado (digamos, si el usuario elige una sala de chat diferente en un desplegable), tu Efecto se _desconectará de la sala anterior, y se conectara a la siguiente._ Cuando el componente `ChatRoom` sea finalmente eliminado de la página, su efecto se desconectará por última vez.

**Para [ayudarte a encontrar errores,](https://es.react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) en el modo de desarrollo React ejecuta la configuración y la limpiezauna vez más antes de la configuración real.** Se trata de una prueba de estrés que verifica que la lógica de tu efecto se implementa correctamente. Si esto causa problemas visibles, tu función de limpieza está perdiendo algo de lógica. La función de limpieza debe detener o deshacer lo que la función de configuración estaba haciendo. La regla general es que el usuario no debería ser capaz de distinguir entre la configuración que se llama una vez (como en producción) y una secuencia de _configuración_ → _limpieza_ → _configuración_ (como en desarrollo). [Échale un vistazo a las soluciones comunes.](https://es.react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

**Intenta [escribir cada efecto como un proceso independiente](https://es.react.dev/learn/lifecycle-of-reactive-effects#each-effect-represents-a-separate-synchronization-process) y [sólo piensa en un único ciclo de montaje/limpieza a la vez.](https://es.react.dev/learn/lifecycle-of-reactive-effects#thinking-from-the-effects-perspective)** No debería importar si tu componente se está montando, actualizando o desmontando. Cuando tu lógica de limpieza es coherente con la lógica de configuración, tu Efecto será capaz de ejecutar la configuración y limpieza tantas veces como sea necesario.

#### 

Ejemplo

1

de

5:

Conexión a un servidor de chat[](#connecting-to-a-chat-server "Link for this heading")

En este ejemplo, el componente `ChatRoom` utiliza un Efecto para permanecer conectado a un sistema externo definido en `chat.js`. Pulsa “Abrir chat” para que aparezca el componente `ChatRoom`. Este sandbox se ejecuta en modo de desarrollo, por lo que hay un ciclo extra de conexión y desconexión, como [se explica aquí.](https://es.react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) Prueba a cambiar el `roomId` y `serverUrl` usando el desplegable y la entrada, y observa como el efecto se reconecta con el chat. Pulsa “Cerrar chat” para ver cómo el Efecto se desconectará por última vez.

import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const \[serverUrl, setServerUrl\] = useState('https://localhost:1234');

  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () \=> {
      connection.disconnect();
    };
  }, \[roomId, serverUrl\]);

  return (
    <\>
      <label\>
        URL del servidor:{' '}
        <input
          value\={serverUrl}
          onChange\={e \=> setServerUrl(e.target.value)}
        />
      </label\>
      <h1\>¡Bienvenido a la sala {roomId}!</h1\>
    </\>
  );
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  const \[show, setShow\] = useState(false);
  return (
    <\>
      <label\>
        Elija el sitio de chat:{' '}
        <select
          value\={roomId}
          onChange\={e \=> setRoomId(e.target.value)}
        \>
          <option value\="general"\>general</option\>
          <option value\="viaje"\>viaje</option\>
          <option value\="música"\>música</option\>
        </select\>
      </label\>
      <button onClick\={() \=> setShow(!show)}\>
        {show ? 'Cerrar chat' : 'Abrir chat'}
      </button\>
      {show && <hr />}
      {show && <ChatRoom roomId\={roomId} />}
    </\>
  );
}

* * *

### Envolver los efectos en Hooks personalizados[](#wrapping-effects-in-custom-hooks "Link for Envolver los efectos en Hooks personalizados ")

Los efectos son una [“escotilla de escape”:](https://es.react.dev/learn/escape-hatches) los usas cuando necesitas “salirte de React” y cuando no hay una mejor solución. Si te encuentras a menudo con la necesidad de escribir manualmente los efectos, suele ser una señal de que necesitas extraer algunos [Hooks personalizados](https://es.react.dev/learn/reusing-logic-with-custom-hooks) para los comportamientos comunes de los que dependen tus componentes.

Por ejemplo, este Hook personalizado `useChatRoom` “esconde” la lógica de su efecto detrás de una API más declarativa:

```
function useChatRoom({ serverUrl, roomId }) {useEffect(() => {const options = {serverUrl: serverUrl,roomId: roomId};const connection = createConnection(options);connection.connect();return () => connection.disconnect();}, [roomId, serverUrl]);}
```

Entonces puedes usarlo desde cualquier componente como este:

```
function ChatRoom({ roomId }) {const [serverUrl, setServerUrl] = useState('https://localhost:1234');useChatRoom({roomId: roomId,serverUrl: serverUrl});// ...
```

También hay muchos excelentes Hooks personalizados para cada propósito disponibles en el ecosistema de React.

[Más información sobre cómo envolver los efectos en Hooks personalizados.](https://es.react.dev/learn/reusing-logic-with-custom-hooks)

#### 

Ejemplo

1

de

3:

Hook personalizado `useChatRoom`[](#custom-usechatroom-hook "Link for this heading")

Este ejemplo es idéntico a uno de los [ejemplos anteriores,](#examples-connecting) pero la lógica se extrae a un Hook personalizado.

import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';

function ChatRoom({ roomId }) {
  const \[serverUrl, setServerUrl\] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  return (
    <\>
      <label\>
        URL del Servidor:{' '}
        <input
          value\={serverUrl}
          onChange\={e \=> setServerUrl(e.target.value)}
        />
      </label\>
      <h1\>¡Bienvenido a la sala {roomId}!</h1\>
    </\>
  );
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  const \[show, setShow\] = useState(false);
  return (
    <\>
      <label\>
        Elige el sitio de chat:{' '}
        <select
          value\={roomId}
          onChange\={e \=> setRoomId(e.target.value)}
        \>
          <option value\="general"\>general</option\>
          <option value\="viaje"\>viaje</option\>
          <option value\="música"\>música</option\>
        </select\>
      </label\>
      <button onClick\={() \=> setShow(!show)}\>
        {show ? 'Cerrar chat' : 'Abrir chat'}
      </button\>
      {show && <hr />}
      {show && <ChatRoom roomId\={roomId} />}
    </\>
  );
}

* * *

### Controlar un widget que no sea de React[](#controlling-a-non-react-widget "Link for Controlar un widget que no sea de React ")

A veces, quieres mantener un sistema externo sincronizado con alguna prop o estado de tu componente.

Por ejemplo, si tienes un widget de mapa de terceros o un componente reproductor de vídeo escrito sin React, puedes usar un Effect para llamar a los métodos en él que hagan que su estado coincida con el estado actual de tu componente de React. Este efecto crea una instancia de la clase `MapWidget` definida en `map-widget.js`. Cuando cambias la propiedad `zoomLevel` del componente `Map`, el efecto llama a `setZoom()` en la instancia de la clase para mantenerla sincronizada:

import { useRef, useEffect } from 'react';
import { MapWidget } from './map-widget.js';

export default function Map({ zoomLevel }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() \=> {
    if (mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
    }

    const map = mapRef.current;
    map.setZoom(zoomLevel);
  }, \[zoomLevel\]);

  return (
    <div
      style\={{ width: 200, height: 200 }}
      ref\={containerRef}
    />
  );
}

En este ejemplo, no se necesita una función de limpieza porque la clase `MapWidget` solo gestiona el nodo DOM que se le pasó. Después de que el componente de React `Map` se elimine del árbol, tanto el nodo del DOM como la instancia de la clase `MapWidget` serán eliminados automáticamente por el _garbage-collector_ del motor de JavaScript de tu navegador.

* * *

### Obtención de datos con Efectos[](#fetching-data-with-effects "Link for Obtención de datos con Efectos ")

Puedes utilizar un efecto para obtener datos para tu componente. Ten en cuenta que [si utilizas un framework,](https://es.react.dev/learn/start-a-new-react-project#building-with-a-full-featured-framework) usar el mecanismo de datos de tu framework será mucho más eficiente que escribir los efectos manualmente.

Si quieres obtener datos con un Efecto manualmente, tu código podría verse así:

```
import { useState, useEffect } from 'react';import { fetchBio } from './api.js';export default function Page() {const [person, setPerson] = useState('Alice');const [bio, setBio] = useState(null);useEffect(() => {let ignore = false;setBio(null);fetchBio(person).then(result => {if (!ignore) {setBio(result);}});return () => {ignore = true;};}, [person]);// ...
```

Observa que la variable `ignore` se inicializa con `false`, y se reasigna a `true` durante la limpieza. Esto asegura que [tu código no sufra de “condiciones de carrera”:](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect) las respuestas de la red pueden llegar en un orden diferente al que las enviaste.

import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const \[person, setPerson\] = useState('Alice');
  const \[bio, setBio\] = useState(null);
  useEffect(() \=> {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result \=> {
      if (!ignore) {
        setBio(result);
      }
    });
    return () \=> {
      ignore = true;
    }
  }, \[person\]);

  return (
    <\>
      <select value\={person} onChange\={e \=> {
        setPerson(e.target.value);
      }}\>
        <option value\="Alice"\>Alice</option\>
        <option value\="Bob"\>Bob</option\>
        <option value\="Taylor"\>Taylor</option\>
      </select\>
      <hr />
      <p\><i\>{bio ?? 'Cargando...'}</i\></p\>
    </\>
  );
}

También puedes reescribirlo usando la sintaxis [`async` / `await`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function), pero igualmente necesitarás proporcionar una función de limpieza:

import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const \[person, setPerson\] = useState('Alice');
  const \[bio, setBio\] = useState(null);
  useEffect(() \=> {
    async function startFetching() {
      setBio(null);
      const result = await fetchBio(person);
      if (!ignore) {
        setBio(result);
      }
    }

    let ignore = false;
    startFetching();
    return () \=> {
      ignore = true;
    }
  }, \[person\]);

  return (
    <\>
      <select value\={person} onChange\={e \=> {
        setPerson(e.target.value);
      }}\>
        <option value\="Alice"\>Alice</option\>
        <option value\="Bob"\>Bob</option\>
        <option value\="Taylor"\>Taylor</option\>
      </select\>
      <hr />
      <p\><i\>{bio ?? 'Cargando...'}</i\></p\>
    </\>
  );
}

Escribir la obtención de datos directamente en los Efectos se vuelve repetitivo y dificulta la adición de optimizadores como el almacenamiento en caché y el renderizado de lado del servidor más adelante. [Es más fácil utilizar un Hook personalizado, ya sea propio o hecho por la comunidad.](https://es.react.dev/learn/reusing-logic-with-custom-hooks#when-to-use-custom-hooks)

##### Profundizar

#### ¿Cuáles son las mejores alternativas a la obtención de datos con Efectos?[](#what-are-good-alternatives-to-data-fetching-in-effects "Link for ¿Cuáles son las mejores alternativas a la obtención de datos con Efectos? ")

Escribir llamadas `fetch` dentro de Efectos es una forma [popular de obtener datos](https://www.robinwieruch.de/react-hooks-fetch-data/), especialmente en aplicaciones totalmente del lado del cliente. Sin embargo, este es un enfoque muy manual y tiene importantes desventajas:

*   **Los efectos no se ejecutan en el servidor.** Esto significa que el HTML renderizado inicialmente en el servidor sólo incluirá un estado de carga sin datos. El ordenador del cliente tendrá que descargar todo el JavaScript y renderizar tu aplicación sólo para descubrir que ahora necesita cargar los datos. Esto no es muy eficiente.
*   **La obtención de datos directamente en Efectos facilita la creación de “cascadas de red” (_network waterfalls_).** Se renderiza el componente padre, se obtienen algunos datos, luego se renderizan los componentes hijos, y luego ellos hacen lo mismo. Si la red no es muy rápida, este proceso secuencial es significativamente más lento que obtener todos los datos en paralelo de una sola vez.
*   **La obtención de datos directamente en Efectos suele significar que no se pre-cargan ni se almacenan en caché los datos.** Por ejemplo, si el componente se desmonta y se vuelve a montar, tendría que obtener los datos de nuevo.
*   **No es muy ergonómico.** Hay bastante código _boilerplate_ al hacer llamadas `fetch` de tal manera que no sufra de errores como las [condiciones de carrera.](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)

Esta lista de inconvenientes no es específica de React. Se aplica a la obtención de datos en el montaje con cualquier biblioteca. Al igual que con el enrutamiento, la obtención de datos no es trivial para hacerlo bien, por lo que recomendamos los siguientes enfoques:

*   **Si usas un [framework](https://es.react.dev/learn/start-a-new-react-project#building-with-a-full-featured-framework), utiliza su mecanismo de obtención de datos integrado.** Los frameworks modernos de React han integrado mecanismos de obtención de datos que son eficientes y no sufren los inconvenientes anteriores.
*   **De lo contrario, considera la posibilidad de utilizar o construir una caché del lado del cliente.** Las soluciones populares de código abierto incluyen [React Query](https://tanstack.com/query/latest/), [useSWR](https://swr.vercel.app/), y [React Router 6.4+.](https://beta.reactrouter.com/en/main/start/overview) También puedes crear tu propia solución, en cuyo caso se usarían Efectos por debajo, pero también se añadiría lógica para deduplicar las peticiones, almacenar en caché las respuestas y evitar las cascadas de red (pre-cargando los datos o elevando los requisitos de datos a las rutas).

Puedes seguir obteniendo datos directamente en Efectos si ninguno de estos enfoques te conviene.

* * *

### Especificación de dependencias reactivas[](#specifying-reactive-dependencies "Link for Especificación de dependencias reactivas ")

**Observa que no puedes “elegir” las dependencias de tu Efecto.** Cada valor reactivo utilizado por el código de tu efecto debe ser declarado como una dependencia. La lista de dependencias de tu efecto está determinada por el código que lo rodea:

```
function ChatRoom({ roomId }) { // Este es un valor reactivoconst [serverUrl, setServerUrl] = useState('https://localhost:1234'); // Este es también un valor reactivouseEffect(() => {const connection = createConnection(serverUrl, roomId); // Este efecto lee estos valores reactivosconnection.connect();return () => connection.disconnect();}, [serverUrl, roomId]); // ✅ Así que debes especificarlos como dependencias de tu Efecto// ...}
```

Si el `serverUrl` o el `roomId` cambian, tu efecto se reconectará al chat usando los nuevos valores.

**Los [valores reactivos](https://es.react.dev/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) incluyen props y todas las variables y funciones declaradas directamente dentro de su componente.** Como `roomId` y `serverUrl` son valores reactivos, no puedes eliminarlos de la lista de dependencias. Si intentas omitirlos y [tu linter está correctamente configurado para React,](https://es.react.dev/learn/editor-setup#linting) el linter lo marcará como un error que debes corregir:

```
function ChatRoom({ roomId }) {const [serverUrl, setServerUrl] = useState('https://localhost:1234');useEffect(() => {const connection = createConnection(serverUrl, roomId);connection.connect();return () => connection.disconnect();}, []); // 🔴 React Hook useEffect tiene dependencias faltantes: 'roomId' y 'serverUrl'// ...}
```

**Para eliminar una dependencia, tienes que [“demostrar” al linter que _no necesita_ ser una dependencia.](https://es.react.dev/learn/removing-effect-dependencies#removing-unnecessary-dependencies)** Por ejemplo, puedes mover `serverUrl` fuera de tu componente para demostrar que no es reactivo y que no cambiará en los rerenderizados:

```
const serverUrl = 'https://localhost:1234'; // Ya no es un valor reactivofunction ChatRoom({ roomId }) {useEffect(() => {const connection = createConnection(serverUrl, roomId);connection.connect();return () => connection.disconnect();}, [roomId]); // ✅ Todas las dependencias declaradas// ...}
```

Ahora que `serverUrl` no es un valor reactivo (y no puede cambiar en un renderizado), no necesita ser una dependencia. **Si el código de tu efecto no utiliza ningún valor reactivo, su lista de dependencias debería estar vacía (`[]`):**

```
const serverUrl = 'https://localhost:1234'; // Ya no es un valor reactivoconst roomId = 'música'; // Ya no es un valor reactivofunction ChatRoom() {useEffect(() => {const connection = createConnection(serverUrl, roomId);connection.connect();return () => connection.disconnect();}, []); // ✅ Todas las dependencias declaradas// ...}
```

[Un efecto con dependencias](https://es.react.dev/learn/lifecycle-of-reactive-effects#what-an-effect-with-empty-dependencies-means) vacías no se vuelve a ejecutar cuando cambian las props o el estado del componente.

### Atención

Si tienes una base de código existente, puede que tengas algunos efectos que supriman el linter de esta manera:

```
useEffect(() => {// ...// 🔴 Evite suprimir el linter de esta manera:// eslint-ignore-next-line react-hooks/exhaustive-deps}, []);
```

**Cuando las dependencias no coinciden con el código, existe un alto riesgo de introducir errores.** Al suprimir el linter, le “mientes” a React sobre los valores de los que depende tu efecto. [En su lugar, demuestra que son innecesarios.](https://es.react.dev/learn/removing-effect-dependencies#removing-unnecessary-dependencies)

#### 

Ejemplo

1

de

3:

Pasar un _array_ de dependencias[](#passing-a-dependency-array "Link for this heading")

Si especificas las dependencias, su Efecto se ejecuta **después del renderizado inicial _y_ después de los rerenderizados con las dependencias cambiadas.**

```
useEffect(() => {// ...}, [a, b]); // Se ejecuta de nuevo si a o b son diferentes
```

En el siguiente ejemplo, `serverUrl` y `roomId` son [valores reactivos,](https://es.react.dev/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) por lo que ambos deben ser especificados como dependencias. Como resultado, la selección de un sitio diferente en el menú desplegable o la edición de la entrada de la URL del servidor hace que el chat se vuelva a conectar. Sin embargo, dado que `message` no se utiliza en el efecto (y por tanto no es una dependencia), la edición del mensaje no reconecta el chat.

import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const \[serverUrl, setServerUrl\] = useState('https://localhost:1234');
  const \[message, setMessage\] = useState('');

  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () \=> {
      connection.disconnect();
    };
  }, \[serverUrl, roomId\]);

  return (
    <\>
      <label\>
        URL del servidor:{' '}
        <input
          value\={serverUrl}
          onChange\={e \=> setServerUrl(e.target.value)}
        />
      </label\>
      <h1\>¡Bienvenido a la sala {roomId}!</h1\>
      <label\>
        Tu mensaje:{' '}
        <input value\={message} onChange\={e \=> setMessage(e.target.value)} />
      </label\>
    </\>
  );
}

export default function App() {
  const \[show, setShow\] = useState(false);
  const \[roomId, setRoomId\] = useState('general');
  return (
    <\>
      <label\>
        Elija el sitio de chat:{' '}
        <select
          value\={roomId}
          onChange\={e \=> setRoomId(e.target.value)}
        \>
          <option value\="general"\>general</option\>
          <option value\="viaje"\>viaje</option\>
          <option value\="música"\>música</option\>
        </select\>
        <button onClick\={() \=> setShow(!show)}\>
          {show ? 'Cerrar chat' : 'Abrir chat'}
        </button\>
      </label\>
      {show && <hr />}
      {show && <ChatRoom roomId\={roomId}/>}
    </\>
  );
}

* * *

### Actualización del estado basado en el estado anterior de un efecto[](#updating-state-based-on-previous-state-from-an-effect "Link for Actualización del estado basado en el estado anterior de un efecto ")

Cuando quieras actualizar el estado basándote en el estado anterior de un Efecto, puedes encontrarte con un problema:

```
function Counter() {const [count, setCount] = useState(0);useEffect(() => {const intervalId = setInterval(() => {setCount(count + 1); // Quieres incrementar el contador cada segundo...}, 1000)return () => clearInterval(intervalId);}, [count]); // 🚩 ... pero al especificar `count` como dependencia siempre reinician el intervalo.// ...}
```

Como `count` es un valor reactivo, debe ser especificado en la lista de dependencias. Sin embargo, eso hace que el Efecto se limpie y se configure de nuevo cada vez que `count` cambia. Esto resulta inadecuado.

Para solucionar esto, [pásale el actualizador de estado `c => c + 1`](https://es.react.dev/reference/react/useState#updating-state-based-on-the-previous-state) a `setCount`:

Ahora que pasas `c => c + 1` en lugar de `count + 1`, [tu Efecto ya no necesita depender de un `count`.](https://es.react.dev/learn/removing-effect-dependencies#are-you-reading-some-state-to-calculate-the-next-state) Como resultado de esta corrección, no tendrá que limpiar y configurar el intervalo de nuevo cada vez que el recuento cambia.

* * *

### Eliminación de dependencias de objetos innecesarios[](#removing-unnecessary-object-dependencies "Link for Eliminación de dependencias de objetos innecesarios ")

Si tu Efecto depende de un objeto o de una función creada durante el renderizado, puede que se ejecute con más frecuencia de la necesaria. Por ejemplo, este Efecto se reconecta después de cada renderizado porque el objeto `options` es [diferente para cada renderizado:](https://es.react.dev/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally)

```
const serverUrl = 'https://localhost:1234';function ChatRoom({ roomId }) {const [message, setMessage] = useState('');const options = { // 🚩 Este objeto se crea desde cero en cada rerenderizadoserverUrl: serverUrl,roomId: roomId};useEffect(() => {const connection = createConnection(options); // Se usa dentro del Efectoconnection.connect();return () => connection.disconnect();}, [options]); // 🚩 Como resultado, estas dependencias son siempre diferentes en un renderizado// ...
```

Evita utilizar como dependencia un objeto creado durante el renderizado. En su lugar, crea el objeto dentro del Efecto:

import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const \[message, setMessage\] = useState('');

  useEffect(() \=> {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () \=> connection.disconnect();
  }, \[roomId\]);

  return (
    <\>
      <h1\>¡Bienvenido a la sala {roomId}!</h1\>
      <input value\={message} onChange\={e \=> setMessage(e.target.value)} />
    </\>
  );
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  return (
    <\>
      <label\>
        Escoge la sala de chat:{' '}
        <select
          value\={roomId}
          onChange\={e \=> setRoomId(e.target.value)}
        \>
          <option value\="general"\>general</option\>
          <option value\="viaje"\>viaje</option\>
          <option value\="música"\>música</option\>
        </select\>
      </label\>
      <hr />
      <ChatRoom roomId\={roomId} />
    </\>
  );
}

Ahora que creas el objeto `options` dentro del Efecto, el propio Efecto sólo depende del string `roomId`.

Con esta solución, escribir en la entrada no reconecta el chat. A diferencia de un objeto que se vuelve a crear, una _string_ como `roomId` no cambia a menos que la establezcas con otro valor. [Más información sobre la eliminación de dependencias.](https://es.react.dev/learn/removing-effect-dependencies)

* * *

### Eliminación de dependencias de funciones innecesarias[](#removing-unnecessary-function-dependencies "Link for Eliminación de dependencias de funciones innecesarias ")

Si tu Efecto depende de un objeto o de una función creada durante el renderizado, puede que se ejecute con más frecuencia de la necesaria. Por ejemplo, este Efecto se reconecta después de cada renderizado porque la función `createOptions` es [diferente para cada renderizado:](https://es.react.dev/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally)

```
function ChatRoom({ roomId }) {const [message, setMessage] = useState('');function createOptions() { // 🚩 Esta función se crea desde cero en cada renderizadoreturn {serverUrl: serverUrl,roomId: roomId};}useEffect(() => {const options = createOptions(); // Se usa dentro del Efectoconst connection = createConnection();connection.connect();return () => connection.disconnect();}, [createOptions]); // 🚩 Como resultado, estas dependencias son siempre diferentes en un renderizado// ...
```

Por sí mismo, crear una función desde cero en cada renderizado no es un problema. No es necesario optimizar eso. Sin embargo, si lo usas como una dependencia de tu Efecto, hará que tu Efecto se vuelva a ejecutar después de cada rerenderizado.

Evita utilizar como dependencia una función creada durante el renderizado. En su lugar, declárala dentro del Efecto:

import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const \[message, setMessage\] = useState('');

  useEffect(() \=> {
    function createOptions() {
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () \=> connection.disconnect();
  }, \[roomId\]);

  return (
    <\>
      <h1\>¡Bienvenido a la sala {roomId}!</h1\>
      <input value\={message} onChange\={e \=> setMessage(e.target.value)} />
    </\>
  );
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  return (
    <\>
      <label\>
        Elige el sitio de chat:{' '}
        <select
          value\={roomId}
          onChange\={e \=> setRoomId(e.target.value)}
        \>
          <option value\="general"\>general</option\>
          <option value\="viaje"\>viaje</option\>
          <option value\="música"\>música</option\>
        </select\>
      </label\>
      <hr />
      <ChatRoom roomId\={roomId} />
    </\>
  );
}

Ahora que se define la función `createOptions` function inside the Effect, dentro del Efecto, el Efecto mismo sólo depende del string `roomId`. Con esta solución, escribir en la entrada no reconecta el chat. A diferencia de una función que se vuelve a crear, una _string_ como `roomId` no cambia a menos que la establezcas con otro valor. [Lee más sobre la eliminación de dependencias.](https://es.react.dev/learn/removing-effect-dependencies)

* * *

### Lectura de las últimas props y el estado desde un Efecto[](#reading-the-latest-props-and-state-from-an-effect "Link for Lectura de las últimas props y el estado desde un Efecto ")

### En construcción

Esta sección describe una **API experimental que aún no se ha añadido a React,** por lo que todavía no se puede utilizar.

Por defecto, cuando lees un valor reactivo de un Efecto, tienes que añadirlo como una dependencia. Esto asegura que tu Efecto “reacciona” a cada cambio de ese valor. Para la mayoría de las dependencias, ese es el comportamiento que quieres.

**Sin embargo, a veces querrá leer las _últimas_ props y estados de un efecto sin “reaccionar” a ellos.** Por ejemplo, imagina que quieres registrar el número de artículos del carrito de compras en cada visita a la página:

```
function Page({ url, shoppingCart }) {useEffect(() => {logVisit(url, shoppingCart.length);}, [url, shoppingCart]); // ✅ Todas las dependencias declaradas// ...}
```

**¿Qué pasa si quieres registrar una nueva visita a la página después de cada cambio de `url`, pero _no_ si sólo cambia el `shoppingCart`?** No puedes excluir `shoppingCart` de las dependencias sin romper las [reglas de reactividad.](#specifying-reactive-dependencies) Sin embargo, puedes expresar que _no quieres_ que una parte de código “reaccione” a los cambios aunque sea llamado desde dentro de un Efecto. Para hacer esto, [declara un _Efecto de evento_](https://es.react.dev/learn/separating-events-from-effects#declaring-an-effect-event) con el Hook [`useEffectEvent`](https://es.react.dev/reference/react/experimental_useEffectEvent), y mueve el código que lea al `shoppingCart` dentro de tal Hook:

```
function Page({ url, shoppingCart }) {const onVisit = useEffectEvent(visitedUrl => {logVisit(visitedUrl, shoppingCart.length)});useEffect(() => {onVisit(url);}, [url]); // ✅ Todas las dependencias declaradas// ...}
```

**Los Eventos de efecto no son reactivos y nunca serán especificados como dependencias de tu Efecto.** Esto es lo que te permite poner código no reactivo (donde puedes leer el último valor de algunas props y estados) dentro de ellos. Por ejemplo, al leer `shoppingCart` dentro de `onVisit`, te aseguras de que `shoppingCart` no vuelva a ejecutar tu efecto. En el futuro, el linter tendrá soporte para useEffectEvent y comprobará que se omiten los Eventos de efectos de las dependencias.

[Lee más sobre cómo los eventos de efecto te permiten separar el código reactivo del no reactivo.](https://es.react.dev/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events)

* * *

### Mostrar contenidos diferentes en el servidor y en el cliente[](#displaying-different-content-on-the-server-and-the-client "Link for Mostrar contenidos diferentes en el servidor y en el cliente ")

Si tu aplicación utiliza renderizado de lado del servidor (ya sea [directamente](https://es.react.dev/reference/react-dom/server) o a través de un [framework](https://es.react.dev/learn/start-a-new-react-project#building-with-a-full-featured-framework)), tu componente se renderizará en dos entornos diferentes. En el servidor, se renderizará para producir el HTML inicial. En el cliente, React ejecutará de nuevo el código de renderizado para poder adjuntar tus controladores de eventos a ese HTML. Por eso, para que la [hidratación](https://es.react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html) funcione, tu salida inicial de renderizado debe ser idéntica en el cliente y en el servidor.

En raras ocasiones, es posible que necesites mostrar un contenido diferente en el cliente. Por ejemplo, si su aplicación lee algunos datos del [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), no puede hacerlo en el servidor. Así es como típicamente se implementaría esto:

```
function MyComponent() {const [didMount, setDidMount] = useState(false);useEffect(() => {setDidMount(true);}, []);if (didMount) {// ... devolver JSX sólo para clientes ...}  else {// ... devolver el JSX inicial ...}}
```

Mientras se carga la aplicación, el usuario verá la salida del renderizado inicial. Luego, cuando esté cargada e hidratada, tu efecto se ejecutará y establecerá `didMount` a `true`, disparando un rerenderizado. Esto cambiará a la salida de renderizado sólo para el cliente. Ten en cuenta que los Efectos no se ejecutan en el servidor, por eso `didMount` era `false` durante el renderizado inicial del servidor.

Utiliza este patrón con moderación. Ten en cuenta que los usuarios con una conexión lenta verán el contenido inicial durante bastante tiempo -potencialmente, muchos segundos- por lo que no querrás hacer cambios bruscos en la apariencia de tu componente. En muchos casos, puedes evitar la necesidad de esto mostrando condicionalmente diferentes cosas con CSS.

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### Mi efecto se ejecuta dos veces cuando el componente se monta[](#my-effect-runs-twice-when-the-component-mounts "Link for Mi efecto se ejecuta dos veces cuando el componente se monta ")

Cuando el modo estricto está activado, en el desarrollo, React ejecuta la configuración y la limpieza una vez más antes de la configuración real.

Esta es una prueba de estrés que verifica que la lógica de su efecto se implementa correctamente. Si esto causa problemas visibles, probablemente tengas que echarle un ojo a tu función de limpieza. La función de limpieza debe detener o deshacer lo que la función de configuración estaba haciendo. La regla general es que el usuario no debería ser capaz de distinguir entre la configuración que se llama una vez (como en producción) y una secuencia de configuración → limpieza → configuración (como en desarrollo).

Lee más sobre [cómo esto ayuda a encontrar errores](https://es.react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) y [cómo arreglar tu lógica.](https://es.react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

* * *

### Mi efecto se ejecuta después de cada rerenderizado[](#my-effect-runs-after-every-re-render "Link for Mi efecto se ejecuta después de cada rerenderizado ")

En primer lugar, comprueba que no has olvidado especificar el _array_ de dependencias:

```
useEffect(() => {// ...}); // 🚩 No hay array de dependencias: ¡se vuelve a ejecutar después de cada renderizado!
```

Si has especificado el _array_ de dependencias, pero tu Efecto aún se vuelve a ejecutar en un bucle, es porque una de tus dependencias es diferente en cada rerenderizado.

Puedes depurar este problema imprimiendo manualmente tus dependencias en la consola:

```
useEffect(() => {// ..}, [serverUrl, roomId]);console.log([serverUrl, roomId]);
```

A continuación, puedes hacer clic con el botón derecho del ratón en los _arrays_ de las diferentes renderizaciones en la consola y seleccionar “Guardar como variable global” para ambas. Suponiendo que la primera se guardó como `temp1` y la segunda se guardó como `temp2`, entonces puedes usar la consola del navegador para comprobar si cada dependencia en ambos array es la misma:

```
Object.is(temp1[0], temp2[0]); // ¿La primera dependencia es la misma entre los arrays?Object.is(temp1[1], temp2[1]); // ¿La segunda dependencia es la misma entre los arrays?Object.is(temp1[2], temp2[2]); // ... y así sucesivamente para cada dependencia ...
```

Cuando encuentres la dependencia que es diferente en cada renderizado, normalmente puedes arreglarlo de una de estas maneras:

*   [Actualización del estado basado en el estado anterior de un efecto](#updating-state-based-on-previous-state-from-an-effect)
*   [Eliminación de dependencias de objetos innecesarias](#removing-unnecessary-object-dependencies)
*   [Eliminación de dependencias de funciones innecesarias](#removing-unnecessary-function-dependencies)
*   [Lectura de las últimas props y estados de un efecto](#reading-the-latest-props-and-state-from-an-effect)

Como último recurso (si estos métodos no ayudan) [envuelve el valor con `useMemo`](https://es.react.dev/reference/react/useMemo#memoizing-a-dependency-of-another-hook) o, en funciones, [con `useCallback`](https://es.react.dev/reference/react/useCallback#preventing-an-effect-from-firing-too-often) (para funciones).

* * *

### Mi efecto se repite en un ciclo infinito[](#my-effect-keeps-re-running-in-an-infinite-cycle "Link for Mi efecto se repite en un ciclo infinito ")

Si tu Efecto se ejecuta en un ciclo infinito, estas dos cosas deben estar ocurriendo:

*   Tu efecto está actualizando algún estado.
*   Ese estado provoca a un rerenderizado, lo que hace que las dependencias del Efecto cambien.

Antes de empezar a solucionar el problema, pregúntate si tu efecto se está conectando a algún sistema externo (como el DOM, la red, un widget de terceros, etc.). ¿Por qué tu efecto necesita establecer un estado? ¿Sincroniza algún estado con ese sistema externo? ¿O estás intentando gestionar el flujo de datos de tu aplicación con él?

Si no hay un sistema externo, considera si la [eliminación del Efecto por completo](https://es.react.dev/learn/you-might-not-need-an-effect) simplificaría su lógica.

Si realmente estás sincronizando con algún sistema externo, piensa por qué y bajo qué condiciones tu Efecto debe actualizar el estado. ¿Ha cambiado algo que afecta a la salida visual de tu componente? Si necesitas hacer un seguimiento de algunos datos que no son utilizados por el renderizado, una [ref](https://es.react.dev/reference/react/useRef#referencing-a-value-with-a-ref) (que no desencadena la rerenderizado) podría ser más apropiada. Comprueba que tu efecto no actualiza el estado (y no provoca la rerenderizado) más de lo necesario.

Por último, si tu efecto está actualizando el estado en el momento adecuado, pero sigue habiendo un bucle, es porque esa actualización de estado hace que cambie una de las dependencias de tu efecto. [Lee cómo depurar y resolver los cambios de dependencias.](https://es.react.dev/reference/react/useEffect#my-effect-runs-after-every-re-render)

* * *

### Mi lógica de limpieza se ejecuta a pesar de que mi componente no se ha desmontado[](#my-cleanup-logic-runs-even-though-my-component-didnt-unmount "Link for Mi lógica de limpieza se ejecuta a pesar de que mi componente no se ha desmontado ")

La función de limpieza se ejecuta no sólo durante el desmontaje, sino antes de cada renderizado con dependencias cambiadas. Además, en el desarrollo, React [ejecuta una configuración y limpieza una vez más inmediatamente después de montar el componente.](#my-effect-runs-twice-when-the-component-mounts)

Si tienes código de limpieza sin el correspondiente código de configuración, suele ser un error de código:

```
useEffect(() => {// 🔴 Avoid: Lógica de limpieza sin la correspondiente lógica de configuraciónreturn () => {doSomething();};}, []);
```

Tu lógica de limpieza debería ser “simétrica” a la lógica de configuración, y debe detener o deshacer lo que hizo la configuración:

```
useEffect(() => {const connection = createConnection(serverUrl, roomId);connection.connect();return () => {connection.disconnect();};}, [serverUrl, roomId]);
```

[Aprende cómo el ciclo de vida del efecto es diferente del ciclo de vida del componente.](https://es.react.dev/learn/lifecycle-of-reactive-effects#the-lifecycle-of-an-effect)

* * *

### Mi efecto hace algo visual, y veo un parpadeo antes de que se ejecute[](#my-effect-does-something-visual-and-i-see-a-flicker-before-it-runs "Link for Mi efecto hace algo visual, y veo un parpadeo antes de que se ejecute ")

Si tu efecto debe evitar que el navegador [pinte la pantalla,](https://es.react.dev/learn/render-and-commit#epilogue-browser-paint) sustituye `useEffect` por [`useLayoutEffect`](https://es.react.dev/reference/react/useLayoutEffect). Ten en cuenta que esto **no debería ser necesario para la gran mayoría de los Efectos.** Sólo lo necesitarás si es crucial ejecutar tu Efecto antes de que el navegador pinte la pantalla: por ejemplo, para medir y posicionar un _tooltip_ antes de que el usuario lo vea por primera vez.
