---
title: APIs heredadas de React – React
source: https://es.react.dev/reference/react/legacy
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# APIs heredadas de React – React

Estas APIs se exportan desde el paquete `react`, pero no se recomiendan para ser usadas en código nuevo. Consulta las páginas de API individuales vinculadas para conocer las alternativas sugeridas.

* * *

## APIs heredadas[](#legacy-apis "Link for APIs heredadas ")

*   [`Children`](https://es.react.dev/reference/react/Children) te permite manipular y transformar el JSX recibido como la prop `children`. [Ver alternativas.](https://es.react.dev/reference/react/Children#alternatives)
*   [`cloneElement`](https://es.react.dev/reference/react/cloneElement) te permite crear un elemento de React utilizando otro elemento como punto de partida. [Ver alternativas.](https://es.react.dev/reference/react/cloneElement#alternatives)
*   [`Component`](https://es.react.dev/reference/react/Component) te permite definir un componente de React como una clase de JavaScript. [Ver alternativas.](https://es.react.dev/reference/react/Component#alternatives)
*   [`createElement`](https://es.react.dev/reference/react/createElement) te permite crear un elemento de React. Normalmente, utilizarás JSX en su lugar.
*   [`createRef`](https://es.react.dev/reference/react/createRef) crea un objeto ref que puede contener un valor arbitrario. [Ver alternativas.](https://es.react.dev/reference/react/createRef#alternatives)
*   [`forwardRef`](https://es.react.dev/reference/react/forwardRef) permite que tu componente exponga un nodo DOM al componente padre con una [ref.](https://es.react.dev/learn/manipulating-the-dom-with-refs)
*   [`isValidElement`](https://es.react.dev/reference/react/isValidElement) comprueba si un valor es un elemento de React. Normalmente se utiliza con [`cloneElement`.](https://es.react.dev/reference/react/cloneElement)
*   [`PureComponent`](https://es.react.dev/reference/react/PureComponent) es similar a [`Component`,](https://es.react.dev/reference/react/Component) pero omite los rerenderizados con las mismas props. [Ver alternativas.](https://es.react.dev/reference/react/PureComponent#alternatives)

* * *

## APIs eliminadas[](#removed-apis "Link for APIs eliminadas ")

Las siguientes API se eliminaron en React 19:

*   [`createFactory`](https://18.react.dev/reference/react/createFactory): utiliza JSX en su lugar.
*   Componentes de Clase: [`static contextTypes`](https://18.react.dev//reference/react/Component#static-contexttypes): utiliza [`static contextType`](#static-contexttype) en su lugar.
*   Componentes de Clase: [`static childContextTypes`](https://18.react.dev//reference/react/Component#static-childcontexttypes): utiliza [`static contextType`](#static-contexttype) en su lugar.
*   Componentes de Clase: [`static getChildContext`](https://18.react.dev//reference/react/Component#getchildcontext): utiliza [`Context.Provider`](https://es.react.dev/reference/react/createContext#provider) en su lugar.
*   Componentes de Clase: [`static propTypes`](https://18.react.dev//reference/react/Component#static-proptypes): utiliza un sistema de tipos como [TypeScript](https://www.typescriptlang.org/) en su lugar.
*   Componentes de Clase: [`this.refs`](https://18.react.dev//reference/react/Component#refs): utiliza [`createRef`](https://es.react.dev/reference/react/createRef) en su lugar.
