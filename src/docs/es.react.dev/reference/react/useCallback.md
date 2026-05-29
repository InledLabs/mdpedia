---
title: useCallback – React
source: https://es.react.dev/reference/react/useCallback
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useCallback – React

`useCallback` es un Hook de React que te permite almacenar la definición de una función entre renderizados subsecuentes.

```
const cachedFn = useCallback(fn, dependencies)
```

*   [Referencia](#reference)
    *   [`useCallback(fn, dependencias)`](#usecallback)
*   [Uso](#usage)
    *   [Omitir rerenderizados de componentes](#skipping-re-rendering-of-components)
    *   [Actualizar estado desde un callback en caché](#updating-state-from-a-memoized-callback)
    *   [Prevenir que un Efecto se dispare frecuentemente](#preventing-an-effect-from-firing-too-often)
    *   [Optimizar un Hook personalizado](#optimizing-a-custom-hook)
*   [Solución de problemas](#troubleshooting)
    *   [Cada vez que mi componente se renderiza, `useCallback` devuelve una función diferente](#every-time-my-component-renders-usecallback-returns-a-different-function)
    *   [Necesito llamar `useCallback` para cada elemento de una lista dentro de un ciclo, pero no es permitido](#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useCallback(fn, dependencias)`[](#usecallback "Link for this heading")

Llama a `useCallback` en el nivel superior de tu componente guardar en caché entre rerenderizados una definición de una función:

```
import { useCallback } from 'react';export default function ProductPage({ productId, referrer, theme }) {const handleSubmit = useCallback((orderDetails) => {post('/product/' + productId + '/buy', {referrer,orderDetails,});}, [productId, referrer]);
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `fn`: La función que deseas guardar en caché. Puede recibir cualquier argumento y devolver cualquier valor. React devolverá (¡no llamará!) tu función durante el renderizado inicial. En los renderizados subsecuentes, React devolverá la misma función nuevamente si las `dependencias` no han cambiado desde el último renderizado. Si no es así, React devolverá la función que pasaste durante el renderizado actual, y la almacenará en caso de que se necesite reutilizar más adelante. React no llamará a la función. La función se devolverá para que puedas decidir si y cuándo llamarla.
    
*   `dependencias`: La lista de todos los valores reactivos dentro de la función `fn`. Los valores reactivos incluyen props, estado y todas las variables y funciones declaradas directamente dentro del cuerpo de tu componente. Si tu _linter_ está [configurado para React](https://es.react.dev/learn/editor-setup#linting), verificará que cada valor reactivo esté debidamente especificado como una dependencia. La lista de dependencias debe tener un número constante de elementos y estar escrita en línea, de la forma `[dep1, dep2, dep3]`. React comparará cada dependencia con su valor anterior usando el algoritmo de comparación [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
    

#### Devuelve[](#returns "Link for Devuelve ")

En el renderizado inicial, `useCallback` devuelve la función `fn` que le has enviado.

Durante los renderizados siguientes, puede devolver una función `fn` ya almacenada desde el último renderizado (si las dependencias no han cambiado), o devolver la función `fn` que hayas enviado durante el renderizado actual.

#### Advertencias[](#caveats "Link for Advertencias ")

*   `useCallback` es un Hook, por lo que solo puedes llamarlo **en el nivel superior de tu componente** o en tus propios Hooks. No puedes llamarlo dentro de un ciclo ni de una condición. Si necesitas hacerlo, debes extraer un nuevo componente y mover el estado a él.
*   React **no descartará la función almacenada a menos que haya una razón específica para hacerlo.** Por ejemplo, en el ambiente de desarrollo, React descarta la caché cuando editas algún archivo de tu componente. Tanto en desarrollo como en producción, React descartará la caché si tu componente se suspende durante el montaje inicial. En el futuro, es posible que React agregue más características que aprovechen el descarte de caché —por ejemplo, si React agrega soporte nativo para listas virtuales en el futuro, tendría sentido descartar la caché para los elementos que estén fuera de la vista de la tabla virtualizada. Esto debería cumplir con tus expectativas si dependes de `useCallback` como una optimización de rendimiento. De lo contrario, una [variable de estado](https://es.react.dev/reference/react/useState#im-trying-to-set-state-to-a-function-but-it-gets-called-instead) o una [referencia](https://es.react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents) podrían ser más apropiadas.

* * *

## Uso[](#usage "Link for Uso ")

### Omitir rerenderizados de componentes[](#skipping-re-rendering-of-components "Link for Omitir rerenderizados de componentes ")

Cuando optimizas el rendimiento del renderizado, a veces necesitarás almacenar en caché las funciones que pasas a los componentes hijos. Veamos primero la sintaxis para hacerlo y luego veamos en qué casos es útil.

Para almacenar una función entre rerenderizados de tu componente, envuelve su definición en el Hook `useCallback`:

```
import { useCallback } from 'react';function ProductPage({ productId, referrer, theme }) {const handleSubmit = useCallback((orderDetails) => {post('/product/' + productId + '/buy', {referrer,orderDetails,});}, [productId, referrer]);// ...
```

Debes enviar dos elementos a `useCallback`:

1.  La definición de la función que quieres almacenar en caché entre rerenderizados.
2.  Una lista de dependencias que incluya cada valor dentro de tu componente que se usa dentro de tu función.

En el primer renderizado, la función devuelta por `useCallback` será la función que pasaste.

En los siguientes renderizados, React comparará las dependencias con aquellas que pasaste en el renderizado anterior. Si ninguna de las dependencias ha cambiado (comparadas con [`Object.is`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), `useCallback` devolverá la misma función que antes. De lo contrario, `useCallback` devolverá la función que pasaste en _este_ renderizado.

En otras palabras, `useCallback` almacena una función entre renderizados subsecuentes hasta que sus dependencias cambien.

**Vamos a ver un ejemplo para entender cuándo esto es útil.**

Supongamos que estás pasando una función `handleSubmit` desde `ProductPage` hacia el componente `ShippingForm`:

```
function ProductPage({ productId, referrer, theme }) {// ...return (<div className={theme}><ShippingForm onSubmit={handleSubmit} /></div>);
```

Notarás que cambiar la propiedad `theme` congela la aplicación por un momento, pero si pruebas eliminar `<ShippingForm />` de tu JSX, se siente rápido. Esto te dice que vale la pena intentar optimizar el componente `ShippingForm`.

**Por defecto, cuando un componente se renderiza nuevamente, React renderiza recursivamente a todos sus hijos.** Esto es porque, cuando `ProductPage` se renderiza nuevamente con un `theme` diferente, el componente `ShippingForm` _también_ se renderiza nuevamente. Esto está bien para componentes que no requieren mucho cálculo para renderizarse nuevamente. Pero si has verificado que un renderizado es lento, puedes decirle a `ShippingForm` que omita el rerenderizado cuando sus props son las mismas que en el último renderizado, envolviéndolo en [`memo`:](https://es.react.dev/reference/react/memo)

```
import { memo } from 'react';const ShippingForm = memo(function ShippingForm({ onSubmit }) {// ...});
```

**Con este cambio, `ShippingForm` omitirá el rerenderizado si todas las props son las _mismas_ que en el último renderizado.** Acá es donde el almacenamiento en caché de una función se vuelve importante. Imagina que definiste `handleSubmit` sin `useCallback`:

```
function ProductPage({ productId, referrer, theme }) {// Cada vez que el tema cambie, esta será una función diferente...function handleSubmit(orderDetails) {post('/product/' + productId + '/buy', {referrer,orderDetails,});}return (<div className={theme}>{/* ... así las props de ShippingForm nunca serán iguales, y cada vez se renderizará nuevamente */}<ShippingForm onSubmit={handleSubmit} /></div>);}
```

**En JavaScript, la expresión `function () {}` o `() => {}` siempre crea una función _diferente_,** similar a como el objeto literal `{}` siempre crea un nuevo objeto. Normalmente, esto no sería un problema, pero en este caso significa que las props de `ShippingForm` nunca serán las mismas, y tu optimización con [`memo`](https://es.react.dev/reference/react/memo) no funcionará. Aquí es donde `useCallback` se vuelve útil:

```
function ProductPage({ productId, referrer, theme }) {// Dile a React que almacene tu función entre rerenderizados...const handleSubmit = useCallback((orderDetails) => {post('/product/' + productId + '/buy', {referrer,orderDetails,});}, [productId, referrer]); // ...siempre y cuando estas dependencias no cambien...return (<div className={theme}>{/* ...ShippingForm recibirá las mismas props y omitirá el rerenderizado */}<ShippingForm onSubmit={handleSubmit} /></div>);}
```

**Al envolver `handleSubmit` en `useCallback`, te aseguras de que sea la _misma_ función entre los renderizados subsecuentes** (hasta que las dependencias cambien). No _deberías_ envolver una función en `useCallback` a menos de que lo hagas por alguna razón específica. En este ejemplo, la razón por la que pasamos `handleSubmit` a un componente envuelto en [`memo`](https://es.react.dev/reference/react/memo) es que esto le permite omitir el rerenderizado. Existen otras razones por las que podrías necesitar `useCallback` que se describen más adelante en esta página.

### Nota

**Solo deberías pensar en `useCallback` como en una optimización de rendimiento.** Si tu código no funciona sin él, encuentra el problema subyacente y arréglalo primero. Luego puedes agregar `useCallback` para mejorar el rendimiento.

##### Profundizar

Ocasionalmente verás [`useMemo`](https://es.react.dev/reference/react/useMemo) junto a `useCallback`. Ambos son útiles cuando deseas optimizar un componente hijo. Te permiten [memoizar](https://es.wikipedia.org/wiki/Memoizaci%C3%B3n) (o, en otras palabras, guardar en caché) aquello que estás enviando:

```
import { useMemo, useCallback } from 'react';function ProductPage({ productId, referrer }) {const product = useData('/product/' + productId);const requirements = useMemo(() => { // Llama a la función y almacena su resultadoreturn computeRequirements(product);}, [product]);const handleSubmit = useCallback((orderDetails) => { // Almacena la función como talpost('/product/' + productId + '/buy', {referrer,orderDetails,});}, [productId, referrer]);return (<div className={theme}><ShippingForm requirements={requirements} onSubmit={handleSubmit} /></div>);}
```

La diferencia está en _qué_ te permiten almacenar:

*   **[`useMemo`](https://es.react.dev/reference/react/useMemo) almacena el _resultado_ de tu función.** En este ejemplo, se almacena el resultado de `computeRequirements(product)` para que no cambie a menos que `product` cambie. Esto permite enviar el objeto `requirements` sin rerenderizar `ShippingForm` innecesariamente. Cuando realmente sea necesario, React llamará a la función durante el renderizado para calcular su resultado.
*   **`useCallback` almacena _la función en sí._** A diferencia de `useMemo`, no llama a la función recibida. En su lugar, almacena la función que proporcionaste para que `handleSubmit` _en sí_ no cambie a menos que `productId` o `referrer` cambien. Esto permite enviar la función `handleSubmit` sin rerenderizar `ShippingForm` innecesariamente. Tu código no se llamará hasta que el usuario envíe el formulario.

Si ya estás familiarizado con [`useMemo`](https://es.react.dev/reference/react/useMemo), tal vez te sea útil ver `useCallback` como esto:

```
// Implementación simplificada (dentro de React)function useCallback(fn, dependencies) {return useMemo(() => fn, dependencies);}
```

[Lee más sobre la diferencia entre `useMemo` y `useCallback`.](https://es.react.dev/reference/react/useMemo#memoizing-a-function)

##### Profundizar

#### ¿Deberías siempre usar useCallback?[](#should-you-add-usecallback-everywhere "Link for ¿Deberías siempre usar useCallback? ")

Si tu aplicación es similar a este sitio, y la mayoría de las interacciones son bastas (como reemplazar una página o una sección entera), la memoización generalmente es innecesaria. Por otro lado, si tu aplicación es similar a un editor de dibujo, y la mayor parte de sus interacciones son granulares (como mover figuras), entonces la memoización puede ser muy útil.

Almacenar una función con `useCallback` solo es beneficioso en unos pocos casos:

*   Al enviarla como prop al componente envuelto en [`memo`](https://es.react.dev/reference/react/memo). Querrás omitir el renderizado subsecuente si el valor no ha cambiado. La memoización permite que tu componente se renderice nuevamente solo cuando las dependencias no sean las mismas.
*   La función que estás enviando se usa más tarde como una dependencia de algún Hook. Por ejemplo, cuando otra función envuelta en `useCallback` depende de ella, o cuando dependes de dicha función desde [`useEffect.`](https://es.react.dev/reference/react/useEffect)

No existe ningún beneficio en envolver una función en `useCallback` en otros casos. Aunque tampoco afecta negativamente hacerlo, por lo que algunos equipos prefieren no enfocarse en los casos de uso individuales y memoizar todo lo posible. La desventaja de este enfoque es que el código se vuelve menos legible. Por otro lado, no toda la memoización es efectiva: un solo valor que “siempre es nuevo” es suficiente para romper la memoización de todo el componente.

Observa que `useCallback` no evita _crear_ la función. Siempre estás creando una nueva función (¡y eso está bien!), pero React lo ignora y devuelve la función en caché si las dependencias no han cambiado.

**En la práctica, puedes hacer que mucha memoización sea innecesaria siguiendo unos pocos principios:**

1.  Cuando un componente envuelve visualmente a otros componentes, permite que [acepte JSX como hijos.](https://es.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) De esta manera, cuando el componente contenedor actualiza su propio estado, React sabe que sus hijos no necesitan volver a renderizarse.
2.  Utiliza el estado local y no [eleves el estado](https://es.react.dev/learn/sharing-state-between-components) más allá de lo necesario. Por ejemplo, no mantengas estados transitorios —como formularios y si a un elemento se le hace _hover_— en la cima de tu árbol o en una biblioteca de estado global.
3.  Mantén tu [lógica de renderizado pura.](https://es.react.dev/learn/keeping-components-pure) Si rerenderizar un componente genera un problema o produce algún artefacto visual notable, ¡es un error en tu componente! Arregla el error en lugar de agregar memoización.
4.  Evita [Efectos innecesarios que actualizan el estado.](https://es.react.dev/learn/you-might-not-need-an-effect) La mayor parte de los problemas de rendimiento en aplicaciones de React son causados por cadenas de actualizaciones originadas en Efectos que provocan que tus componentes se rendericen una y otra vez.
5.  Intenta [eliminar dependencias innecesarias de tus Efectos.](https://es.react.dev/learn/removing-effect-dependencies) Por ejemplo, en lugar de utilizar la memoización, a menudo es más simple mover algún objeto o función dentro de un Efecto o fuera del componente.

Si una interacción específica aún se siente lenta, [utiliza el perfilador de las Herramientas de Desarrollo de React](https://es.legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) para ver qué componentes se beneficiarían más de la memoización, para agregarla donde sea necesario. Estos principios hacen que tus componentes sean más fáciles de depurar y entender, por lo que es bueno seguirlos en cualquier caso. A largo plazo, estamos investigando [el uso de la memoización granular automática](https://www.youtube.com/watch?v=lGEMwh32soc) para resolver esto de una vez por todas.

* * *

### Actualizar estado desde un callback en caché[](#updating-state-from-a-memoized-callback "Link for Actualizar estado desde un callback en caché ")

En ocasiones, podrías necesitar actualizar el estado basado en su valor anterior desde un callback en caché.

La función `handleAddTodo` especifica `todos` como una dependencia, porque calcula los siguientes _todos_ a partir de ella:

```
function TodoList() {const [todos, setTodos] = useState([]);const handleAddTodo = useCallback((text) => {const newTodo = { id: nextId++, text };setTodos([...todos, newTodo]);}, [todos]);// ...
```

Por lo general es mejor que tus funciones almacenadas tengan el menor número de dependencias posibles. Cuando lees un estado solamente para calcular un estado subsecuente, puedes remover esa dependencia al enviar una [función de actualización](https://es.react.dev/reference/react/useState#updating-state-based-on-the-previous-state) en su lugar:

```
function TodoList() {const [todos, setTodos] = useState([]);const handleAddTodo = useCallback((text) => {const newTodo = { id: nextId++, text };setTodos(todos => [...todos, newTodo]);}, []); // ✅ No se necesita la dependencia `todos`// ...
```

Aquí, en lugar de hacer que `todos` sea una dependencia de tu función y leerla allí, envías a React una instrucción sobre _cómo_ actualizar el estado (`todos => [...todos, newTodo]`). [Lee más sobre las funciones de actualización.](https://es.react.dev/reference/react/useState#updating-state-based-on-the-previous-state)

* * *

### Prevenir que un Efecto se dispare frecuentemente[](#preventing-an-effect-from-firing-too-often "Link for Prevenir que un Efecto se dispare frecuentemente ")

En ocasiones, es posible que desees llamar a una función desde un [Efecto:](https://es.react.dev/learn/synchronizing-with-effects)

```
function ChatRoom({ roomId }) {const [message, setMessage] = useState('');function createOptions() {return {serverUrl: 'https://localhost:1234',roomId: roomId};}useEffect(() => {const options = createOptions();const connection = createConnection(options);connection.connect();// ...
```

Esto genera un problema. [Todo valor reactivo debe ser declarado como una dependencia de tu Efecto.](https://es.react.dev/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) Sin embargo, si declaras `createOptions` como una dependencia, esto provocará que tu Efecto se reconecte constantemente al chat:

```
useEffect(() => {const options = createOptions();const connection = createConnection(options);connection.connect();return () => connection.disconnect();}, [createOptions]); // 🔴 Problema: Esta dependencia cambia en cada renderizado// ...
```

Para solventar esto, puedes envolver la función que necesitas llamar desde un Efecto con `useCallback`:

```
function ChatRoom({ roomId }) {const [message, setMessage] = useState('');const createOptions = useCallback(() => {return {serverUrl: 'https://localhost:1234',roomId: roomId};}, [roomId]); // ✅ Solo cambia cuando roomId cambiauseEffect(() => {const options = createOptions();const connection = createConnection(options);connection.connect();return () => connection.disconnect();}, [createOptions]); // ✅ Solo cambia cuando createOptions cambia// ...
```

Esto asegura que la función `createOptions` sea la misma entre renderizados subsecuentes, siempre que `roomId` sea el mismo. **Sin embargo, es aún mejor eliminar la necesidad de una dependencia de la función.** Mueve tu función _dentro_ del Efecto:

```
function ChatRoom({ roomId }) {const [message, setMessage] = useState('');useEffect(() => {function createOptions() { // ✅ No es necesario usar useCallback ni dependencias de funciónreturn {serverUrl: 'https://localhost:1234',roomId: roomId};}const options = createOptions();const connection = createConnection(options);connection.connect();return () => connection.disconnect();}, [roomId]); // ✅ Solo cambia cuando roomId cambia// ...
```

Ahora tu código es mucho más simple y no requiere de `useCallback`. [Aprende más sobre eliminar dependencias de Efectos.](https://es.react.dev/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)

* * *

### Optimizar un Hook personalizado[](#optimizing-a-custom-hook "Link for Optimizar un Hook personalizado ")

Si estás escribiendo un [Hook personalizado,](https://es.react.dev/learn/reusing-logic-with-custom-hooks) es recomendable envolver cualquier función que el Hook devuelva con `useCallback`:

```
function useRouter() {const { dispatch } = useContext(RouterStateContext);const navigate = useCallback((url) => {dispatch({ type: 'navigate', url });}, [dispatch]);const goBack = useCallback(() => {dispatch({ type: 'back' });}, [dispatch]);return {navigate,goBack,};}
```

Esto asegura que los consumidores de tu Hook puedan optimizar su propio código cuando sea necesario.

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### Cada vez que mi componente se renderiza, `useCallback` devuelve una función diferente[](#every-time-my-component-renders-usecallback-returns-a-different-function "Link for this heading")

¡Asegúrate de haber especificado el _array_ de dependencias como un segundo argumento!

Si olvidas el _array_ de dependencias, `useCallback` devolverá una nueva función cada vez:

```
function ProductPage({ productId, referrer }) {const handleSubmit = useCallback((orderDetails) => {post('/product/' + productId + '/buy', {referrer,orderDetails,});}); // 🔴 Devuelve una función cada vez: no existe un array de dependencias// ...
```

Esta es la versión corregida, enviando el _array_ de dependencias como segundo argumento:

```
function ProductPage({ productId, referrer }) {const handleSubmit = useCallback((orderDetails) => {post('/product/' + productId + '/buy', {referrer,orderDetails,});}, [productId, referrer]); // ✅ No devuelve una nueva función innecesariamente// ...
```

Si esto no ayuda, entonces el problema es que al menos una de tus dependencias es diferente al renderizado anterior. Puedes depurar este problema manualmente registrando tus dependencias en la consola:

```
const handleSubmit = useCallback((orderDetails) => {// ..}, [productId, referrer]);console.log([productId, referrer]);
```

Después, puedes hacer click derecho en los _arrays_ de diferentes renderizados en la consola y seleccionar la opción de “Guardar como variable global” para ambos. Suponiendo que el primero se haya guardado con el nombre `temp1` y el segundo con el nombre `temp2`, puedes usar la consola del navegador para verificar si cada dependencia en ambos _arrays_ es la misma:

```
Object.is(temp1[0], temp2[0]); // ¿Es la primera dependencia la misma entre los arrays?Object.is(temp1[1], temp2[1]); // ¿Es la segunda dependencia la misma entre los arrays?Object.is(temp1[2], temp2[2]); // ... y así consecutivamente para cada dependencia ...
```

Cuando encuentres cuál dependencia está rompiendo la memoización, puedes encontrar una manera de eliminarla o [memoízala también.](https://es.react.dev/reference/react/useMemo#memoizing-a-dependency-of-another-hook)

* * *

### Necesito llamar `useCallback` para cada elemento de una lista dentro de un ciclo, pero no es permitido[](#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed "Link for this heading")

Suponiendo que el componente `Chart` está envuelto en [`memo`](https://es.react.dev/reference/react/memo). Deseas omitir el rerenderizado en cada `Chart` en la lista cuando el componente `ReportList` se rerenderiza. Sin embargo, no puedes llamar a `useCallback` dentro de un ciclo:

```
function ReportList({ items }) {return (<article>{items.map(item => {// 🔴 No puedes llamar a useCallback dentro de un ciclo así:const handleClick = useCallback(() => {sendReport(item)}, [item]);return (<figure key={item.id}><Chart onClick={handleClick} /></figure>);})}</article>);}
```

En su lugar, extrae un componente para un elemento individual, y coloca `useCallback` allí:

```
function ReportList({ items }) {return (<article>{items.map(item =><Report key={item.id} item={item} />)}</article>);}function Report({ item }) {// ✅ Llama a useCallback en el nivel superior:const handleClick = useCallback(() => {sendReport(item)}, [item]);return (<figure><Chart onClick={handleClick} /></figure>);}
```

De forma alternativa, podrías eliminar `useCallback` en el último fragmento y envolver `Report` con [`memo`](https://es.react.dev/reference/react/memo) en su lugar. Si la prop `item` no cambia, `Report` omitirá el rerenderizado, por lo que `Chart` también lo hará:

```
function ReportList({ items }) {// ...}const Report = memo(function Report({ item }) {function handleClick() {sendReport(item);}return (<figure><Chart onClick={handleClick} /></figure>);});
```
