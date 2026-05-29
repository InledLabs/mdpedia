---
title: Descripción General de la Referencia de React – React
source: https://es.react.dev/reference/react
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../_index.md).

---

# Descripción General de la Referencia de React – React

Esta sección ofrece documentación de referencia detallada para trabajar con React. Para una introducción a React, por favor visita la sección de [Aprende](https://es.react.dev/learn).

La documentación de referencia de React está dividida en subsecciones funcionales:

## React[](#react "Link for React ")

Funcionalidades programáticas de React:

*   [Hooks](https://es.react.dev/reference/react/hooks) - Usa diferentes funcionalidades de React desde tus componentes.
*   [Componentes](https://es.react.dev/reference/react/components) - Componentes integrados que puedes usar en tu JSX.
*   [APIs](https://es.react.dev/reference/react/apis) - APIs útiles para definir componentes.
*   [Directivas](https://es.react.dev/reference/rsc/directives) - Proporciona instrucciones a los empaquetadores compatibles con los React Server Components.

## React DOM[](#react-dom "Link for React DOM ")

React-dom contiene funcionalidades que solo son compatibles con aplicaciones web (que se ejecutan en el entorno DOM del navegador). Esta sección se divide en lo siguiente:

*   [Hooks](https://es.react.dev/reference/react-dom/hooks) - Hooks para aplicaciones web que se ejecutan en el entorno DOM del navegador.
*   [Componentes](https://es.react.dev/reference/react-dom/components) - React es compatible con todos los componentes integrados de HTML y SVG del navegador.
*   [APIs](https://es.react.dev/reference/react-dom) - El paquete `react-dom` contiene métodos compatibles únicamente con aplicaciones web.
*   [APIs del cliente](https://es.react.dev/reference/react-dom/client) - Las APIs de `react-dom/client` te permiten renderizar componentes de React en el cliente (en el navegador).
*   [APIs del servidor](https://es.react.dev/reference/react-dom/server) - Las APIs de `react-dom/server` te permiten renderizar componentes de React a HTML en el servidor.

## Reglas de React[](#rules-of-react "Link for Reglas de React ")

React tiene idioms — o reglas — sobre cómo expresar ciertos patrones de una forma fácil de entender y que permita crear aplicaciones de alta calidad:

*   [Los Componentes y Hooks deben ser puros](https://es.react.dev/reference/rules/components-and-hooks-must-be-pure) – La pureza hace que tu código sea más fácil de entender, depurar y permite que React optimice automáticamente tus componentes y hooks de forma correcta.
*   [React invoca los Componentes y Hooks](https://es.react.dev/reference/rules/react-calls-components-and-hooks) – React se encarga de renderizar los componentes y hooks cuando sea necesario para optimizar la experiencia del usuario.
*   [Reglas de los Hooks](https://es.react.dev/reference/rules/rules-of-hooks) – Los hooks se definen utilizando funciones de JavaScript, pero representan un tipo especial de lógica de interfaz reutilizable con restricciones sobre dónde pueden ser llamados.

## APIs Legacy[](#legacy-apis "Link for APIs Legacy ")

*   [APIs Legacy](https://es.react.dev/reference/react/legacy) - Exportadas desde el paquete `react`, pero no se recomienda su uso en código nuevo.
