---
title: cloneElement – React
source: https://es.react.dev/reference/react/cloneElement
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# cloneElement – React

### Atención

El uso de `cloneElement` no es común y puede conducir a un código frágil. [Mira alternativas comunes.](#alternatives)

`cloneElement` te permite crear un nuevo elemento de React usando otro elemento como punto de partida.

```
const clonedElement = cloneElement(element, props, ...children)
```

*   [Referencia](#reference)
    *   [`cloneElement(elemento, props, ...children)`](#cloneelement)
*   [Uso](#usage)
    *   [Sobrescribir props de un elemento](#overriding-props-of-an-element)
*   [Alternativas](#alternatives)
    *   [Pasar datos con una prop de renderizado](#passing-data-with-a-render-prop)
    *   [Pasar datos a través del contexto](#passing-data-through-context)
    *   [Extraer lógica en un Hook personalizado](#extracting-logic-into-a-custom-hook)

* * *

## Referencia[](#reference "Link for Referencia ")

### `cloneElement(elemento, props, ...children)`[](#cloneelement "Link for this heading")

Llama a `cloneElement` para crear un elemento React basado en el `elemento`, pero con diferentes `props` y `children`:

```
import { cloneElement } from 'react';// ...const clonedElement = cloneElement(<Row title="Col">    Hola</Row>,{ isHighlighted: true },'Adiós');console.log(clonedElement); // <Row title="Col" isHighlighted={true}>Adiós</Row>
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `elemento`: El argumento `elemento` debe ser un elemento de React válido. Por ejemplo, podría ser un nodo JSX como `<Something />`, el resultado de llamar a [`createElement`](https://es.react.dev/reference/react/createElement), o el resultado de otra llamada a `cloneElement`.
    
*   `props`: El argumento `props` debe ser un objeto o `null`. Si pasas `null`, el elemento clonado mantendrá todos los `element.props` originales. De lo contrario, para cada propiedad en el objeto `props`, el elemento devuelto “preferirá” el valor de `props` sobre el valor de `element.props`. El resto de las propiedades se completarán a partir de los `element.props` originales. Si pasas `props.key` o `props.ref`, reemplazarán a los originales.
    
*   **opcional** `...children`: Cero o más nodos hijo. Pueden ser cualquier nodo React, incluidos elementos de React, cadenas, números, [portales](https://es.react.dev/reference/react-dom/createPortal), nodos vacíos (`null`, `undefined`, `true`, y `false`), y _arrays_ de nodos de React. Si no pasas ningún argumento `...children`, se conservarán los `element.props.children` originales.
    

#### Devuelve[](#returns "Link for Devuelve ")

`cloneElement` devuelve un objeto de elemento de React con algunas propiedades:

*   `type`: Igual que `element.type`.
*   `props`: El resultado de mezclar superficialmente `element.props` con las `props` que has pasado para sobrescribirlas.
*   `ref`: El `element.ref` original, a menos que se haya sobrescrito con `props.ref`.
*   `key`: El `element.key` original, a menos que se haya sobrescrito con `props.key`.

Usualmente, devolverás el elemento desde tu componente o lo harás hijo de otro elemento. Aunque puedes leer las propiedades del elemento, es mejor tratar a cada elemento como opaco después de que se crea, y solo renderizarlo.

#### Advertencias[](#advertencias "Link for Advertencias ")

*   Clonar un elemento **no modifica el elemento original.**
    
*   Solo debes **pasar hijos como múltiples argumentos a `createElement` si todos son conocidos estáticamente**, como `cloneElement(element, null, child1, child2, child3)`. Si tus hijos son dinámicos, pasa todo el _array_ como tercer argumento: `cloneElement(element, null, listItems)`. Esto garantiza que React te [advierta sobre las `key`s que faltan](https://es.react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) para cualquier lista dinámica. Para listas estáticas no es necesario porque nunca se reordenan.
    
*   `cloneElement` hace que sea más difícil rastrear el flujo de datos, por lo que **prueba las [alternativas](https://es.react.dev/#alternatives) en su lugar.**
    

* * *

## Uso[](#usage "Link for Uso ")

### Sobrescribir props de un elemento[](#overriding-props-of-an-element "Link for Sobrescribir props de un elemento ")

Para sobrescribir las props de algún elemento de React, pásalo a `cloneElement` con las props que quieres sobrescribir:

```
import { cloneElement } from 'react';// ...const clonedElement = cloneElement(<Row title="Col" />,{ isHighlighted: true });
```

Aquí, el elemento clonado resultante será `<Row title="Col" isHighlighted={true} />`.

**Veamos un ejemplo para ver cuándo es útil.**

Imagina un componente `List` que renderiza sus [`children`](https://es.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) como una lista de filas seleccionables con un botón “Siguiente” que cambia qué fila está seleccionada. El componente `List` necesita renderizar la `Row` seleccionada de manera diferente, por lo que clona cada hijo `<Row>` que ha recibido y agrega una propiedad extra `isHighlighted: true` o `isHighlighted: false`:

```
export default function List({ children }) {const [selectedIndex, setSelectedIndex] = useState(0);return (<div className="List">{Children.map(children, (child, index) =>cloneElement(child, {isHighlighted: index === selectedIndex }))}
```

Digamos que el JSX original recibido por `List` se ve así:

```
<List><Row title="Col" /><Row title="Ajo" /><Row title="Manzana" /></List>
```

Clonando sus hijos, `List` puede pasar información adicional a cada `Row` dentro. El resultado se ve así:

```
<List><Rowtitle="Col"isHighlighted={true} /><Rowtitle="Ajo"isHighlighted={false} /><Rowtitle="Manzana"isHighlighted={false} /></List>
```

Observa cómo al presionar “Siguiente” se actualiza el estado del `List`, y resalta una fila diferente:

import { Children, cloneElement, useState } from 'react';

export default function List({ children }) {
  const \[selectedIndex, setSelectedIndex\] = useState(0);
  return (
    <div className\="List"\>
      {Children.map(children, (child, index) \=>
        cloneElement(child, {
          isHighlighted: index === selectedIndex 
        })
      )}
      <hr />
      <button onClick\={() \=> {
        setSelectedIndex(i \=>
          (i + 1) % Children.count(children)
        );
      }}\>
        Siguiente
      </button\>
    </div\>
  );
}

Para resumir, `List` clonó los elementos `<Row />` que recibió y les agregó una propiedad extra.

### Atención

Al clonar los hijos se hace difícil saber cómo fluye la información a través de tu aplicación. Intenta una de las [alternativas](#alternatives).

* * *

## Alternativas[](#alternatives "Link for Alternativas ")

### Pasar datos con una prop de renderizado[](#passing-data-with-a-render-prop "Link for Pasar datos con una prop de renderizado ")

En vez de usar `cloneElement`, considera aceptar una _render prop_ (o prop de renderizado) como `renderItem`. Aquí, `List` recibe `renderItem` como una prop. `List` llama a `renderItem` para cada elemento y pasa `isHighlighted` como un argumento:

```
export default function List({ items, renderItem }) {const [selectedIndex, setSelectedIndex] = useState(0);return (<div className="List">{items.map((item, index) => {const isHighlighted = index === selectedIndex;return renderItem(item, isHighlighted);})}
```

La prop `renderItem` se llama una _“render prop”_ porque es una propiedad que especifica cómo renderizar algo. Por ejemplo, puedes pasar una implementación de `renderItem` que renderice un `<Row>` con el valor `isHighlighted` dado:

```
<Listitems={products}renderItem={(product, isHighlighted) =><Rowkey={product.id}title={product.title}isHighlighted={isHighlighted}/>}/>
```

El resultado final es el mismo que con `cloneElement`:

```
<List><Rowtitle="Col"isHighlighted={true} /><Rowtitle="Ajo"isHighlighted={false} /><Rowtitle="Manzana"isHighlighted={false} /></List>
```

Sin embargo, puedes rastrear claramente de dónde viene el valor `isHighlighted`.

import { useState } from 'react';

export default function List({ items, renderItem }) {
  const \[selectedIndex, setSelectedIndex\] = useState(0);
  return (
    <div className\="List"\>
      {items.map((item, index) \=> {
        const isHighlighted = index === selectedIndex;
        return renderItem(item, isHighlighted);
      })}
      <hr />
      <button onClick\={() \=> {
        setSelectedIndex(i \=>
          (i + 1) % items.length
        );
      }}\>
        Siguiente
      </button\>
    </div\>
  );
}

Este patrón es preferido a `cloneElement` porque es más explícito.

* * *

### Pasar datos a través del contexto[](#passing-data-through-context "Link for Pasar datos a través del contexto ")

Otra alternativa a `cloneElement` es [pasar datos a través del contexto.](https://es.react.dev/learn/passing-data-deeply-with-context)

Por ejemplo, puedes llamar a [`createContext`](https://es.react.dev/reference/react/createContext) para definir un `HighlightContext`:

```
export const HighlightContext = createContext(false);
```

Tu componente `List` puede envolver cada elemento que renderiza en un proveedor de `HighlightContext`:

```
export default function List({ items, renderItem }) {const [selectedIndex, setSelectedIndex] = useState(0);return (<div className="List">{items.map((item, index) => {const isHighlighted = index === selectedIndex;return (<HighlightContext.Provider key={item.id} value={isHighlighted}>{renderItem(item)}</HighlightContext.Provider>);})}
```

Con este enfoque, `Row` no necesita recibir una propiedad `isHighlighted` en absoluto. En su lugar, lee del contexto:

```
export default function Row({ title }) {const isHighlighted = useContext(HighlightContext);// ...
```

Esto permite que el componente que llama no sepa o se preocupe por pasar `isHighlighted` a `<Row>`:

```
<Listitems={products}renderItem={product =><Row title={product.title} />}/>
```

En vez de eso, `List` y `Row` coordinan la lógica de resaltado a través del contexto.

import { useState } from 'react';
import { HighlightContext } from './HighlightContext.js';

export default function List({ items, renderItem }) {
  const \[selectedIndex, setSelectedIndex\] = useState(0);
  return (
    <div className\="List"\>
      {items.map((item, index) \=> {
        const isHighlighted = index === selectedIndex;
        return (
          <HighlightContext.Provider
            key\={item.id}
            value\={isHighlighted}
          \>
            {renderItem(item)}
          </HighlightContext.Provider\>
        );
      })}
      <hr />
      <button onClick\={() \=> {
        setSelectedIndex(i \=>
          (i + 1) % items.length
        );
      }}\>
        Siguiente
      </button\>
    </div\>
  );
}

[Aprende más sobre pasar datos a través del contexto.](https://es.react.dev/reference/react/useContext#passing-data-deeply-into-the-tree)

* * *

Otro enfoque que puedes probar es extraer la lógica “no visual” en tu propio Hook, y usar la información devuelta por tu Hook para decidir qué renderizar. Por ejemplo, puedes escribir un Hook personalizado `useList` como este:

```
import { useState } from 'react';export default function useList(items) {const [selectedIndex, setSelectedIndex] = useState(0);function onNext() {setSelectedIndex(i =>(i + 1) % items.length);}const selected = items[selectedIndex];return [selected, onNext];}
```

Luego puedes usarlo así:

```
export default function App() {const [selected, onNext] = useList(products);return (<div className="List">{products.map(product =><Rowkey={product.id}title={product.title}isHighlighted={selected === product}/>)}<hr /><button onClick={onNext}>        Siguiente</button></div>);}
```

El flujo de datos es explícito, pero el estado está dentro del Hook personalizado `useList` que puedes usar desde cualquier componente:

import Row from './Row.js';
import useList from './useList.js';
import { products } from './data.js';

export default function App() {
  const \[selected, onNext\] = useList(products);
  return (
    <div className\="List"\>
      {products.map(product \=>
        <Row
          key\={product.id}
          title\={product.title}
          isHighlighted\={selected === product}
        />
      )}
      <hr />
      <button onClick\={onNext}\>
        Siguiente
      </button\>
    </div\>
  );
}

Este enfoque es particularmente útil si quieres reutilizar esta lógica entre diferentes componentes.
