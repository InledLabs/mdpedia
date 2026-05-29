---
title: preloadModule – React
source: https://es.react.dev/reference/react-dom/preloadModule
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# preloadModule – React

### Nota

[Los frameworks basados en React](https://es.react.dev/learn/start-a-new-react-project) con frecuencia manejan la carga de recursos por ti, por lo que es posible que no necesites llamar a esta API tú mismo. Consulta la documentación de tu framework para más detalles.

`preloadModule` te permite precargar de forma anticipada un módulo ESM que esperas utilizar.

```
preloadModule("https://example.com/module.js", {as: "script"});
```

*   [Referencia](#reference)
    *   [`preloadModule(href, options)`](#preloadmodule)
*   [Uso](#usage)
    *   [Precarga durante el renderizado](#preloading-when-rendering)
    *   [Precarga en un manejador de eventos](#preloading-in-an-event-handler)

* * *

## Referencia[](#reference "Link for Referencia ")

### `preloadModule(href, options)`[](#preloadmodule "Link for this heading")

Para precargar un módulo ESM, llama a la función `preloadModule` de `react-dom`.

```
import { preloadModule } from 'react-dom';function AppRoot() {preloadModule("https://example.com/module.js", {as: "script"});// ...}
```

[Ver más ejemplos abajo.](#usage)

La función `preloadModule` proporciona al navegador una señal de que debería comenzar a descargar el módulo dado, lo cual puede ahorrar tiempo.

#### Parámetros[](#parameters "Link for Parámetros ")

*   `href`: un string. La URL del módulo que deseas descargar.
*   `options`: un objeto. Contiene las siguientes propiedades:
    *   `as`: un string requerido. Debe ser `'script'`.
    *   `crossOrigin`: un string. La [política de CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) a utilizar. Sus valores posibles son `anonymous` y `use-credentials`.
    *   `integrity`: un string. Un hash criptográfico del módulo, para [verificar su autenticidad](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
    *   `nonce`: un string. Un [nonce criptográfico para permitir el módulo](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) cuando se utiliza una Política de Seguridad de Contenido estricta.

#### Devuelve[](#returns "Link for Devuelve ")

`preloadModule` no devuelve nada.

#### Advertencias[](#caveats "Link for Advertencias ")

*   Múltiples llamadas a `preloadModule` con el mismo `href` tienen el mismo efecto que una sola llamada.
*   En el navegador, puedes llamar a `preloadModule` en cualquier situación: mientras renderizas un componente, en un Efecto, en un manejador de eventos, etc.
*   En el renderizado del lado del servidor o al renderizar Componentes de Servidor, `preloadModule` solo tiene efecto si lo llamas mientras renderizas un componente o en un contexto asíncrono que se origina a partir del renderizado de un componente. Cualquier otra llamada será ignorada.

* * *

## Uso[](#usage "Link for Uso ")

### Precarga durante el renderizado[](#preloading-when-rendering "Link for Precarga durante el renderizado ")

Llama a `preloadModule` al renderizar un componente si sabes que el componente o sus hijos utilizarán un módulo específico.

```
import { preloadModule } from 'react-dom';function AppRoot() {preloadModule("https://example.com/module.js", {as: "script"});return ...;}
```

Si deseas que el navegador comience a ejecutar el módulo de inmediato (en lugar de solo descargarlo), usa [`preinitModule`](https://es.react.dev/reference/react-dom/preinitModule) en su lugar. Si deseas cargar un script que no es un módulo ESM, usa [`preload`](https://es.react.dev/reference/react-dom/preload).

### Precarga en un manejador de eventos[](#preloading-in-an-event-handler "Link for Precarga en un manejador de eventos ")

Llama a `preloadModule` en un manejador de eventos antes de hacer la transición a una página o estado donde el módulo será necesario. Esto inicia el proceso antes que si lo llamaras durante el renderizado de la nueva página o estado.

```
import { preloadModule } from 'react-dom';function CallToAction() {const onClick = () => {preloadModule("https://example.com/module.js", {as: "script"});startWizard();}return (<button onClick={onClick}>Start Wizard</button>);}
```
