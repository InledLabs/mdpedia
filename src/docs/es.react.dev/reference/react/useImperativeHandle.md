---
title: useImperativeHandle – React
source: https://es.react.dev/reference/react/useImperativeHandle
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useImperativeHandle – React

`useImperativeHandle` es un Hook de React que te permite personalizar el identificador expuesto como una [ref.](https://es.react.dev/learn/manipulating-the-dom-with-refs)

```
useImperativeHandle(ref, createHandle, dependencies?)
```

*   [Referencia](#reference)
    *   [`useImperativeHandle(ref, createHandle, dependencies?)`](#useimperativehandle)
*   [Uso](#usage)
    *   [Exponer un identificador ref personalizado al componente padre](#exposing-a-custom-ref-handle-to-the-parent-component)
    *   [Exponer tus propios métodos imperativos](#exposing-your-own-imperative-methods)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useImperativeHandle(ref, createHandle, dependencies?)`[](#useimperativehandle "Link for this heading")

Llama a `useImperativeHandle` en el nivel superior de tu componente para personalizar el identificador ref que se expone:

```
import { useImperativeHandle } from 'react';function MyInput({ ref }) {useImperativeHandle(ref, () => {return {// ... tus métodos ...};}, []);// ...
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `ref`: La `ref` que recibiste como prop del componente `MyInput`.
    
*   `createHandle`: Una función que no toma argumentos y devuelve el identificador ref que quieres exponer. El identificador ref que devuelve puede tener cualquier tipo. Por lo general, devolverá un objeto con lo métodos que quieres exponer.
    
*   **opcional** `dependencies`: La lista de todos los valores reactivos a los que se hace referencia dentro del código de `createHandle`. Los valores reactivos incluye props, estados, y todas las variables y funciones declaradas directamente dentro del cuerpo de tu componente. Si tu linter es [configurado por React](https://es.react.dev/learn/editor-setup#linting), va a verificar que cada valor reactivo esté correctamente especificado como una dependencia. La lista de dependencias deben tener un número constante de elementos y ser escritos en una sola linea como `[dep1, dep2, dep3]`. React comparará cada dependencia con su valor anterior usando el algoritmo de comparación [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is). Si un nuevo renderizado resultara en un cambio a una dependencia, o si no especificaste las dependencias completamente, tu función `createHandle` se volverá a ejecutar, y el nuevo identificador recién creado será asignado a ref.
    

#### Devuelve[](#returns "Link for Devuelve ")

`useImperativeHandle` devuelve `undefined`.

* * *

## Uso[](#usage "Link for Uso ")

### Exponer un identificador ref personalizado al componente padre[](#exposing-a-custom-ref-handle-to-the-parent-component "Link for Exponer un identificador ref personalizado al componente padre ")

Para exponer un nodo DOM al elemento padre, pasa la prop `ref` al nodo.

```
function MyInput({ ref }) {return <input ref={ref} />;};
```

Con el código de arriba, [una ref a `MyInput` va a recibir el nodo DOM de `<input>`.](https://es.react.dev/learn/manipulating-the-dom-with-refs) Aun así, puedes exponer un valor personalizado en su lugar. Para personalizar el identificador expuesto, llama a `useImperativeHandle` en el nivel superior de tu componente:

```
import { useImperativeHandle } from 'react';function MyInput({ ref }) {useImperativeHandle(ref, () => {return {// ... tus métodos ...};}, []);return <input />;};
```

Ten en cuenta que en el código de arriba, la `ref` ya no se pasa al `<input>`.

Por ejemplo, supongamos que no quieres exponer el nodo DOM entero de `<input>`, pero quieres exponer dos de sus métodos: `focus` y `scrollIntoView`. Para hacer esto, mantén el DOM real del navegador en una ref separada. Entonces usa `useImperativeHandle` para exponer un identificador solamente con los métodos que quieres que el componente padre llame:

```
import { useRef, useImperativeHandle } from 'react';function MyInput({ ref }) {const inputRef = useRef(null);useImperativeHandle(ref, () => {return {focus() {inputRef.current.focus();},scrollIntoView() {inputRef.current.scrollIntoView();},};}, []);return <input ref={inputRef} />;};
```

Ahora, si el componente padre obtiene una ref a `MyInput`, podrá llamar a los métodos `focus` y `scrollIntoView` en él. Sin embargo, no va a tener acceso completo al nodo DOM de `<input>` de manera más profunda.

* * *

### Exponer tus propios métodos imperativos[](#exposing-your-own-imperative-methods "Link for Exponer tus propios métodos imperativos ")

Los métodos que expones a través de un identificador imperativo no tienen que coincidir exactamente a los métodos del DOM. Por ejemplo, el componente `Post` en el ejemplo de abajo expone a `scrollAndFocusAddComment` por medio de un identificador imperativo. Esto le permite a la `Página` padre desplazar la lista de comentarios _y_ enfocar el campo de entrada cuando haces click al botón.

### Atención

**No sobreutilizar las refs.** Solo debes usar las refs para comportamientos _imperativos_ que no puedes expresar como props: por ejemplo desplazarse a un nodo, enfocar un nodo, activar una animación, seleccionar texto, etc.

**Si puedes expresar algo como una prop, no deberias usar una ref.** Por ejemplo, en vez de exponer un identificador imperativo como `{ open, close }` del componente `Modal`, es mejor tomar `isOpen` como una prop, algo como `<Modal isOpen={isOpen} />`. [Efectos](https://es.react.dev/learn/synchronizing-with-effects) puede ayudarte a exponer comportamientos imperativos via props.
