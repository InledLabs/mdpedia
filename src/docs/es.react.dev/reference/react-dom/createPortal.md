---
title: createPortal – React
source: https://es.react.dev/reference/react-dom/createPortal
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# createPortal – React

`createPortal` permite renderizar componentes hijos en otra parte del DOM.

```
<div><SomeComponent />{createPortal(children, domNode, key?)}</div>
```

*   [Referencia](#reference)
    *   [`createPortal(children, domNode, key?)`](#createportal)
*   [Uso](#usage)
    *   [Renderizar en otra parte del DOM](#rendering-to-a-different-part-of-the-dom)
    *   [Renderizar una ventana modal con un portal](#rendering-a-modal-dialog-with-a-portal)
    *   [Renderizar componentes de React en marcado de servidor no generado por React](#rendering-react-components-into-non-react-server-markup)
    *   [Renderizar componentes de React en nodos de DOM no generados por React](#rendering-react-components-into-non-react-dom-nodes)

* * *

## Referencia[](#reference "Link for Referencia ")

### `createPortal(children, domNode, key?)`[](#createportal "Link for this heading")

Para crear un portal, debes llamar a `createPortal` y pasarle el JSX junto con el nodo de DOM donde se renderizará:

```
import { createPortal } from 'react-dom';// ...<div><p>Este elemento hijo va en el div padre.</p>{createPortal(<p>Este elemento hijo va en el body.</p>,document.body)}</div>
```

[Ver más ejemplos abajo.](#usage)

Un portal modifica solamente la ubicación física del nodo de DOM, mientras que el JSX que se renderiza en él actúa como un nodo hijo del componente de React que lo renderiza. Por lo tanto, el nodo hijo tendrá acceso al contexto proporcionado por el árbol padre y los eventos se propagarán de hijo a padre siguiendo la estructura del árbol de React.

#### Parámetros[](#parameters "Link for Parámetros ")

*   `children`: Todo elemento que se pueda renderizar con React, ya sea código JSX (por ejemplo, `<div />` o `<SomeComponent />`), un [Fragment](https://es.react.dev/reference/react/Fragment) (`<>...</>`), un string o un número, o un array que contenga estos elementos.
    
*   `domNode`: Un nodo de DOM, como el que devuelve `document.getElementById()`. El nodo debe existir previamente. Si durante una actualización se pasa un nodo de DOM diferente, el contenido del portal se volverá a crear.
    
*   **opcional** `key`: Un valor único en forma de string o número que se usará como [key](https://es.react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) para el portal.
    

#### Devuelve[](#returns "Link for Devuelve ")

`createPortal` devuelve un nodo de React que puede incluirse en JSX o ser devuelto desde un componente de React. Si React encuentra el nodo en la salida del renderizado, insertará `children` dentro del `domNode` proporcionado.

#### Advertencias[](#caveats "Link for Advertencias ")

*   Los eventos del portal se propagan siguiendo la estructura del árbol de React en lugar del árbol del DOM. Por ejemplo, si haces clic dentro del portal, y el portal está envuelto en `<div onClick>`, ese `onClick` se ejecutará. Si esto causa problemas, puedes detener la propagación del evento desde el portal o levantar el portal en la estructura del árbol de React.

* * *

## Uso[](#usage "Link for Uso ")

### Renderizar en otra parte del DOM[](#rendering-to-a-different-part-of-the-dom "Link for Renderizar en otra parte del DOM ")

Los _portales_ permiten que tus componentes rendericen sus elementos hijos en otras partes del DOM, permitiéndoles “escapar” de cualquier contenedor en el que se encuentren. Por ejemplo, un componente puede mostrar una ventana modal o un tooltip que aparezca por encima y fuera del resto de la página.

Para crear un portal, renderiza el resultado de `createPortal` con código JSX y el nodo de DOM en el cual se va a insertar:

```
import { createPortal } from 'react-dom';function MyComponent() {return (<div style={{ border: '2px solid black' }}><p>Este elemento hijo va en el div padre.</p>{createPortal(<p>Este elemento hijo va en el body.</p>,document.body)}</div>);}
```

React insertará los nodos de DOM del JSX que pasaste dentro del nodo de DOM que proporcionaste.

Si no se utiliza un portal, el segundo `<p>` se insertaría dentro del `<div>` padre, pero gracias al uso del portal, este se “teletransporta” al elemento [`document.body`:](https://developer.mozilla.org/es/docs/Web/API/Document/body)

Nota cómo el segundo párrafo aparece visualmente fuera del `<div>` padre con borde. Si inspeccionas la estructura del DOM con las herramientas para desarrolladores, verás que el segundo `<p>` se ha insertado directamente dentro del elemento `<body>`:

```
<body><div id="root">    ...<div style="border: 2px solid black"><p>Este elemento hijo va dentro del div padre.</p></div>    ...</div><p>Este elemento hijo va en el body.</p></body>
```

Un portal modifica solamente la ubicación física del nodo de DOM, mientras que el JSX que se renderiza en él actúa como un nodo hijo del componente de React que lo renderiza. Por lo tanto, el nodo hijo tendrá acceso al contexto proporcionado por el árbol padre y los eventos continuarán propagándose de hijo a padre siguiendo la estructura del árbol de React.

* * *

### Renderizar una ventana modal con un portal[](#rendering-a-modal-dialog-with-a-portal "Link for Renderizar una ventana modal con un portal ")

Los portales permiten dejar que una ventana modal aparezca por encima del resto de la página, incluso si el componente que la llama está dentro de un contenedor con estilos que afecten a la ventana modal, como `overflow: hidden`.

En este ejemplo, ambos contenedores tienen estilos que interfieren con la ventana modal, pero la que se renderiza a través de un portal no se ve afectada porque, en el DOM, la ventana no está dentro de los elementos JSX padres.

### Atención

Es importante garantizar la accesibilidad de tu aplicación al utilizar portales. Para ello, puede que tengas que gestionar el foco del teclado para que el usuario pueda navegar dentro y fuera del portal de forma natural.

Sigue la [Guía de Creación de Ventanas Modales con WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/#dialog_modal) al crear portales. Si usas paquetes de la comunidad, asegúrate de que sean accesibles y sigan estas pautas.

* * *

### Renderizar componentes de React en marcado de servidor no generado por React[](#rendering-react-components-into-non-react-server-markup "Link for Renderizar componentes de React en marcado de servidor no generado por React ")

Los portales resultan útiles cuando se desea integrar contenido de React en páginas estáticas o generadas por el servidor. Por ejemplo, si la página está construida con un framework del lado del servidor como Rails, se puede agregar interactividad dentro de áreas estáticas, como sidebars. En lugar de tener [varias raíces de React por separado,](https://es.react.dev/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react) los portales permiten tratar la aplicación como un solo árbol de React con estado compartido, a pesar de que sus partes se rendericen en otras secciones del DOM.

import { createPortal } from 'react-dom';

const sidebarContentEl = document.getElementById('sidebar-content');

export default function App() {
  return (
    <\>
      <MainContent />
      {createPortal(
        <SidebarContent />,
        sidebarContentEl
      )}
    </\>
  );
}

function MainContent() {
  return <p\>Esta sección se renderiza con React</p\>;
}

function SidebarContent() {
  return <p\>¡Esta sección también se renderiza con React!</p\>;
}

* * *

### Renderizar componentes de React en nodos de DOM no generados por React[](#rendering-react-components-into-non-react-dom-nodes "Link for Renderizar componentes de React en nodos de DOM no generados por React ")

Se puede manejar el contenido de un nodo de DOM fuera de React utilizando portales. Por ejemplo, si estás trabajando con un widget de mapa que no usa React y deseas renderizar contenido de React dentro de una ventana emergente, puedes hacerlo definiendo una variable de estado `popupContainer` que almacene el nodo de DOM donde se realizará la renderización.

```
const [popupContainer, setPopupContainer] = useState(null);
```

Al crear el widget de terceros, almacena el nodo de DOM devuelto para poder renderizar en él:

```
useEffect(() => {if (mapRef.current === null) {const map = createMapWidget(containerRef.current);mapRef.current = map;const popupDiv = addPopupToMapWidget(map);setPopupContainer(popupDiv);}}, []);
```

De esta forma, puedes usar `createPortal` para renderizar contenido de React en `popupContainer` una vez que esté disponible:

```
return (<div style={{ width: 250, height: 250 }} ref={containerRef}>{popupContainer !== null && createPortal(<p>¡Saludos desde React!</p>,popupContainer)}</div>);
```

A continuación, un ejemplo completo para que puedas probar:

import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createMapWidget, addPopupToMapWidget } from './map-widget.js';

export default function Map() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const \[popupContainer, setPopupContainer\] = useState(null);

  useEffect(() \=> {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, \[\]);

  return (
    <div style\={{ width: 250, height: 250 }} ref\={containerRef}\>
      {popupContainer !== null && createPortal(
        <p\>¡Saludos desde React!</p\>,
        popupContainer
      )}
    </div\>
  );
}
