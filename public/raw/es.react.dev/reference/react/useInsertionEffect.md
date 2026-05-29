---
title: useInsertionEffect – React
source: https://es.react.dev/reference/react/useInsertionEffect
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useInsertionEffect – React

### Atención

`useInsertionEffect` es para autores de bibliotecas CSS-en-JS. A menos que estés trabajando en una biblioteca CSS-en-JS y necesites un lugar donde inyectar los estilos, probablemente busques [`useEffect`](https://es.react.dev/reference/react/useEffect) o [`useLayoutEffect`](https://es.react.dev/reference/react/useLayoutEffect) en su lugar.

`useInsertionEffect` permite insertar elementos en el DOM antes de que se dispare cualquier Efecto de diseño (_layout_).

```
useInsertionEffect(setup, dependencies?)
```

*   [Referencia](#reference)
    *   [`useInsertionEffect(setup, dependencies?)`](#useinsertioneffect)
*   [Uso](#usage)
    *   [Inyección de estilos dinámicos desde bibliotecas de CSS-en-JS](#injecting-dynamic-styles-from-css-in-js-libraries)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useInsertionEffect(setup, dependencies?)`[](#useinsertioneffect "Link for this heading")

Llama a `useInsertionEffect` para insertar estilos antes de que se dispare cualquier Efecto que pueda necesitar leer el diseño:

```
import { useInsertionEffect } from 'react';// Dentro de tu biblioteca CSS-en-JSfunction useCSS(rule) {useInsertionEffect(() => {// ... inyecta las etiquetas <style> aquí ...});return rule;}
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `setup`: La función con la lógica de tus Efectos. Tu función _setup_ también puede devolver opcionalmente una función de _limpieza_. Cuando tu componente es añadido al DOM, pero antes de que se dispare cualquier Efecto de diseño, React ejecutará tu función _setup_. Después de cada re-renderizado con dependencias modificadas, React ejecutará primero la función de limpieza (si la has proporcionado) con los valores antiguos, y luego ejecutará tu función _setup_ con los nuevos valores. Cuando tu componente es removido del DOM, React ejecutará tu función de limpieza.
    
*   \***opcional** `dependencias`: La lista de todos los valores reactivos referenciados dentro del el código de `setup`. Los valores reactivos incluyen props, estado y todas las variables y funciones declaradas directamente dentro del cuerpo de tu componente. Si tu linter está [configurado para React](https://es.react.dev/learn/editor-setup#linting), verificará que cada valor reactivo esté correctamente especificado como dependencia. La lista de dependencias tienen que tener un número constante de elementos y que sean escritos en línea como `[dep1, dep2, dep3]`. React comparará cada dependencia con su valor previo usando el algoritmo de comparación [`Object.is`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/is). Si no especificas ninguna dependencia, tu Efecto se volverá a ejecutar después de cada renderizado del componente.
    

#### Devuelve[](#returns "Link for Devuelve ")

`useInsertionEffect` devuelve `undefined`.

#### Advertencias[](#caveats "Link for Advertencias ")

*   Los Efectos sólo se ejecutan en el cliente. No se ejecutan durante el renderizado del servidor.
*   No puedes actualizar el estado desde dentro de `useInsertionEffect`.
*   En el momento en que se ejecuta `useInsertionEffect`, las referencias aún no se han adjuntado.
*   `useInsertionEffect` puede ejecutarse antes o después de que el DOM haya sido actualizado. No debes confiar en que el DOM se actualice en un momento determinado.
*   A diferencia de otros tipos de Efectos, que disparan la limpieza por cada Efecto y luego el _setup_ por cada Efecto, `useInsertionEffect` disparará ambos, limpieza y _setup_, un componente a la vez. El resultado es un “intercalado” de funciones de limpieza y _setup_.

* * *

## Uso[](#usage "Link for Uso ")

### Inyección de estilos dinámicos desde bibliotecas de CSS-en-JS[](#injecting-dynamic-styles-from-css-in-js-libraries "Link for Inyección de estilos dinámicos desde bibliotecas de CSS-en-JS ")

Tradicionalmente, añadirías estilo a los componentes de React usando CSS plano.

```
// En tu archivo JS:<button className="success" />// En tu archivo CSS:.success { color: green; }
```

Algunos equipos prefieren incluir sus estilos directamente en el código JavaScript en lugar de escribir archivos CSS. Esto normalmente requiere usar una biblioteca CSS-en-JS o una herramienta. Existen tres formas comunes de plantear el CSS-en-JS:

1.  Extracción estática de archivos CSS con un compilador
2.  Estilos en línea, ej. `<div style={{ opacity: 1 }}>`
3.  Inyección durante el runtime de las etiquetas `<style>`

Si usas CSS-en-JS, recomendamos la combinación de los dos primeros enfoques (archivos CSS para estilos estáticos, estilos en línea para estilos dinámicos). **No recomendamos la inyección durante el runtime de la etiqueta `<style>` por dos razones:**

1.  La inyección durante el runtime fuerza al navegador a recalcular los estilos mucho más a menudo.
2.  La inyección durante el runtime puede ser muy lenta si ocurre en un tiempo inadecuado en el ciclo de vida de React.

El primer problema no se puede resolver, pero `useInsertionEffect` te ayuda a solucionar el segundo problema.

Llama a `useInsertionEffect` para insertar los estilos antes de que se disparen los Efectos de diseño:

```
// En tu biblioteca CSS-en-JSlet isInserted = new Set();function useCSS(rule) {useInsertionEffect(() => {// Como hemos explicado antes, no recomendamos la inyección durante el runtime de las etiquetas <style>.// Pero si tienes que hacerlo, entonces es importante que sea dentro del useInsertionEffect.if (!isInserted.has(rule)) {isInserted.add(rule);document.head.appendChild(getStyleForRule(rule));}});return rule;}function Button() {const className = useCSS('...');return <div className={className} />;}
```

De forma similar a `useEffect`, `useInsertionEffect` no se ejecuta en el servidor. Si tienes que agrupar las reglas CSS has usado en el servidor, puedes hacerlo durante el renderizado:

```
let collectedRulesSet = new Set();function useCSS(rule) {if (typeof window === 'undefined') {collectedRulesSet.add(rule);}useInsertionEffect(() => {// ...});return rule;}
```

[Lee más sobre actualizar bibliotecas CSS-en-JS con la inyección en runtime `useInsertionEffect`.](https://github.com/reactwg/react-18/discussions/110)

##### Profundizar

#### ¿Cómo puede ser esto mejor que inyectar estilos durante el renderizado o useLayoutEffect?[](#how-is-this-better-than-injecting-styles-during-rendering-or-uselayouteffect "Link for ¿Cómo puede ser esto mejor que inyectar estilos durante el renderizado o useLayoutEffect? ")

Si insertas los estilos durante el renderizado y React está procesando una [actualización no bloqueante,](https://es.react.dev/reference/react/useTransition#marking-a-state-update-as-a-non-blocking-transition) el navegador recalculará los estilos en cada frame mientras renderiza un árbol de componentes, lo que puede ser **extremadamente lento.**

`useInsertionEffect` es mejor que insertar estilos durante [`useLayoutEffect`](https://es.react.dev/reference/react/useLayoutEffect) o [`useEffect`](https://es.react.dev/reference/react/useEffect) porque asegura que en el tiempo en que otros Efectos se ejecuten en tus componentes, las etiquetas `<style>` ya han sido añadidas. De otro modo, los cálculos de layout en Efectos regulares podrían ser incorrectos por los estilos desactualizados.
