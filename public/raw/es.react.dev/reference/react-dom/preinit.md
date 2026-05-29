---
title: preinit – React
source: https://es.react.dev/reference/react-dom/preinit
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# preinit – React

### Nota

Los [frameworks basados en React](https://es.react.dev/learn/start-a-new-react-project) frecuentemente manejan la carga de recursos por ti, por lo que es posible que no necesites llamar a esta API tú mismo. Consulta la documentación de tu framework para más detalles.

`preinit` te permite obtener y evaluar anticipadamente una hoja de estilos o un script externo.

```
preinit("https://example.com/script.js", {as: "script"});
```

*   [Referencia](#reference)
    *   [`preinit(href, options)`](#preinit)
*   [Uso](#usage)
    *   [Preinicialización al renderizar](#preiniting-when-rendering)
    *   [Preinicialización en un controlador de eventos](#preiniting-in-an-event-handler)

* * *

## Referencia[](#reference "Link for Referencia ")

### `preinit(href, options)`[](#preinit "Link for this heading")

Para preinicializar un script o una hoja de estilos, llama a la función `preinit` de `react-dom`.

```
import { preinit } from 'react-dom';function AppRoot() {preinit("https://example.com/script.js", {as: "script"});// ...}
```

[Ver más ejemplos a continuación.](#usage)

La función `preinit` proporciona al navegador una sugerencia de que debería comenzar a descargar y ejecutar el recurso dado, lo cual puede ahorrar tiempo. Los scripts que preinicializas con `preinit` se ejecutan cuando terminan de descargarse. Las hojas de estilos que preinicializas se insertan en el documento, lo que hace que entren en efecto de inmediato.

#### Parámetros[](#parameters "Link for Parámetros ")

*   `href`: una cadena. La URL del recurso que deseas descargar y ejecutar.
*   `options`: un objeto. Contiene las siguientes propiedades:
    *   `as`: una cadena requerida. El tipo de recurso. Sus valores posibles son `script` y `style`.
    *   `precedence`: una cadena. Requerida con hojas de estilos. Indica dónde insertar la hoja de estilos en relación con otras. Las hojas de estilos con mayor precedencia pueden anular las de menor precedencia. Los valores posibles son `reset`, `low`, `medium`, `high`.
    *   `crossOrigin`: una cadena. La [política CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) a utilizar. Sus valores posibles son `anonymous` y `use-credentials`. Es requerida cuando `as` está configurado como `"fetch"`.
    *   `integrity`: una cadena. Un hash criptográfico del recurso, para [verificar su autenticidad](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
    *   `nonce`: una cadena. Un [nonce criptográfico para permitir el recurso](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) al usar una Política de Seguridad de Contenido estricta.
    *   `fetchPriority`: una cadena. Sugiere una prioridad relativa para obtener el recurso. Los valores posibles son `auto` (el predeterminado), `high` y `low`.

#### Devuelve[](#returns "Link for Devuelve ")

`preinit` no devuelve nada.

#### Advertencias[](#caveats "Link for Advertencias ")

*   Múltiples llamadas a `preinit` con el mismo `href` tienen el mismo efecto que una sola llamada.
*   En el navegador, puedes llamar a `preinit` en cualquier situación: mientras renderizas un componente, en un Efecto, en un controlador de eventos, y así sucesivamente.
*   En el renderizado del lado del servidor o al renderizar Componentes de Servidor, `preinit` solo tiene efecto si lo llamas mientras renderizas un componente o en un contexto asíncrono que se origina al renderizar un componente. Cualquier otra llamada será ignorada.

* * *

## Uso[](#usage "Link for Uso ")

### Preinicialización al renderizar[](#preiniting-when-rendering "Link for Preinicialización al renderizar ")

Llama a `preinit` al renderizar un componente si sabes que él o sus hijos usarán un recurso específico, y estás de acuerdo con que el recurso se evalúe y entre en efecto inmediatamente al descargarse.

#### 

Ejemplo

1

de

2:

Preinicializar un script externo[](#preiniting-an-external-script "Link for this heading")

```
import { preinit } from 'react-dom';function AppRoot() {preinit("https://example.com/script.js", {as: "script"});return ...;}
```

Si quieres que el navegador descargue el script pero no lo ejecute de inmediato, usa [`preload`](https://es.react.dev/reference/react-dom/preload) en su lugar. Si quieres cargar un módulo ESM, usa [`preinitModule`](https://es.react.dev/reference/react-dom/preinitModule).

### Preinicialización en un controlador de eventos[](#preiniting-in-an-event-handler "Link for Preinicialización en un controlador de eventos ")

Llama a `preinit` en un controlador de eventos antes de hacer la transición a una página o estado donde se necesitarán recursos externos. Esto inicia el proceso antes que si lo llamas durante el renderizado de la nueva página o estado.

```
import { preinit } from 'react-dom';function CallToAction() {const onClick = () => {preinit("https://example.com/wizardStyles.css", {as: "style"});startWizard();}return (<button onClick={onClick}>Start Wizard</button>);}
```
