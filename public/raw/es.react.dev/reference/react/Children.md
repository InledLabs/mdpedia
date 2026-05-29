---
title: Children – React
source: https://es.react.dev/reference/react/Children
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# Children – React

### Atención

El uso de `Children` es poco común y puede conducir a un código frágil. [Ver alternativas comunes.](#alternatives)

`Children` te permite manipular y transformar el JSX que recibes como la [prop `children`.](https://es.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)

```
const mappedChildren = Children.map(children, child =><div className="Row">{child}</div>);
```

*   [Referencia](#reference)
    *   [`Children.count(children)`](#children-count)
    *   [`Children.forEach(children, fn, thisArg?)`](#children-foreach)
    *   [`Children.map(children, fn, thisArg?)`](#children-map)
    *   [`Children.only(children)`](#children-only)
    *   [`Children.toArray(children)`](#children-toarray)
*   [Uso](#usage)
    *   [Transformar children](#transforming-children)
    *   [Ejecutar un código para cada hijo](#running-some-code-for-each-child)
    *   [Contar hijos](#counting-children)
    *   [Convertir children a un array](#converting-children-to-an-array)
*   [Alternativas](#alternatives)
    *   [Exponer varios componentes](#exposing-multiple-components)
    *   [Aceptar un _array_ de objetos como prop](#accepting-an-array-of-objects-as-a-prop)
    *   [Llamar a una prop de renderizado para adaptar el renderizado](#calling-a-render-prop-to-customize-rendering)
*   [Solución de problemas](#troubleshooting)
    *   [Paso un componente personalizado, pero los métodos de `Children` no muestran su resultado del renderizado](#i-pass-a-custom-component-but-the-children-methods-dont-show-its-render-result)

* * *

## Referencia[](#reference "Link for Referencia ")

### `Children.count(children)`[](#children-count "Link for this heading")

Llama `Children.count(children)` para contar el número de hijos en la estructura de datos `children`.

```
import { Children } from 'react';function RowList({ children }) {return (<><h1>Filas totales: {Children.count(children)}</h1>      ...</>);}
```

[Ver más ejemplos abajo.](#counting-children)

#### Parámetros[](#children-count-parameters "Link for Parámetros ")

*   `children`: el valor de la [prop `children`](https://es.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) que recibe tu componente.

#### Devuelve[](#children-count-returns "Link for Devuelve ")

El número de nodos dentro de estos hijos (`children`).

#### Advertencias[](#children-count-caveats "Link for Advertencias ")

*   Nodos vacíos (`null`, `undefined`, y booleanos), strings, números, y [elementos de React](https://es.react.dev/reference/react/createElement) cuentan como nodos individuales. Los _arrays_ no cuentan como nodos individuales, pero sus hijos sí. **El recorrido no va más profundo que al nivel de los elementos de React:** no se renderizan, y no se recorren sus hijos. Los [Fragmentos](https://es.react.dev/reference/react/Fragment) no se recorren.

* * *

### `Children.forEach(children, fn, thisArg?)`[](#children-foreach "Link for this heading")

Llama a `Children.forEach(children, fn, thisArg?)` para correr algún código por cada hijo en la estructura de datos `children`.

```
import { Children } from 'react';function SeparatorList({ children }) {const result = [];Children.forEach(children, (child, index) => {result.push(child);result.push(<hr key={index} />);});// ...
```

[Ver más ejemplos abajo.](#running-some-code-for-each-child)

#### Parámetros[](#children-foreach-parameters "Link for Parámetros ")

*   `children`: El valor de la [prop `children`](https://es.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) que recibe por tu componente.
*   `fn`: La función que deseas ejecutar para cada hijo, similar al callback del [método array `forEach`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach). Se llamará con el hijo como primer argumento y su índice como segundo argumento. El índice empieza en `0` y se incrementa por cada llamada.
*   **opcional** `thisArg`: El [valor `this`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/this) con el que se debe llamar a la función `fn`. Si se omite, es `undefined`.

#### Devuelve[](#children-foreach-returns "Link for Devuelve ")

`Children.forEach` devuelve `undefined`.

#### Advertencias[](#children-foreach-caveats "Link for Advertencias ")

*   Nodos vacíos (`null`, `undefined`, y booleanos), strings, números, y [elementos de React](https://es.react.dev/reference/react/createElement) cuentan como nodos individuales. Los _arrays_ no cuentan como nodos individuales, pero sus hijos si. **El recorrido no va más profundo que al nivel de los elementos de React:** no se renderizan, y sus hijos no se recorren. Los [Fragmentos](https://es.react.dev/reference/react/Fragment) no se recorren.

* * *

### `Children.map(children, fn, thisArg?)`[](#children-map "Link for this heading")

Llamar `Children.map(children, fn, thisArg?)` para mapear o transformar cada hijo en la estructura de datos `children`.

```
import { Children } from 'react';function RowList({ children }) {return (<div className="RowList">{Children.map(children, child =><div className="Row">{child}</div>)}</div>);}
```

[Ver más ejemplos abajo.](#transforming-children)

#### Parámetros[](#children-map-parameters "Link for Parámetros ")

*   `children`: El valor de la [prop `children`](https://es.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) que recibe por tu componente.
*   `fn`: La función de mapeo, similar al _callback_ del [método `map` de un _array_](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map). Se llamará con el hijo como primer argumento y su índice como segundo argumento. El índice empieza en `0` y se incrementa por cada llamada. Necesitas devolver un nodo de React de esta función. Puede ser un nodo vacío (`null`, `undefined`, o un booleano), un string, un número, un elemento de React, o un _array_ de otros nodos de React.
*   **opcional** `thisArg`: El [valor `this`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/this) con el que se debe llamar a la función `fn`. Si se omite, es `undefined`.

#### Devuelve[](#children-map-returns "Link for Devuelve ")

Si `children` es `null` o `undefined`, devuelve el mismo valor.

De lo contrario, devuelve un array plano que consta de los nodos que ha devuelto de la función `fn`. El _array_ devuelto contendrá todos los nodos que devolviste excepto por `null` y `undefined`.

#### Advertencias[](#children-map-caveats "Link for Advertencias ")

*   Nodos vacíos (`null`, `undefined`, y booleanos), strings, números, y [elementos de React](https://es.react.dev/reference/react/createElement) cuentan como nodos individuales. Los _arrays_ no cuentan como nodos individuales, pero sus hijos sí. **El recorrido no va más profundo que al nivel de los elementos de React:** no se renderizan, y no se recorren sus hijos. Los [Fragmentos](https://es.react.dev/reference/react/Fragment) no se recorren.
    
*   Si devuelve un elemento o un _array_ de elementos con _keys_ desde `fn`, **las _keys_ de los elementos devueltos se combinarán automáticamente con la clave del elemento original correspondiente de `children`.** Cuando devuelves múltiples elementos desde `fn` en un _array_, sus _keys_ solo necesitan ser únicas localmente entre sí.
    

* * *

### `Children.only(children)`[](#children-only "Link for this heading")

Llamar `Children.only(children)` para comprobar que `children` representa un solo elemento de React.

```
function Box({ children }) {const element = Children.only(children);// ...
```

#### Parámetros[](#children-only-parameters "Link for Parámetros ")

*   `children`: El valor de la [prop `children`](https://es.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) que recibe tu componente.

#### Devuelve[](#children-only-returns "Link for Devuelve ")

Si `children` [es un elemento válido,](https://es.react.dev/reference/react/isValidElement) devuelve ese elemento.

De lo contrario, lanza un error.

#### Advertencias[](#children-only-caveats "Link for Advertencias ")

*   Este método siempre **lanza un error si pasas un _array_ (como el valor de devolución de `Children.map`) como `children`.** En otras palabras, hace cumplir que `children` es un solo elemento de React, no que sea un _array_ con un solo elemento.

* * *

### `Children.toArray(children)`[](#children-toarray "Link for this heading")

Llama `Children.toArray(children)` para crear un array a partir de la estructura de datos `children`.

```
import { Children } from 'react';export default function ReversedList({ children }) {const result = Children.toArray(children);result.reverse();// ...
```

#### Parámetros[](#children-toarray-parameters "Link for Parámetros ")

*   `children`: El valor de la [prop `children`](https://es.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) que recibe tu componente.

#### Devuelve[](#children-toarray-returns "Link for Devuelve ")

Devuelve un array plano de los elementos de `children`.

#### Advertencias[](#children-toarray-caveats "Link for Advertencias ")

*   Nodos vacíos (`null`, `undefined`, y booleanos) se omitirán en el _array_ devuelto. **Las _keys_ de los elementos devueltos se calcularán a partir de las _keys_ de los elementos originales y su nivel de anidamiento y posición.** Esto asegura que aplanar el array no introduzca cambios en el comportamiento.

* * *

## Uso[](#usage "Link for Uso ")

### Transformar children[](#transforming-children "Link for Transformar children ")

Para transformar el JSX de tu componente [que recibe como la prop `children`,](https://es.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) llama a `Children.map`:

```
import { Children } from 'react';function RowList({ children }) {return (<div className="RowList">{Children.map(children, child =><div className="Row">{child}</div>)}</div>);}
```

En el ejemplo anterior, `RowList` envuelve cada hijo que recibe en un contenedor `<div className="Row>`. Por ejemplo, digamos que el componente padre pasa tres etiquetas `<p>` como la prop `children` a `RowList`:

```
<RowList><p>Este es el primer elemento.</p><p>Este es el segundo elemento.</p><p>Este es el tercer elemento.</p></RowList>
```

Después, con la implementación anterior de `RowList`, el resultado final renderizado se verá así:

```
<div className="RowList"><div className="Row"><p>Este es el primer elemento.</p></div><div className="Row"><p>Este es el segundo elemento.</p></div><div className="Row"><p>Este es el tercer elemento.</p></div></div>
```

`Children.map` es similar [a la transformación de _arrays_ con `map()`.](https://es.react.dev/learn/rendering-lists) La diferencia es que la estructura de datos de `children` se considera _opaca._ Esto significa que incluso si a veces es un _array_, no debes asumir que es un _array_ o cualquier otro tipo de datos en particular. Esta es la razón por la que debes usar `Children.map` si necesitas transformarla.

##### Profundizar

#### ¿Por qué la prop `children` no siempre es un _array_?[](#why-is-the-children-prop-not-always-an-array "Link for this heading")

En React, la prop `children` se considera una estructura de datos _opaca_. Esto significa que no debes confiar en cómo está estructurada. Para transformar, filtrar, o contar children, deberías usar los métodos `Children`.

En la practica, la estructura de datos `children` a menudo se representa como un array internamente. Sin embargo, si solo hay un hijos, entonces React no creará un array extra ya que esto conduciría a una sobrecarga de memoria innecesaria. Siempre y cuando uses los métodos `Children` en lugar de hacer una introspección directa de los prop `children`, tú código no se romperá incluso si React cambia la forma en que se implementa realmente la estructura de datos.

Incluso cuando `children` es un array, `Children.map` tiene un comportamiento especial útil. Por ejemplo, `Children.map` combina las [keys](https://es.react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) en los elementos devueltos en las _keys_ del `children` que le has pasado. Esto asegura que los hijos JSX originales no “pierdan” las _keys_ incluso si se envuelven como en el ejemplo anterior.

### Atención

La estructura de datos `children` **no incluye la salida renderizada** de los componentes que pasas como JSX. En el siguiente ejemplo, los hijos (`children`) recibidos por el `RowList` solo contienen dos elementos en lugar de tres:

1.  `<p>Este es el primer elemento</p>`
2.  `<MoreRows />`

Esta es la razón por la que solo se generan dos contenedores de fila en este ejemplo:

import RowList from './RowList.js';

export default function App() {
  return (
    <RowList\>
      <p\>Este es el primer elemento.</p\>
      <MoreRows />
    </RowList\>
  );
}

function MoreRows() {
  return (
    <\>
      <p\>Este es el segundo elemento.</p\>
      <p\>Este es el tercer elemento.</p\>
    </\>
  );
}

**No hay forma de obtener la salida renderizada de un componente interno** como `<MoreRows />` al manipular `children`. Esta es la razón por la que [normalmente es mejor usar una de las soluciones alternativas.](#alternatives)

* * *

### Ejecutar un código para cada hijo[](#running-some-code-for-each-child "Link for Ejecutar un código para cada hijo ")

Llama a `Children.forEach` para iterar sobre cada hijo en la estructura de datos `children`. No devuelve ningún valor y es similar al [método `forEach` de un _array_.](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) Puedes usarlo para ejecutar una lógica personalizada como construir tu propio _array_.

### Atención

Como se mencionó anteriormente, no hay forma de obtener la salida renderizada de un componente interno al manipular `children`. Esta es la razón por la que [normalmente es mejor usar una de las soluciones alternativas.](#alternatives)

* * *

### Contar hijos[](#counting-children "Link for Contar hijos ")

Llama `Children.count(children)` para calcular el número de hijos.

import { Children } from 'react';

export default function RowList({ children }) {
  return (
    <div className\="RowList"\>
      <h1 className\="RowListHeader"\>
        Filas totales: {Children.count(children)}
      </h1\>
      {Children.map(children, child \=>
        <div className\="Row"\>
          {child}
        </div\>
      )}
    </div\>
  );
}

### Atención

Como se mencionó anteriormente, no hay forma de obtener la salida renderizada de un componente interno al manipular `children`. Esta es la razón por la que [normalmente es mejor usar una de las soluciones alternativas.](#alternatives)

* * *

### Convertir children a un array[](#converting-children-to-an-array "Link for Convertir children a un array ")

Llama `Children.toArray(children)` para convertir la estructura de datos `children` en un array de JavaScript regular. Esto te permite manipular el array con métodos de array integrados como [`filter`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [`sort`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), o [`reverse`.](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

### Atención

Como se mencionó anteriormente, no hay forma de obtener la salida renderizada de un componente interno al manipular `children`. Esta es la razón por la que [normalmente es mejor usar una de las soluciones alternativas.](#alternatives)

* * *

## Alternativas[](#alternatives "Link for Alternativas ")

### Nota

En esta sección se describen alternativas a la API `Children` (con `C` mayúscula) que se importa de esta manera:

```
import { Children } from 'react';
```

No lo confundas con el [uso de la prop `children`](https://es.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) (`c` minúscula), lo cual es bueno y recomendado.

### Exponer varios componentes[](#exposing-multiple-components "Link for Exponer varios componentes ")

Manipular hijos con los métodos de `Children` a menudo conduce a un código frágil. Cuando pasas hijos a un componente en JSX, por lo general, no esperas que el componente manipule o transforme los hijos individuales.

Cuando puedas, trata de evitar el uso de los métodos de `Children`. Por ejemplo, si quieres que cada hijo de `RowList` esté envuelto en `<div className="Row">`, exporta un componente `Row` y envuelve manualmente cada fila dentro de él de esta manera:

import { RowList, Row } from './RowList.js';

export default function App() {
  return (
    <RowList\>
      <Row\>
        <p\>Este es el primer elemento.</p\>
      </Row\>
      <Row\>
        <p\>Este es el segundo elemento.</p\>
      </Row\>
      <Row\>
        <p\>Este es el tercer elemento.</p\>
      </Row\>
    </RowList\>
  );
}

A diferencia de usar `Children.map`, este enfoque no envuelve a todos los hijos automáticamente. **Sin embargo, este enfoque tiene un beneficio significativo en comparación con el [ejemplo anterior con `Children.map`](#transforming-children) porque funciona incluso si sigues extrayendo más componentes.** Por ejemplo, todavía funciona si extraes tu propio componente `MoreRows`:

import { RowList, Row } from './RowList.js';

export default function App() {
  return (
    <RowList\>
      <Row\>
        <p\>Este es el primer elemento.</p\>
      </Row\>
      <MoreRows />
    </RowList\>
  );
}

function MoreRows() {
  return (
    <\>
      <Row\>
        <p\>Este es el segundo elemento.</p\>
      </Row\>
      <Row\>
        <p\>Este es el tercer elemento.</p\>
      </Row\>
    </\>
  );
}

Esto no funcionaría con `Children.map` porque “vería” `<MoreRows />` como un solo hijo (y una sola fila).

* * *

### Aceptar un _array_ de objetos como prop[](#accepting-an-array-of-objects-as-a-prop "Link for this heading")

También puedes pasar explícitamente un _array_ como prop. Por ejemplo, este `RowList` acepta el array `rows` como una prop:

Ya que `rows` es un _array_ regular de JavaScript, el componente `RowList` puede usar métodos de incorporados de _arrays_ como [`map`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map) en él.

Este patrón es especialmente útil cuando deseas poder pasar más información como datos estructurados junto con los hijos. En el siguiente ejemplo, el componente `TabSwitcher` recibe un array de objetos `tabs` como prop:

import TabSwitcher from './TabSwitcher.js';

export default function App() {
  return (
    <TabSwitcher tabs\={\[
      {
        id: 'first',
        header: 'First',
        content: <p\>Este es el primer elemento.</p\>
      },
      {
        id: 'second',
        header: 'Second',
        content: <p\>Este es el segundo elemento.</p\>
      },
      {
        id: 'third',
        header: 'Third',
        content: <p\>Este es el tercer elemento.</p\>
      }
    \]} />
  );
}

A diferencia de pasar los hijos como JSX, este enfoque te permite asociar algunos datos adicionales como `header` con cada elemento. Como estás trabajando con `tabs` directamente, y es un _array_, no necesita los métodos de `Children`.

* * *

### Llamar a una prop de renderizado para adaptar el renderizado[](#calling-a-render-prop-to-customize-rendering "Link for Llamar a una prop de renderizado para adaptar el renderizado ")

En lugar de producir JSX para cada elemento, también puedes pasar una función que devuelva JSX, y llamar a esa función cuando sea necesario. En este ejemplo, el componente `App` pasa una función `renderContent` al componente `TabSwitcher`. El componente `TabSwitcher` llama a `renderContent` solo para la pestaña (_tab_) seleccionada:

Una prop como `renderContent` se llama _render prop_ o prop de renderizado, porque es un prop que especifica cómo representar una parte de la interfaz de usuario. Sin embargo, no tiene nada de especial: es una prop regular que resulta ser una función.

Las props de renderizado son funciones, por lo que les puedes pasar información. Por ejemplo, este componente `RowList` pasa el `id` y el `index` de cada fila a la prop de renderizado `renderRow`, que usa `index` para resaltar las filas pares:

import { RowList, Row } from './RowList.js';

export default function App() {
  return (
    <RowList
      rowIds\={\['primero', 'segundo', 'tercero'\]}
      renderRow\={(id, index) \=> {
        return (
          <Row isHighlighted\={index % 2 === 0}\>
            <p\>Este es el elemento {id}.</p\>
          </Row\> 
        );
      }}
    />
  );
}

Este es otro ejemplo de cómo los componentes padre e hijo pueden cooperar sin manipular a los hijos.

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### Paso un componente personalizado, pero los métodos de `Children` no muestran su resultado del renderizado[](#i-pass-a-custom-component-but-the-children-methods-dont-show-its-render-result "Link for this heading")

Supongamos que pasa dos hijos a `RowList` como esto:

```
<RowList><p>Primer ítem</p><MoreRows /></RowList>
```

Si haces `Children.count(children)` dentro de `RowList`, obtendrás `2`. Incluso si `MoreRows` renderiza 10 elementos diferentes, o si devuelve `null`, `Children.count(children)`seguirá siendo `2`. Desde la perspectiva de `RowList`, solo “ve” el JSX que ha recibido. No “ve” las partes internas del componente `MoreRows`.

La limitación dificulta la extracción de un componente. Por eso las [alternativas](#alternatives) son preferibles al uso de `Children`.
