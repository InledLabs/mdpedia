---
title: useRef – React
source: https://es.react.dev/reference/react/useRef
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useRef – React

`useRef` es un Hook de React que te permite referenciar un valor que no es necesario para el renderizado.

```
const ref = useRef(initialValue)
```

*   [Referencia](#reference)
    *   [`useRef(initialValue)`](#useref)
*   [Uso](#usage)
    *   [Referenciar un valor con una ref](#referencing-a-value-with-a-ref)
    *   [Manipulación del DOM con una ref](#manipulating-the-dom-with-a-ref)
    *   [Evitar la recreación del contenido de las refs](#avoiding-recreating-the-ref-contents)
*   [Solución de problemas](#troubleshooting)
    *   [No puedo obtener una ref a un componente personalizado](#i-cant-get-a-ref-to-a-custom-component)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useRef(initialValue)`[](#useref "Link for this heading")

Llama a `useRef` en el nivel superior de tu componente para declarar una [ref.](https://es.react.dev/learn/referencing-values-with-refs)

```
import { useRef } from 'react';function MyComponent() {const intervalRef = useRef(0);const inputRef = useRef(null);// ...
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `initialValue`: El valor que quieres que tenga inicialmente la propiedad `current` del objeto ref. Puede ser un valor de cualquier tipo. Este argumento se ignora después del renderizado inicial.

#### Devuelve[](#returns "Link for Devuelve ")

`useRef` devuelve un objeto con una sola propiedad:

*   `current`: Inicialmente, se establece en el `initialValue` que has pasado. Más tarde puedes establecerlo a otra cosa. Si pasas el objeto ref a React como un atributo `ref` a un nodo JSX, React establecerá su propiedad `current`.

En los siguientes renderizados, `useRef` devolverá el mismo objeto.

#### Advertencias[](#caveats "Link for Advertencias ")

*   Puedes mutar la propiedad `ref.current`. A diferencia del estado, es mutable. Sin embargo, si contiene un objeto que se utiliza para el renderizado (por ejemplo, una parte de tu estado), entonces no deberías mutar ese objeto.
*   Cuando cambias la propiedad `ref.current`, React no vuelve a renderizar tu componente. React no está al tanto de cuándo la cambias porque una ref es un objeto JavaScript plano.
*   No escribas _ni leas_ `ref.current` durante el renderizado, excepto para la [inicialización.](#avoiding-recreating-the-ref-contents) Esto hace que el comportamiento de tu componente sea impredecible.
*   En el modo estricto, React **llamará a la función de tu componente dos veces** para [ayudarte a encontrar impurezas accidentales.](https://es.react.dev/reference/react/useState#my-initializer-or-updater-function-runs-twice) Este es un comportamiento solo de desarrollo y no afecta en producción. Esto significa que cada objeto ref se creará dos veces, y una de las versiones se descartará. Si la función de tu componente es pura (como debería ser), no debería afectar a la lógica de tu componente.

* * *

## Uso[](#usage "Link for Uso ")

### Referenciar un valor con una ref[](#referencing-a-value-with-a-ref "Link for Referenciar un valor con una ref ")

Llama a `useRef` en el nivel superior de tu componente para declarar una o más [refs.](https://es.react.dev/learn/referencing-values-with-refs)

```
import { useRef } from 'react';function Stopwatch() {const intervalRef = useRef(0);// ...
```

`useRef` devuelve un objeto ref con una sola propiedad `current` establecida inicialmente con el valor inicial que proporcionaste.

En los siguientes renderizados, `useRef` devolverá el mismo objeto. Puedes cambiar su propiedad `current` para almacenar información y leerla más tarde. Esto puede recordarte al [estado](https://es.react.dev/reference/react/useState), pero hay una diferencia importante.

**El cambio de una ref no provoca un nuevo renderizado.** Esto significa que las refs son perfectas para almacenar información que no afecta a la salida visual de tu componente. Por ejemplo, si necesita almacenar un [ID de intervalo](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) y recuperarlo más tarde, puedes ponerlo en una ref. Para actualizar el valor dentro de la ref, es necesario cambiar manualmente supropiedad `current`:

```
function handleStartClick() {const intervalId = setInterval(() => {// ...}, 1000);intervalRef.current = intervalId;}
```

Más tarde, puedes leer el ID de ese intervalo desde la ref para poder [limpiar ese intervalo](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval):

```
function handleStopClick() {const intervalId = intervalRef.current;clearInterval(intervalId);}
```

Al utilizar una ref, te aseguras de que:

*   Puedes **almacenar información** entre renderizados (a diferencia de las variables regulares, que se reinician en cada renderizado).
*   Si se cambia **no se desencadena un renderizado** (a diferencia de las variables de estado, que desencadenan un renderizado).
*   La **información es local** para cada copia de tu componente (a diferencia de las variables externas, que son compartidas).

El cambio de una ref no desencadena un renderizado, por lo que las refs no son apropiadas para almacenar información que se quiere mostrar en la pantalla. Utiliza el estado para eso. Lee más sobre [elegir entre `useRef` y `useState`.](https://es.react.dev/learn/referencing-values-with-refs#differences-between-refs-and-state)

#### 

Ejemplo

1

de

2:

Contador de clics[](#click-counter "Link for this heading")

Este componente utiliza una ref para llevar la cuenta de las veces que hiciste clic en el botón. Ten en cuenta que está bien usar una ref en lugar de un estado aquí porque el recuento de clics sólo se lee y se escribe en un controlador de evento.

import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('¡Hiciste clic ' + ref.current + ' veces!');
  }

  return (
    <button onClick\={handleClick}\>
      ¡Hazme clic!
    </button\>
  );
}

Si muestras `{ref.current}` en el JSX, el número no se actualizará al hacer clic. Esto se debe a que el establecimiento de `ref.current` no desencadena un renderizado. La información que se utiliza para el renderizado debe ser estado.

### Atención

**No escribas _ni leas_ `ref.current` durante el renderizado.**

React espera que el cuerpo de tu componente [se comporte como una función pura](https://es.react.dev/learn/keeping-components-pure):

*   Si las entradas ([props](https://es.react.dev/learn/passing-props-to-a-component), [estado](https://es.react.dev/learn/state-a-components-memory), y [contexto](https://es.react.dev/learn/passing-data-deeply-with-context)) son iguales, debería devolver exactamente el mismo JSX.
*   Llamarla en un orden diferente o con argumentos diferentes no debería afectar a los resultados de otras llamadas.

Leer o escribir una ref **durante el renderizado** rompe estas expectativas.

```
function MyComponent() {// ...// 🚩 No escribas una ref durante el renderizadomyRef.current = 123;// ...// 🚩 No leas una ref durante el renderizadoreturn <h1>{myOtherRef.current}</h1>;}
```

Puedes, en su lugar, leer o escribir refs **desde controladores de eventos o efectos**.

```
function MyComponent() {// ...useEffect(() => {// ✅ Se pueden leer o escribir refs en efectosmyRef.current = 123;});// ...function handleClick() {// ✅ Puedes leer o escribir refs en los controladores de eventosdoSomething(myOtherRef.current);}// ...}
```

Si _tienes_ que leer [o escribir](https://es.react.dev/reference/react/useState#storing-information-from-previous-renders) algo durante el renderizado, [utiliza el estado](https://es.react.dev/reference/react/useState) en su lugar.

Si rompes estas reglas, tu componente puede seguir funcionando, pero la mayoría de las nuevas características que estamos añadiendo a React se basarán en estas expectativas. Lee más sobre [mantener tus componentes puros.](https://es.react.dev/learn/keeping-components-pure#where-you-_can_-cause-side-effects)

* * *

### Manipulación del DOM con una ref[](#manipulating-the-dom-with-a-ref "Link for Manipulación del DOM con una ref ")

Es particularmente común utilizar una ref para manipular el [DOM.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API) React tiene soporte incorporado para esto.

En primer lugar, declara una objeto ref con un valor inicial de `null`:

```
import { useRef } from 'react';function MyComponent() {const inputRef = useRef(null);// ...
```

Luego pasa tu objeto ref como el atributo `ref` al JSX del nodo DOM que quieres manipular:

```
// ...return <input ref={inputRef} />;
```

Después de que React cree el nodo DOM y lo ponga en la pantalla, React establecerá la propiedad `current` de tu objeto ref a ese nodo DOM. Ahora puedes acceder al nodo DOM de `<input>` y llamar a métodos como [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus):

```
function handleClick() {inputRef.current.focus();}
```

React establecerá la propiedad `current` a `null` cuando el nodo sea eliminado de la pantalla.

Lee más sobre la [manipulación del DOM con refs.](https://es.react.dev/learn/manipulating-the-dom-with-refs)

#### 

Ejemplo

1

de

4:

Enfocar una entrada de texto[](#focusing-a-text-input "Link for this heading")

En este ejemplo, al hacer clic en el botón se hará foco en la entrada de texto o _input_:

import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <\>
      <input ref\={inputRef} />
      <button onClick\={handleClick}\>
        Focus the input
      </button\>
    </\>
  );
}

* * *

### Evitar la recreación del contenido de las refs[](#avoiding-recreating-the-ref-contents "Link for Evitar la recreación del contenido de las refs ")

React guarda el valor inicial de la ref una vez y lo ignora en los siguientes renderizados.

```
function Video() {const playerRef = useRef(new VideoPlayer());// ...
```

Aunque el resultado de `new VideoPlayer()` sólo se utiliza para el renderizado inicial, todavía estás llamando a esta función en cada renderizado. Esto puede ser un desperdicio si está creando objetos costosos.

Para solucionarlo, puedes inicializar la ref de esta manera:

```
function Video() {const playerRef = useRef(null);if (playerRef.current === null) {playerRef.current = new VideoPlayer();}// ...
```

Normalmente, no se permite escribir o leer `ref.current` durante el renderizado. Sin embargo, está bien en este caso porque el resultado es siempre el mismo, y la condición sólo se ejecuta durante la inicialización por lo que es totalmente predecible.

##### Profundizar

#### ¿Cómo evitar la comprobación de nulos al inicializar useRef posteriormente?[](#how-to-avoid-null-checks-when-initializing-use-ref-later "Link for ¿Cómo evitar la comprobación de nulos al inicializar useRef posteriormente? ")

Si utilizas un comprobador de tipos y no quieres comprobar siempre la existencia de `null`, puedes probar con un patrón como éste:

```
function Video() {const playerRef = useRef(null);function getPlayer() {if (playerRef.current !== null) {return playerRef.current;}const player = new VideoPlayer();playerRef.current = player;return player;}// ...
```

Aquí, el propio `playerRef` puede ser `null`. Sin embargo, deberías ser capaz de convencer a tu comprobador de tipos de que no hay ningún caso en el que `getPlayer()` devuelva `null`. Luego usa `getPlayer()` en tus controladores de eventos.

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### No puedo obtener una ref a un componente personalizado[](#i-cant-get-a-ref-to-a-custom-component "Link for No puedo obtener una ref a un componente personalizado ")

Si intentas pasar una `ref` a tu propio componente de esta manera

```
const inputRef = useRef(null);return <MyInput ref={inputRef} />;
```

Es posible que aparezca un error en la consola:

Console

TypeError: Cannot read properties of null

Por defecto, tus propios componentes no exponen refs a los nodos del DOM que hay dentro de ellos.

Para solucionarlo, busca el componente del que quieres obtener una ref:

```
export default function MyInput({ value, onChange }) {return (<inputvalue={value}onChange={onChange}/>);}
```

Y luego añade `ref` a la lista de props que acepta tu componente y pasa `ref` como una prop al [componente integrado](https://es.react.dev/reference/react-dom/components/common) hijo que corresponda de esta forma:

```
function MyInput({ value, onChange, ref }) {return (<inputvalue={value}onChange={onChange}ref={ref}/>);};export default MyInput;
```

Luego el componente padre puede obtener una ref a él.

Más información sobre [el acceso a los nodos DOM de otro componente.](https://es.react.dev/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes)
