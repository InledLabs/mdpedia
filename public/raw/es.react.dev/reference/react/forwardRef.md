---
title: forwardRef – React
source: https://es.react.dev/reference/react/forwardRef
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# forwardRef – React

### Obsoleta

In React 19, `forwardRef` is no longer necessary. Pass `ref` as a prop instead.

`forwardRef` will deprecated in a future release. Learn more [here](https://es.react.dev/blog/2024/04/25/react-19#ref-as-a-prop).

`forwardRef` le permite a tu componente exponer un nodo DOM al componente padre con una [ref.](https://es.react.dev/learn/manipulating-the-dom-with-refs)

```
const SomeComponent = forwardRef(render)
```

*   [Referencia](#reference)
    *   [`forwardRef(render)`](#forwardref)
    *   [Función `render`](#render-function)
*   [Uso](#usage)
    *   [Exponer un nodo DOM al componente padre](#exposing-a-dom-node-to-the-parent-component)
    *   [Pasar una ref a través de múltiples componentes](#forwarding-a-ref-through-multiple-components)
    *   [Exposición de un manejador imperativo en lugar de un nodo DOM](#exposing-an-imperative-handle-instead-of-a-dom-node)
*   [Solución de problemas](#troubleshooting)
    *   [Mi componente está envuelto en `forwardRef`, pero la `ref` a él es siempre `null`.](#my-component-is-wrapped-in-forwardref-but-the-ref-to-it-is-always-null)

* * *

## Referencia[](#reference "Link for Referencia ")

### `forwardRef(render)`[](#forwardref "Link for this heading")

Llama a `forwardRef()` para que tu componente reciba un ref y la reenvíe a un componente hijo:

```
import { forwardRef } from 'react';const MyInput = forwardRef(function MyInput(props, ref) {// ...});
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `render`: La función de renderización de tu componente. React llama a esta función con las props y `ref` que tu componente recibió de su padre. El JSX que devuelve será la salida de tu componente.

#### Devuelve[](#returns "Link for Devuelve ")

`forwardRef` devuelve un componente de React que puedes renderizar en JSX. A diferencia de los componentes de React definidos como funciones simples, un componente devuelto por `forwardRef` también puede recibir una prop `ref`.

#### Advertencias[](#caveats "Link for Advertencias ")

*   En el modo estricto, React **llamará a tu función de renderizado dos veces** para [ayudarte a encontrar impurezas accidentales.](https://es.react.dev/reference/react/useState#my-initializer-or-updater-function-runs-twice) Este es un comportamiento sólo de desarrollo y no ocurre en producción. Si tu función de renderizado es pura (como debería ser), esto no debería afectar a la lógica de tu componente. El resultado de una de las llamadas será ignorado.

* * *

### Función `render`[](#render-function "Link for this heading")

`forwardRef` acepta una función de renderizado como argumento. React llama a esta función con `props` y `ref`:

```
const MyInput = forwardRef(function MyInput(props, ref) {return (<label>{props.label}<input ref={ref} /></label>);});
```

#### Parámetros[](#render-parameters "Link for Parámetros ")

*   `props`: Las props pasadas por el componente padre.
    
*   `ref`: El atributo `ref` pasado por el componente padre. La `ref` puede ser un objeto o una función. Si el componente padre no ha pasado un ref, será `null`. Deberás pasar la “ref” que recibas o bien a otro componente, o bien a [`useImperativeHandle`.](https://es.react.dev/reference/react/useImperativeHandle)
    

#### Devuelve[](#render-returns "Link for Devuelve ")

`forwardRef` devuelve un componente de React que puedes renderizar en JSX. A diferencia de los componentes de React definidos como funciones simples, el componente devuelto por `forwardRef` puede tomar una prop `ref`.

* * *

## Uso[](#usage "Link for Uso ")

### Exponer un nodo DOM al componente padre[](#exposing-a-dom-node-to-the-parent-component "Link for Exponer un nodo DOM al componente padre ")

Por defecto, los nodos DOM de cada componente son privados. Sin embargo, a veces es útil exponer un nodo DOM al padre, por ejemplo, para permitir enfocarlo. Para permitirlo, envuelve la definición de tu componente con `forwardRef()`:

```
import { forwardRef } from 'react';const MyInput = forwardRef(function MyInput(props, ref) {const { label, ...otherProps } = props;return (<label>{label}<input {...otherProps} /></label>);});
```

Recibirás una ref como segundo argumento después de props. Pásala al nodo DOM que quieras exponer:

```
import { forwardRef } from 'react';const MyInput = forwardRef(function MyInput(props, ref) {const { label, ...otherProps } = props;return (<label>{label}<input {...otherProps} ref={ref} /></label>);});
```

Esto permite al componente padre `Form` acceder al `<input>` nodo DOM expuesto por `MyInput`:

```
function Form() {const ref = useRef(null);function handleClick() {ref.current.focus();}return (<form><MyInput label="Enter your name:" ref={ref} /><button type="button" onClick={handleClick}>        Editar</button></form>);}
```

Este componente `Form` [pasa una ref](https://es.react.dev/reference/react/useRef#manipulating-the-dom-with-a-ref) a `MyInput`. El componente `MyInput` _pasa_ esa ref a la etiqueta `<input>` del navegador. Como resultado, el componente `Form` puede acceder a ese nodo DOM `<input>` y llamar a [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) en él.

Ten en cuenta que al exponer una ref al nodo DOM dentro de tu componente, estás dificultando la posibilidad de cambiar el interior de tu componente más adelante. Por lo general, expondrás los nodos DOM de los componentes reutilizables de bajo nivel como los botones o las entradas de texto, pero no lo harás para los componentes de nivel de aplicación como un avatar o un comentario.

#### 

Ejemplo

1

de

2:

Enfocar una entrada de texto[](#focusing-a-text-input "Link for this heading")

Al hacer clic en el botón el campo de texto (_input_) tomará el foco. El componente `Form` define una ref y la pasa al componente `MyInput`. El componente `MyInput` la reenvía al elemento nativo `<input>`. Esto permite que el componente `Form` enfoque el `<input>`.

import { useRef } from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form\>
      <MyInput label\="Enter your name:" ref\={ref} />
      <button type\="button" onClick\={handleClick}\>
        Editar
      </button\>
    </form\>
  );
}

* * *

### Pasar una ref a través de múltiples componentes[](#forwarding-a-ref-through-multiple-components "Link for Pasar una ref a través de múltiples componentes ")

En lugar de pasar una `ref` a un nodo DOM, puedes pasarla a un componente propio como `MyInput`.:

```
const FormField = forwardRef(function FormField(props, ref) {// ...return (<><MyInput ref={ref} />      ...</>);});
```

Si ese componente `MyInput` pasa una ref a su `<input>`, una ref a `FormField` te dará ese `<input>`:

```
function Form() {const ref = useRef(null);function handleClick() {ref.current.focus();}return (<form><FormField label="Enter your name:" ref={ref} isRequired={true} /><button type="button" onClick={handleClick}>        Editar</button></form>);}
```

El componente `Form` del formulario define una ref y la pasa a `FormField`. El componente `FormField` pasa esa ref a `MyInput`, que a su vez la pasa a un nodo DOM `<input>`. Así es como `Form` accede a ese nodo DOM.

import { useRef } from 'react';
import FormField from './FormField.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form\>
      <FormField label\="Enter your name:" ref\={ref} isRequired\={true} />
      <button type\="button" onClick\={handleClick}\>
        Editar
      </button\>
    </form\>
  );
}

* * *

### Exposición de un manejador imperativo en lugar de un nodo DOM[](#exposing-an-imperative-handle-instead-of-a-dom-node "Link for Exposición de un manejador imperativo en lugar de un nodo DOM ")

En lugar de exponer un nodo DOM completo, puedes exponer un objeto personalizado, llamado manejador imperativo (_imperative handle_), con un conjunto de métodos más restringido. Para hacer esto, tendrías que definir una ref separada para guardar el nodo DOM:

```
const MyInput = forwardRef(function MyInput(props, ref) {const inputRef = useRef(null);// ...return <input {...props} ref={inputRef} />;});
```

A continuación, pasa la `ref` que has recibido a [`useImperativeHandle`](https://es.react.dev/reference/react/useImperativeHandle) y especifica el valor que quieres exponer a la `ref`:

```
import { forwardRef, useRef, useImperativeHandle } from 'react';const MyInput = forwardRef(function MyInput(props, ref) {const inputRef = useRef(null);useImperativeHandle(ref, () => {return {focus() {inputRef.current.focus();},scrollIntoView() {inputRef.current.scrollIntoView();},};}, []);return <input {...props} ref={inputRef} />;});
```

Si algún componente obtiene ahora una ref a `MyInput`, sólo recibirá su objeto `{ focus, scrollIntoView }` en lugar del nodo DOM. Esto te permite limitar la información que expones sobre tu nodo DOM al mínimo.

import { useRef } from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
    
    
  }

  return (
    <form\>
      <MyInput placeholder\="Enter your name" ref\={ref} />
      <button type\="button" onClick\={handleClick}\>
        Editar
      </button\>
    </form\>
  );
}

[Más información sobre el uso de manejadores imperativos.](https://es.react.dev/reference/react/useImperativeHandle)

### Atención

**No abuses de las refs.** Sólo deberías usar refs para comportamientos _imperativos_ que no puedes expresar como props: por ejemplo, desplazarse a un nodo, enfocar un nodo, desencadenar una animación, seleccionar texto, etc.

**Si puedes expresar algo como una prop, no debes usar una ref.** Por ejemplo, en lugar de exponer un manejador imperativo como `{ open, close }` de un componente `Modal`, es mejor tomar `isOpen` como prop `<Modal isOpen={isOpen} />`. [Effects](https://es.react.dev/learn/synchronizing-with-effects) puede ayudarte a exponer comportamientos imperativos a través de props.

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### Mi componente está envuelto en `forwardRef`, pero la `ref` a él es siempre `null`.[](#my-component-is-wrapped-in-forwardref-but-the-ref-to-it-is-always-null "Link for this heading")

Esto suele significar que olvidaste utilizar la `ref` que recibiste.

Por ejemplo, este componente no hace nada con su `ref`:

```
const MyInput = forwardRef(function MyInput({ label }, ref) {return (<label>{label}<input /></label>);});
```

Para solucionarlo, pasa la `ref` a un nodo DOM o a otro componente que pueda aceptar una ref:

```
const MyInput = forwardRef(function MyInput({ label }, ref) {return (<label>{label}<input ref={ref} /></label>);});
```

La `ref` a `MyInput` también podría ser `null` si parte de la lógica es condicional:

```
const MyInput = forwardRef(function MyInput({ label, showInput }, ref) {return (<label>{label}{showInput && <input ref={ref} />}</label>);});
```

Si `showInput` es `false`, la ref no será reenviada a ningún nodo, y una ref a `MyInput` permanecerá vacía. Esto es particularmente fácil de pasar por alto si la condición está oculta dentro de otro componente, como `Panel` en este ejemplo:

```
const MyInput = forwardRef(function MyInput({ label, showInput }, ref) {return (<label>{label}<Panel isExpanded={showInput}><input ref={ref} /></Panel></label>);});
```
