---
title: Hooks integrados en React  – React
source: https://es.react.dev/reference/react/hooks
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# Hooks integrados en React  – React

Los _Hooks_ te dejan usar diferentes características de React de sus componentes. Puedes también usar los Hooks integrados o combinarlos para crear el tuyo. Esta página enumera todos los Hooks integrados en React.

* * *

## Hooks de estado[](#state-hooks "Link for Hooks de estado ")

El _Estado_ permite a un componente [“recordar” información como el input del usuario.](https://es.react.dev/learn/state-a-components-memory) Por ejemplo, un componente de formulario puede usar el estado para almacenar el valor de entrada, mientras que un componente de galería de imágenes puede usar el estado para almacenar el indicé de la imagen seleccionada.

Para añadir un estado a un componente, usa de estos Hooks:

*   [`useState`](https://es.react.dev/reference/react/useState) declara un estado variable que puedes actualizar directamente.
*   [`useReducer`](https://es.react.dev/reference/react/useReducer) declara un estado variable con la lógica de actualización dentro de una [función reductora.](https://es.react.dev/learn/extracting-state-logic-into-a-reducer)

```
function ImageGallery() {const [index, setIndex] = useState(0);// ...
```

* * *

## Hooks de Contexto[](#context-hooks "Link for Hooks de Contexto ")

El _Contexto_ permite a un componente [recibir información desde un componente padre distante sin pasarsela como props.](https://es.react.dev/learn/passing-props-to-a-component) Por ejemplo, tu componente en el nivel más alto de tu aplicación puede pasar el tema de interfaz de usuario actual a todos los componentes debajo, no importa que tan profundo estén.

*   [`useContext`](https://es.react.dev/reference/react/useContext) lee y se suscribe a un Contexto.

```
function Button() {const theme = useContext(ThemeContext);// ...
```

* * *

## Hooks Ref[](#ref-hooks "Link for Hooks Ref ")

Los _Refs_ permiten a un componente [conserva algo de información que no es usada para el renderizado,](https://es.react.dev/learn/referencing-values-with-refs) como un nodo del DOM or el ID de un timeout. A diferencia del estado, actualizar un ref no no vuelve a renderizar tu componente. Los refs son una “puerta de escape” del paradigma de React. Son útiles cuando necesitas trabajar con sistemas que no son de React, como son las APIs integradas del navegador.

*   [`useRef`](https://es.react.dev/reference/react/useRef) declara un ref. Puedes conservar cualquier valor en él, pero más frecuentemente se utiliza para conservar un node del DOM.
*   [`useImperativeHandle`](https://es.react.dev/reference/react/useImperativeHandle) te permite personalizar el ref expuesto por tu componente. Es raramente utilizado.

```
function Form() {const inputRef = useRef(null);// ...
```

* * *

## Hooks de Efecto[](#effect-hooks "Link for Hooks de Efecto ")

Los _Efectos_ permiten a un componente [conectarse y sincronizarse con sistemas externos.](https://es.react.dev/learn/synchronizing-with-effects) Esto incluye lidiar con la red, el DOM del navegador, animaciones, widgets escritos usando una biblioteca UI distinta, y otro código que no sea de React.

*   [`useEffect`](https://es.react.dev/reference/react/useEffect) conecta un componente a un sistema externo.

```
function ChatRoom({ roomId }) {useEffect(() => {const connection = createConnection(roomId);connection.connect();return () => connection.disconnect();}, [roomId]);// ...
```

Los Efectos son una “puerta de escape” del paradigma de React. No utilices los Efectos para orquestar el flujo de los datos de tu aplicación. Si no estas interactuando con un sistema externo, [puede que no necesites un Efecto.](https://es.react.dev/learn/you-might-not-need-an-effect)

Hay dos variaciones raramente usadas de `useEffect` con diferencias en la sincronización:

*   [`useLayoutEffect`](https://es.react.dev/reference/react/useLayoutEffect) se activa antes de que el navegador vuelve a pintar la pantalla. Puedes medir la maquetación aquí.
*   [`useInsertionEffect`](https://es.react.dev/reference/react/useInsertionEffect) se activa antes de que React realice cambios al DOM. Las bibliotecas pueden insertar CSS dinámico aquí.

* * *

## Hooks de rendimiento[](#performance-hooks "Link for Hooks de rendimiento ")

Una forma común de optimizar el rendimiento del re-renderizado es saltarse el trabajo innecesario. Por ejemplo, puedes decirle a React que reutilice cálculos que están en la caché o que se salte un re-renderizado si los datos no han cambiado desde el renderizado anterior.

Para saltarse cálculos y re-renderizados innecesarios, usa uno de estos Hooks:

*   [`useMemo`](https://es.react.dev/reference/react/useMemo) te permite almacenar en caché el resultado de un cálculo costoso.
*   [`useCallback`](https://es.react.dev/reference/react/useCallback) te permite almacenar en caché la definición de una función antes de pasarla a un componente optimizado.

```
function TodoList({ todos, tab, theme }) {const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);// ...}
```

A veces, no podrás saltarte re-renderizados porque la pantalla realmente necesita actualizarse. En ese caso, puede mejorar el rendimiento separando actualizaciones bloqueantes que deben ser síncronas (como escribir en un input) desde actualizaciones no bloqueantes las cuales no necesitan bloquear la interfaz de usuario (como actualizar una gráfica).

Para priorizar el renderizado, usa uno de estos Hooks:

*   [`useTransition`](https://es.react.dev/reference/react/useTransition) te permite marcar un estado de transición como no bloqueante y permite a otras actualizaciones interrumpirlo.
*   [`useDeferredValue`](https://es.react.dev/reference/react/useDeferredValue) te permite aplazar la actualización de una parte no critica de la UI y permite a las otras partes actualizarse primero.

* * *

## Otros Hooks[](#other-hooks "Link for Otros Hooks ")

Estos Hooks son mayormente útiles para los autores de bibliotecas y no son comúnmente utilizados para el código de una aplicación.

*   [`useDebugValue`](https://es.react.dev/reference/react/useDebugValue) te permite personalizar la etiqueta que las herramientas de desarrollo de muestran para tu Hook personalizado.
*   [`useId`](https://es.react.dev/reference/react/useId) permite a un componente se asocie a sí mismo un identificador único. Típicamente es usado con APIs de accesibilidad.
*   [`useSyncExternalStore`](https://es.react.dev/reference/react/useSyncExternalStore) permite a un componente suscribirse a una store externo.

*   [`useActionState`](https://es.react.dev/reference/react/useActionState) allows you to manage state of actions.

* * *

## Tus propios Hooks[](#your-own-hooks "Link for Tus propios Hooks ")

Puedes también [definir tus propios Hooks personalizados](https://es.react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component) como funciones de JavaScript.
