---
title: <Suspense> – React
source: https://es.react.dev/reference/react/Suspense
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# <Suspense> – React

`<Suspense>` te permite mostrar una interfaz alternativa o _fallback_ hasta que sus hijos hayan terminado de cargar.

```
<Suspense fallback={<Loading />}><SomeComponent /></Suspense>
```

*   [Referencia](#reference)
    *   [`<Suspense>`](#suspense)
*   [Uso](#usage)
    *   [Visualización de una interfaz alternativa mientras se carga el contenido](#displaying-a-fallback-while-content-is-loading)
    *   [Revelar contenido todo de una vez](#revealing-content-together-at-once)
    *   [Revelar el contenido anidado mientras se carga](#revealing-nested-content-as-it-loads)
    *   [Mostrar contenido antiguo mientras se carga el nuevo](#showing-stale-content-while-fresh-content-is-loading)
    *   [Prevenir que el contenido ya revelado se esconda](#preventing-already-revealed-content-from-hiding)
    *   [Indicar que está ocurriendo una Transición](#indicating-that-a-transition-is-happening)
    *   [Reiniciar las barreras de Suspense al navegar](#resetting-suspense-boundaries-on-navigation)
    *   [Proporcionar un _fallback_ para errores de servidor y contenido solo-cliente](#providing-a-fallback-for-server-errors-and-client-only-content)
*   [Solución de problemas](#troubleshooting)
    *   [¿Cómo puedo evitar que la interfaz de usuario sea sustituida por un _fallback_ durante una actualización?](#preventing-unwanted-fallbacks)

* * *

## Referencia[](#reference "Link for Referencia ")

### `<Suspense>`[](#suspense "Link for this heading")

#### Props[](#props "Link for Props ")

*   `children`: La interfaz que realmente se pretende renderizar. Si `children` se suspende mientras se renderiza, la barrera de Suspense pasará a renderizar `fallback`.
*   `fallback`: Una interfaz alternativa a renderizar en lugar de la interfaz real si esta no ha terminado de cargar. Se acepta cualquier nodo React válido, aunque en la práctica, un _fallback_ es una vista ligera de relleno, como un _spinner_ de carga o un esqueleto. Suspense cambiará automáticamente a `fallback` cuando `children` se suspenda, y volverá a `children` cuando los datos estén listos. Si `fallback` se suspende mientras se renderiza, activará la barrera de Suspense padre más cercana.

#### Advertencias[](#caveats "Link for Advertencias ")

*   React no preserva ningún estado para los renderizados que se suspendieron antes de que pudieran montarse por primera vez. Cuando el componente se haya cargado, React volverá a intentar renderizar el árbol suspendido desde cero.
*   Si la suspensión estaba mostrando contenido para el árbol, pero luego se volvió a suspender, el `fallback` se mostrará de nuevo a menos que la actualización que lo causó fuese causada por [`startTransition`](https://es.react.dev/reference/react/startTransition) o [`useDeferredValue`](https://es.react.dev/reference/react/useDeferredValue).
*   Si React necesita ocultar el contenido ya visible porque se suspendió de nuevo, limpiará [los Efectos de _layout_](https://es.react.dev/reference/react/useLayoutEffect) en el árbol de contenido. Cuando el contenido esté listo para mostrarse de nuevo, React disparará los Efectos de _layout_ de nuevo. Esto le permite asegurarse de que los Efectos que miden el diseño del DOM no intentan hacerlo mientras el contenido está oculto.
*   React incluye optimizaciones internas como _Renderizado en el servidor con Streaming_ e _Hidratación selectiva_ que se integran con Suspense. Puedes leer [una visión general de la arquitectura](https://github.com/reactwg/react-18/discussions/37) y ver [esta charla técnica](https://www.youtube.com/watch?v=pj5N-Khihgc) para conocer más.

* * *

## Uso[](#usage "Link for Uso ")

### Visualización de una interfaz alternativa mientras se carga el contenido[](#displaying-a-fallback-while-content-is-loading "Link for Visualización de una interfaz alternativa mientras se carga el contenido ")

Puedes envolver cualquier parte de la aplicación con un barrera de Suspense:

```
<Suspense fallback={<Loading />}><Albums /></Suspense>
```

React mostrará tu _fallback_ de carga hasta que se haya cargado todo el código y los datos que necesiten los hijos.

En el ejemplo de abajo, el componente `Albums` _se suspende_ mientras carga la lista de álbumes. Hasta que no esté listo para renderizar, React hace que la barrera de Suspense más próxima desde arriba cambie a mostrar el _fallback_: tu componente `Loading`. Luego, una vez que se carguen los datos, React esconde el _fallback_ `Loading` y renderiza el componente `Albums` con datos.

import { Suspense } from 'react';
import Albums from './Albums.js';

export default function ArtistPage({ artist }) {
  return (
    <\>
      <h1\>{artist.name}</h1\>
      <Suspense fallback\={<Loading />}\>
        <Albums artistId\={artist.id} />
      </Suspense\>
    </\>
  );
}

function Loading() {
  return <h2\>🌀 Loading...</h2\>;
}

### Nota

**Sólo las fuentes de datos habilitadas para Suspense activarán un componente Suspense.** Entre ellas se incluyen:

*   Carga de datos en frameworks capaces de manejar Suspense como [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) y [Next.js](https://nextjs.org/docs/getting-started/react-essentials)
*   Código de carga diferida de componentes con [`lazy`](https://es.react.dev/reference/react/lazy)
*   Leer el valor de una promesa guardada en caché con [`use`](https://es.react.dev/reference/react/use)

Suspense **no** detecta la carga de datos cuando se hace en un Efecto o un controlador de evento.

La forma exacta en que cargarías los datos en el componente `Albums` de arriba depende de tu framework. Si usas un framework capaz de manejar Suspense, encontrarás los detalles en su documentación de la carga de datos.

Aún no se admite la carga de datos con Suspense sin el uso de un framework que tenga su propia forma de implementarla. Los requisitos para implementar una fuente de datos habilitada para Suspense son inestables y no están documentados. En una futura versión de React se publicará una API oficial para integrar fuentes de datos con Suspense.

* * *

### Revelar contenido todo de una vez[](#revealing-content-together-at-once "Link for Revelar contenido todo de una vez ")

Por defecto, todo el árbol dentro de Suspense se trata como una sola unidad. Por ejemplo, incluso si _solo uno_ de estos componentes se suspende mientras espera por algunos datos, _todos_ juntos serán reemplazados por el indicador de carga:

```
<Suspense fallback={<Loading />}><Biography /><Panel><Albums /></Panel></Suspense>
```

Luego, una vez que todos estén listos para mostrarse, aparecerán todos de una vez.

En el ejemplo de abajo, tanto `Biography` como `Albums` cargan algunos datos. Sin embargo, como están agrupados en la misma barrera de Suspense, estos componentes siempre “aparecen\* juntos al mismo tiempo.

import { Suspense } from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';

export default function ArtistPage({ artist }) {
  return (
    <\>
      <h1\>{artist.name}</h1\>
      <Suspense fallback\={<Loading />}\>
        <Biography artistId\={artist.id} />
        <Panel\>
          <Albums artistId\={artist.id} />
        </Panel\>
      </Suspense\>
    </\>
  );
}

function Loading() {
  return <h2\>🌀 Loading...</h2\>;
}

Los componentes que cargan datos no tienen que ser hijos directos de una barrera de Suspense. Por ejemplo, puedes mover `Biography` y `Albums` dentro de un nuevo componente `Details`. Esto no cambia el comportamiento. Como `Biography` y `Albums` comparten la misma barrera de Suspense más cercana, se muestran juntos de forma coordinada.

```
<Suspense fallback={<Loading />}><Details artistId={artist.id} /></Suspense>function Details({ artistId }) {return (<><Biography artistId={artistId} /><Panel><Albums artistId={artistId} /></Panel></>);}
```

* * *

### Revelar el contenido anidado mientras se carga[](#revealing-nested-content-as-it-loads "Link for Revelar el contenido anidado mientras se carga ")

Cuando un componente se suspende, el componente Suspense padre más cercan muestra el _fallback_. Esto te permite anidar varios componentes Suspense para crear una secuencia de carga. El _fallback_ de cada barrera de Suspense se rellenará a medida que el siguiente nivel de contenido esté disponible. Por ejemplo, puedes darle su propio _fallback_ de carga a la lista de álbumes:

```
<Suspense fallback={<BigSpinner />}><Biography /><Suspense fallback={<AlbumsGlimmer />}><Panel><Albums /></Panel></Suspense></Suspense>
```

Con este cambio, no se necesita esperar por que cargue `Albums` para mostrar `Biography`.

La secuencia sería:

1.  Si `Biography` aún no ha cargado, se muestra `BigSpinner` en lugar de toda el área de contenido.
2.  Una vez que `Biography` termine de cargar, `BigSpinner` se reemplaza por el contenido.
3.  Si `Albums` aún no ha cargado, se muestra `AlbumsGlimmer` en lugar de `Albums` y su padre `Panel`.
4.  Por último, una vez que `Albums` termina de cargar, reemplaza a `AlbumsGlimmer`.

import { Suspense } from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';

export default function ArtistPage({ artist }) {
  return (
    <\>
      <h1\>{artist.name}</h1\>
      <Suspense fallback\={<BigSpinner />}\>
        <Biography artistId\={artist.id} />
        <Suspense fallback\={<AlbumsGlimmer />}\>
          <Panel\>
            <Albums artistId\={artist.id} />
          </Panel\>
        </Suspense\>
      </Suspense\>
    </\>
  );
}

function BigSpinner() {
  return <h2\>🌀 Loading...</h2\>;
}

function AlbumsGlimmer() {
  return (
    <div className\="glimmer-panel"\>
      <div className\="glimmer-line" />
      <div className\="glimmer-line" />
      <div className\="glimmer-line" />
    </div\>
  );
}

Las barrearas de Suspense te permiten coordinar qué partes de tu UI deben siempre “aparecer” juntas al mismo tiempo y qué partes deberían revelar progresivamente más contenido en una secuencia de estados de carga. Puedes añadir, mover o eliminar barreras de Suspense en cualquier lugar del árbol sin afectar el comportamiento restante de tu aplicación.

No pongas una barrera de Suspense alrededor de cada componte. Las barreras de Suspense no deberían ser más granulares que la secuencia de carga que quieres que el usuario experimente. Si trabajas con un diseñador, pregúntale dónde deben colocarse los estados de carga —es probable que ya los hayan incluido en el diseño de sus _wireframes_.

* * *

### Mostrar contenido antiguo mientras se carga el nuevo[](#showing-stale-content-while-fresh-content-is-loading "Link for Mostrar contenido antiguo mientras se carga el nuevo ")

En este ejemplo, el componente `SearchResults` se suspende mientras carga los resultados de búsqueda. Intenta escribir `"a"`, espera por los resultados, y luego edítalo a `"ab"`. Los resultados para `"a"` se reemplazarán por el _fallback_ de carga.

import { Suspense, useState } from 'react';
import SearchResults from './SearchResults.js';

export default function App() {
  const \[query, setQuery\] = useState('');
  return (
    <\>
      <label\>
        Buscar álbumes:
        <input value\={query} onChange\={e \=> setQuery(e.target.value)} />
      </label\>
      <Suspense fallback\={<h2\>Loading...</h2\>}\>
        <SearchResults query\={query} />
      </Suspense\>
    </\>
  );
}

Un patrón de UI común consiste en _aplazar_ la actualización de la lista de resultados y seguir mostrando los resultados anteriores hasta que los nuevos resultados estén listos. El Hook [`useDeferredValue`](https://es.react.dev/reference/react/useDeferredValue) te permite pasar una versión aplazada de la consulta:

```
export default function App() {const [query, setQuery] = useState('');const deferredQuery = useDeferredValue(query);return (<><label>        Buscar álbumes:<input value={query} onChange={e => setQuery(e.target.value)} /></label><Suspense fallback={<h2>Loading...</h2>}><SearchResults query={deferredQuery} /></Suspense></>);}
```

La consulta `query` se actualizará inmediatamente, por lo que el input mostrará el nuevo valor. Sin embargo, la consulta aplazada `deferredQuery` mostrará el valor anterior hasta que los datos se hayan cargado, por lo que `SearchResults` mostrará los resultados antiguos por un tiempo.

Para que le resulte más claro al usuario, puedes añadir un indicador visual cuando la lista de resultados antigua se esté mostrando:

```
<div style={{opacity: query !== deferredQuery ? 0.5 : 1 }}><SearchResults query={deferredQuery} /></div>
```

Escribe `"a"` en el ejemplo de abajo, espera por los resultados, y luego edita el input a `"ab"`. Fíjate cómo en lugar del _fallback_ de Suspense, verás ahora de forma ligeramente atenuada la lista de resultados antigua hasta que se carguen los nuevos resultados:

import { Suspense, useState, useDeferredValue } from 'react';
import SearchResults from './SearchResults.js';

export default function App() {
  const \[query, setQuery\] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <\>
      <label\>
        Buscar álbumes:
        <input value\={query} onChange\={e \=> setQuery(e.target.value)} />
      </label\>
      <Suspense fallback\={<h2\>Loading...</h2\>}\>
        <div style\={{ opacity: isStale ? 0.5 : 1 }}\>
          <SearchResults query\={deferredQuery} />
        </div\>
      </Suspense\>
    </\>
  );
}

### Nota

Tanto los valores aplazados como las [Transiciones](#preventing-already-revealed-content-from-hiding) te permiten evitar _fallbacks_ de Suspense y en su lugar usar indicadores en línea. Las Transiciones marcan todas la actualización como no urgente, por lo que se usan típicamente por frameworks y bibliotecas de enrutamiento para la navegación. Los valores aplazados, en cambio, son útiles sobre todo en código de aplicación en el que quieres marcar una parte de la UI como no urgente, traducido como que está permitido que _se quede por detrás_ del resto de la UI.

* * *

### Prevenir que el contenido ya revelado se esconda[](#preventing-already-revealed-content-from-hiding "Link for Prevenir que el contenido ya revelado se esconda ")

Cuando un componente se suspende, la barrera padre de Suspense más cercana cambia a mostrar el _fallback_. Esto puede conducir a una experiencia de usuario discordante si ya estaba mostrando algún contenido. Presiona el botón en el ejemplo de abajo:

import { Suspense, useState } from 'react';
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

  function navigate(url) {
    setPage(url);
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
    <Layout\>
      {content}
    </Layout\>
  );
}

function BigSpinner() {
  return <h2\>🌀 Loading...</h2\>;
}

Cuando presionaste el botón, el componente `Router` renderizó `ArtistPage` en lugar de `IndexPage`. Un componente dentro de `ArtistPage` se suspendió, por lo que la barrera de Suspense más cercana comenzó a mostrar un _fallback_ La barrera de Suspense más cercana estaba cerca de la raíz, por lo que todo el sitio quedó reemplazado por `BigSpinner`.

Para prevenir que esto pase, puedes marcar la actualización del estado de navegación como una _Transición_ con [`startTransition`:](https://es.react.dev/reference/react/startTransition)

```
function Router() {const [page, setPage] = useState('/');function navigate(url) {startTransition(() => {setPage(url);      });}// ...
```

Esto le dice a React que la transición de estado no es urgente y que es mejor seguir mostrando la página anterior en lugar de esconder contenido ya revelado. Nota como al hacer clic el botón ahora “espera” a que se carga `Biography`:

import { Suspense, startTransition, useState } from 'react';
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
    <Layout\>
      {content}
    </Layout\>
  );
}

function BigSpinner() {
  return <h2\>🌀 Loading...</h2\>;
}

Una Transición no espera por que cargue _todo_ el contenido. Espera lo suficiente para evitar esconder contenido ya revelado. Por ejemplo, la maquetación (definida por `Layout`) del sitio ya había sido revelada, por lo que estaría mal esconderla dentro de un indicador de carga. Sin embargo, la barrera de `Suspense` anidada alrededor de `Albums` es nueva, por lo que la Transición no espera por ella.

### Nota

Los enrutadores preparados para Suspense deberían envolver por defecto las actualizaciones de navegación dentro de Transiciones.

* * *

### Indicar que está ocurriendo una Transición[](#indicating-that-a-transition-is-happening "Link for Indicar que está ocurriendo una Transición ")

En el ejemplo de arriba, una vez que haces clic al botón, no hay un indicador visual de que hay una navegación en proceso. Para añadir un indicador, puedes reemplazar [`startTransition`](https://es.react.dev/reference/react/startTransition) con [`useTransition`](https://es.react.dev/reference/react/useTransition) que te da un valor booleano `isPending` (que indica si la transición está pendiente). En el ejemplo de abajo, se usa para cambiar el estilo del encabezado del sitio mientras ocurre la Transición:

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

* * *

### Reiniciar las barreras de Suspense al navegar[](#resetting-suspense-boundaries-on-navigation "Link for Reiniciar las barreras de Suspense al navegar ")

Durante una Transición, React evitará esconder el contenido que ya ha sido revelado. Sin embargo, si navegas a una ruta con distintos parámetros, querrías decirle a React que es un contenido _diferente_. Puedes expresar esto con una `key`:

```
<ProfilePage key={queryParams.id} />
```

Imagina que estás navegando dentro de la página del perfil de un usuario, y algo se suspende. Si esa actualización se envuelve en una Transición no activará el _fallback_ para el contenido ya visible. Ese es el comportamiento esperado.

Sin embargo, imagina ahora que estás navegando entre dos perfiles de usuario distintos. En ese caso, tiene sentido mostrar el _fallback_. Por ejemplo, la línea de tiempo de un usuario es un _contenido diferente_ a la línea de tiempo de otro usuario. Al especificar una `key`, te aseguras de que React trate distintos perfiles de usuario como componentes diferente y reinicie las barreras de Suspense durante la navegación. Un framework de enrutamiento integrado con Suspense debería hacerlo automáticamente.

* * *

### Proporcionar un _fallback_ para errores de servidor y contenido solo-cliente[](#providing-a-fallback-for-server-errors-and-client-only-content "Link for this heading")

Si utilizas una de las [APIs de renderizado en el servidor con _streaming_](https://es.react.dev/reference/react-dom/server) (o un _framework_ que depende de ellas), React también utilizará tus barreras de `<Suspense>` para manejar errores en el servidor. Si un componente lanza un error en el servidor, React no abortará el renderizado en el servidor. Lo que hará será encontrar el componente `<Suspense>` más cercano encima de este e incluirá su _fallback_ (un _spinner_, por ejemplo) dentro del HTML generado en el servidor. El usuario verá un _spinner_ en lugar de un error.

En el cliente, React intentará renderizar el mismo componente nuevamente. Si ocurre un error también en el cliente, React lanzará el error y mostrará la [barrera de error](https://es.react.dev/reference/react/Component#static-getderivedstatefromerror) más cercana. Sin embargo, si no ocurre un error en el cliente, React no le mostrará el error al usuario dado que el contenido eventualmente se le mostró al usuario satisfactoriamente.

Puedes usar esto para evitar que algunos componentes se rendericen en el servidor. Para lograrlo, lanza un error desde ellos en el entorno del servidor y envuélvelos en una barrera de `<Suspense>` para reemplazar su HTML con _fallbacks_:

```
<Suspense fallback={<Loading />}><Chat /></Suspense>function Chat() {if (typeof window === 'undefined') {throw Error('Chat should only render on the client.');}// ...}
```

El HTML del servidor incluirá el indicador de carga. Este será reemplazado por el componente `Chat` en el cliente.

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### ¿Cómo puedo evitar que la interfaz de usuario sea sustituida por un _fallback_ durante una actualización?[](#preventing-unwanted-fallbacks "Link for this heading")

Reemplazar la interfaz de usuario visible por una de reserva crea una experiencia de usuario discordante. Esto puede ocurrir cuando una actualización hace que un componente se suspenda, y la barrera de Suspense más cercana ya está mostrando contenido al usuario.

Para evitar que esto ocurra, [marca la actualización como no urgente utilizando `startTransition`](#preventing-already-revealed-content-from-hiding). Durante una Transición, React esperará hasta que se hayan cargado suficientes datos para evitar que aparezca un _fallback_ no deseado:

```
function handleNextPageClick() {// If this update suspends, don't hide the already displayed contentstartTransition(() => {setCurrentPage(currentPage + 1);});}
```

Esto evitará ocultar el contenido existente. Sin embargo, cualquier barrera `Suspense` recién renderizada seguirá mostrando inmediatamente los _fallbacks_ para evitar el bloqueo de la UI y dejar que el usuario vea el contenido a medida que esté disponible.

**React sólo evitará los “fallbacks” no deseados durante las actualizaciones no urgentes**. No retrasará un renderizado si es el resultado de una actualización urgente. Debes indicarlo con una API como [`startTransition`](https://es.react.dev/reference/react/startTransition) o [`useDeferredValue`](https://es.react.dev/reference/react/useDeferredValue).

Si tu router está integrado con Suspense, debería envolver sus actualizaciones en [`startTransition`](https://es.react.dev/reference/react/startTransition) automáticamente.
