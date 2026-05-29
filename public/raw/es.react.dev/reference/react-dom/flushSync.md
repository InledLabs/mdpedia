---
title: flushSync – React
source: https://es.react.dev/reference/react-dom/flushSync
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# flushSync – React

### Atención

El uso de `flushSync` es poco común y puede afectar el rendimiento de tu aplicación.

`flushSync` permite forzar a React a que ejecute de forma asíncrona cualquier actualización dentro de la función _callback_ proporcionada. Esto asegura que el DOM se actualiza inmediatamente.

```
flushSync(callback)
```

*   [Referencia](#reference)
    *   [`flushSync(callback)`](#flushsync)
*   [Uso](#usage)
    *   [Ejecutar actualizaciones para integraciones de terceros](#flushing-updates-for-third-party-integrations)

* * *

## Referencia[](#reference "Link for Referencia ")

### `flushSync(callback)`[](#flushsync "Link for this heading")

Llama a `flushSync` para forzar a React a ejecutar cualquier trabajo pendiente y actualizar el DOM de forma sincrónica.

```
import { flushSync } from 'react-dom';flushSync(() => {setSomething(123);});
```

La mayoría de las veces, `flushSync` puede evitarse. Utiliza `flushSync` como último recurso.

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `callback`: Una función. React llamará inmediatamente a esta función _callback_ y ejecutará cualquier actualización que contenga de forma sincrónica. También puede ejecutar cualquier actualización pendiente, o Efectos, o actualizaciones dentro de Efectos. Si una actualización se suspende como resultado de esta llamada `flushSync`, los _fallbacks_ pueden volver a mostrarse.

#### Devuelve[](#returns "Link for Devuelve ")

`flushSync` devuelve `undefined`.

#### Advertencias[](#caveats "Link for Advertencias ")

*   `flushSync` puede perjudicar significativamente el rendimiento. Utilízalo con moderación.
*   `flushSync` puede forzar que las barreras de Suspense pendientes muestren su estado de `fallback`.
*   `flushSync` puede ejecutar Efectos pendientes y aplicar sincrónicamente cualquier actualización que contengan antes de devolver.
*   `flushSync` puede ejecutar actualizaciones fuera del _callback_ cuando sea necesario para ejecutar las actualizaciones dentro del _callback_. Por ejemplo, si hay actualizaciones pendientes de un clic, React puede ejecutarlas antes de ejecutar las actualizaciones dentro del _callback_.

* * *

## Uso[](#usage "Link for Uso ")

### Ejecutar actualizaciones para integraciones de terceros[](#flushing-updates-for-third-party-integrations "Link for Ejecutar actualizaciones para integraciones de terceros ")

Cuando se hace una integración con código de terceros, como las APIs del navegador o bibliotecas de interfaz de usuario, puede ser necesario forzar a React a ejecutar las actualizaciones. Utiliza `flushSync` para forzar a React a que ejecute cualquier actualización de estado dentro de la función _callback_ de forma sincrónica:

```
flushSync(() => {setSomething(123);});// Cuando se llegue a esta línea, el DOM estará actualizado.
```

Esto garantiza que, para cuando se ejecute la siguiente línea de código, React ya haya actualizado el DOM.

**Usar `flushSync` es poco común, y usarlo con frecuencia puede afectar significativamente el rendimiento de tu aplicación.** Si tu aplicación solo usa las APIs de React y no se integra con bibliotecas de terceros, `flushSync` debería ser innecesario.

Sin embargo, puede ser útil para la integración con código de terceros, como las APIs de los navegadores.

Algunas APIs de los navegadores esperan que los resultados dentro de _callbacks_ se escriban en el DOM de forma sincrónica, al final del _callback_, para que el navegador pueda hacer algo con el DOM renderizado. En la mayoría de los casos, React se encarga de esto automáticamente. Pero en algunos casos puede ser necesario salir de React y forzar una actualización sincrónica.

Por ejemplo, la API `onbeforeprint` del navegador permite cambiar la página inmediatamente antes de que se abra el diálogo de impresión. Esto es útil para aplicar estilos de impresión personalizados que permiten que el documento se muestre mejor para la impresión.

En el ejemplo siguiente, se utiliza `flushSync` dentro de la función _callback_ `onbeforeprint` para “vaciar” inmediatamente el estado de React en el DOM. Al hacer esto, cuando el diálogo de impresión se abre, el estado se ha actualizado en `isPrinting` a “yes”:

Sin `flushSync`, el diálogo de impresión mostrará `isPrinting` como “no”. Esto se debe a que React procesa las actualizaciones de forma asíncrona y el diálogo de impresión se muestra antes de que se actualice el estado.

### Atención

`flushSync` puede perjudicar significativamente el rendimiento, y puede forzar inesperadamente que barreras de Suspense pendientes muestren su estado de _fallback_.

La mayoría de las veces, `flushSync` puede evitarse, así que utiliza `flushSync` como último recurso.
