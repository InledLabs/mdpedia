---
title: useDebugValue – React
source: https://es.react.dev/reference/react/useDebugValue
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useDebugValue – React

`useDebugValue` es un Hook de React que te permite añadir una etiqueta a un Hook personalizado en las [herramientas de desarrollo de React.](https://es.react.dev/learn/react-developer-tools)

```
useDebugValue(value, format?)
```

*   [Referencia](#reference)
    *   [`useDebugValue(value, format?)`](#usedebugvalue)
*   [Uso](#usage)
    *   [Añadir una etiqueta a un Hook personalizado](#adding-a-label-to-a-custom-hook)
    *   [Aplazar el formateo de un valor de depuración](#deferring-formatting-of-a-debug-value)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useDebugValue(value, format?)`[](#usedebugvalue "Link for this heading")

Llama a `useDebugValue` en el primer nivel de tu [Hook personalizado](https://es.react.dev/learn/reusing-logic-with-custom-hooks) para mostrar un valor de depuración legible:

```
import { useDebugValue } from 'react';function useOnlineStatus() {// ...useDebugValue(isOnline ? 'Online' : 'Offline');// ...}
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `value`: El valor que quieres mostrar en las herramientas de desarrollo de React. Puede tener cualquier tipo.
*   `format` **opcional**: Una función de formateo. Cuando se inspecciona el componente, las herramientas de desarrollo de React llamarán a la función de formateo con `value` como argumento, y mostrarán el valor formateado devuelto (que puede tener cualquier tipo). Si no especificas la función de formateo, se mostrará el mismo valor `value` original.

#### Devuelve[](#returns "Link for Devuelve ")

`useDebugValue` no devuelve nada.

## Uso[](#usage "Link for Uso ")

### Añadir una etiqueta a un Hook personalizado[](#adding-a-label-to-a-custom-hook "Link for Añadir una etiqueta a un Hook personalizado ")

Llama a `useDebugValue` en el primer nivel de tu [Hook personalizado](https://es.react.dev/learn/reusing-logic-with-custom-hooks) para mostrar un valor de depuración legible para las [herramientas de desarrollo de React.](https://es.react.dev/learn/react-developer-tools)

```
import { useDebugValue } from 'react';function useOnlineStatus() {// ...useDebugValue(isOnline ? 'Online' : 'Offline');// ...}
```

Esto le da a los componentes que llamen a `useOnlineStatus` una etiqueta como `OnlineStatus: "Online"` cuando lo inspeccionas:

![Una captura de pantalla de las herramientas de desarrollo de React que muestra el valor de depuración](https://es.react.dev/_next/image?url=%2Fimages%2Fdocs%2Freact-devtools-usedebugvalue.png&w=1920&q=75)

Sin la llamada a `useDebugValue`, solo se mostrarán los datos subyacentes (en este ejemplo, `true`).

import { useSyncExternalStore, useDebugValue } from 'react';

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, () \=> navigator.onLine, () \=> true);
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () \=> {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

### Nota

No recomendamos añadir valores de depuración a cada Hook personalizado. Es más valioso para Hooks personalizados que son parte de bibliotecas compartidas y que tienen una estructura de datos compleja interna que es difícil de inspeccionar.

* * *

### Aplazar el formateo de un valor de depuración[](#deferring-formatting-of-a-debug-value "Link for Aplazar el formateo de un valor de depuración ")

Puedes también pasar una función de formateo como segundo argumento para `useDebugValue`:

```
useDebugValue(date, date => date.toDateString());
```

Tu función de formateo recibirá el valor de depuración como parámetro y debe devolver un valor de visualización formateado. Cuando tu componente es inspeccionado, las herramientas de desarrollo de React llamarán a la función de formateo y mostrarán el resultado.

Esto permite evitar ejecutar una lógica de formateo potencialmente costosa a no ser que el componente esté siendo inspeccionado. Por ejemplo, si `date` es un valor de fecha, evita llamar a `toDateString()` para cada renderizado del componente.
