---
title: APIs integradas de React – React
source: https://es.react.dev/reference/react/apis
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# APIs integradas de React – React

Además de [Hooks](https://es.react.dev/reference/react) y [Componentes](https://es.react.dev/reference/react/components), el paquete `react` exporta algunas otras APIs que son útiles para definir componentes. Esta página lista todas las demás APIs modernas de React.

* * *

*   [`createContext`](https://es.react.dev/reference/react/createContext) te permite definir y proporcionar contexto a los componentes hijos. Se utiliza con [`useContext`.](https://es.react.dev/reference/react/useContext)
*   [`forwardRef`](https://es.react.dev/reference/react/forwardRef) permite que tu componente exponga un nodo DOM como una referencia al padre. Se utiliza con [`useRef`.](https://es.react.dev/reference/react/useRef)
*   [`lazy`](https://es.react.dev/reference/react/lazy) te permite retrasar la carga del código de un componente hasta que se renderice por primera vez.
*   [`memo`](https://es.react.dev/reference/react/memo) permite que tu componente omita nuevas renderizaciones con las mismas props. Se utiliza con [`useMemo`](https://es.react.dev/reference/react/useMemo) y [`useCallback`.](https://es.react.dev/reference/react/useCallback)
*   [`startTransition`](https://es.react.dev/reference/react/startTransition) te permite marcar una actualización de estado como no urgente. Similar a [`useTransition`.](https://es.react.dev/reference/react/useTransition)
*   [`act`](https://es.react.dev/reference/react/act) lets you wrap renders and interactions in tests to ensure updates have processed before making assertions.

* * *

## Resource APIs[](#resource-apis "Link for Resource APIs ")

_Resources_ can be accessed by a component without having them as part of their state. For example, a component can read a message from a Promise or read styling information from a context.

To read a value from a resource, use this API:

*   [`use`](https://es.react.dev/reference/react/use) lets you read the value of a resource like a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [context](https://es.react.dev/learn/passing-data-deeply-with-context).

```
function MessageComponent({ messagePromise }) {const message = use(messagePromise);const theme = use(ThemeContext);// ...}
```
