---
title: useReducer – React
source: https://es.react.dev/reference/react/useReducer
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useReducer – React

`useReducer` es un Hook de React que te permite agregar un [reducer](https://es.react.dev/learn/extracting-state-logic-into-a-reducer) a tu componente.

```
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

*   [Referencia](#reference)
    *   [`useReducer(reducer, initialArg, init?)`](#usereducer)
    *   [función `dispatch`](#dispatch)
*   [Uso](#usage)
    *   [Agregar un reducer a un componente](#adding-a-reducer-to-a-component)
    *   [Escribir la función reducer](#writing-the-reducer-function)
    *   [Evitar recrear el estado inicial](#evitar-recrear-el-estado-inicial)
*   [Solución de problemas](#troubleshooting)
    *   [He despachado una acción, pero el registro me da el valor de estado antiguo](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value)
    *   [He despachado una acción, pero la pantalla no se actualiza](#ive-dispatched-an-action-but-the-screen-doesnt-update)
    *   [Una parte del estado de mi reductor se vuelve undefined después de despachar](#a-part-of-my-reducer-state-becomes-undefined-after-dispatching)
    *   [Todo el estado de mi reducer se vuelve undefined después de despachar](#my-entire-reducer-state-becomes-undefined-after-dispatching)
    *   [Recibo un error: “Too many re-renders”](#im-getting-an-error-too-many-re-renders)
    *   [Mi función reductora o inicializadora se ejecuta dos veces](#my-reducer-or-initializer-function-runs-twice)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useReducer(reducer, initialArg, init?)`[](#usereducer "Link for this heading")

Llama a `useReducer` en el nivel superior de tu componente para gestionar su estado con un [reducer.](https://es.react.dev/learn/extracting-state-logic-into-a-reducer)

```
import { useReducer } from 'react';function reducer(state, action) {// ...}function MyComponent() {const [state, dispatch] = useReducer(reducer, { age: 42 });// ...
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `reducer`: La función reductora que debe devolver el estado inicial. Debe ser pura, debe tomar el estado y la acción como argumentos, y debe devolver el siguiente estado. El estado y la acción pueden ser de cualquier tipo.
*   `initialArg`: El valor a partir del cual se calcula el estado inicial. Puede ser un valor de cualquier tipo. Cómo se calcula el estado inicial depende del siguiente argumento `init`. **opcional** `init`: La función inicializadora que especifica cómo se calcula el estado inicial. Si no se especifica, el estado inicial se establece en `initialArg`. En caso contrario, el estado inicial es el resultado de llamar a `init(initialArg)`.

#### Devuelve[](#returns "Link for Devuelve ")

`useReducer` devuelve un array con exactamente dos valores:

1.  El estado actual. Durante el primer renderizado, se establece a `init(initialArg)` o `initialArg` (si no hay `init`).
2.  La [función `dispatch`](#dispatch) que permite actualizar el estado a un valor diferente y activar una nueva renderización.

#### Advertencias[](#caveats "Link for Advertencias ")

*   `useReducer` es un Hook, por lo que sólo puedes llamarlo **en el nivel superior de tu componente** o en tus propios Hooks. No puedes llamarlo dentro de bucles o condiciones. Si lo necesitas, extrae un nuevo componente y mueve el estado a él.
*   La función `dispatch` tiene una identidad estable, por lo que a menudo verás que se omite de las dependencias de los Efectos, pero que se incluya no causa que el Efecto se dispare. Si el _linter_ te permite omitir una dependencia sin errores, es seguro hacerlo. [Aprende más sobre eliminar dependencias de los Efectos.](https://es.react.dev/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)
*   En Modo Estricto, React **llamará a tu reducer e inicializador dos veces** para [ayudarte a encontrar impurezas accidentales](#my-reducer-or-initializer-function-runs-twice) Este es un comportamiento sólo de desarrollo y no afecta a la producción. Si tu reducer e inicializador son puros (como deberían ser), esto no debería afectar tu lógica. El resultado de una de las llamadas se ignora.

* * *

### función `dispatch`[](#dispatch "Link for this heading")

La función `dispatch` devuelta por `useReducer` te permite actualizar el estado a un valor diferente y activar una nueva renderización. Es necesario pasar la acción como único argumento a la función `dispatch`:

```
const [state, dispatch] = useReducer(reducer, { age: 42 });function handleClick() {dispatch({ type: 'incremented_age' });// ...
```

React establecerá el siguiente estado al resultado de llamar a la función `reducer` que has proporcionado con el `state` actual y la acción que has pasado a `dispatch`.

#### Parámetros[](#dispatch-parameters "Link for Parámetros ")

*   `action`: La acción realizada por el usuario. Puede ser un valor de cualquier tipo. Por convención, una acción suele ser un objeto con una propiedad `type` que lo identifica y, opcionalmente, otras propiedades con información adicional.

#### Devuelve[](#dispatch-returns "Link for Devuelve ")

Las funciones `dispatch` no tienen un valor de devolución.

#### Advertencias[](#setstate-caveats "Link for Advertencias ")

*   La función `dispatch` **sólo actualiza la variable de estado para el _siguiente_ renderizado**. Si lees la variable de estado después de llamar a la función `dispatch`, [seguirás obteniendo el valor antiguo](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value) que estaba en la pantalla antes de la llamada.
    
*   Si el nuevo valor que proporcionas es idéntico al `state` actual, determinado por una comparación [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is), React **saltará el renderizado del componente y sus hijos.** Esto es una optimización. React aún puede necesitar llamar a tu componente antes de ignorar el resultado, pero no debería afectar a tu código.
    
*   React [agrupa las actualizaciones de estado.](https://es.react.dev/learn/queueing-a-series-of-state-updates) Actualiza la pantalla **después de que todos los controladores de eventos se hayan ejecutado** y hayan llamado a sus funciones `set`. Esto evita múltiples rerenderizados durante un único evento. En el raro caso de que necesites forzar a React a actualizar la pantalla antes, por ejemplo para acceder al DOM, puedes usar [`flushSync`.](https://es.react.dev/reference/react-dom/flushSync)
    

* * *

## Uso[](#usage "Link for Uso ")

### Agregar un reducer a un componente[](#adding-a-reducer-to-a-component "Link for Agregar un reducer a un componente ")

Invoca `useReducer` en la parte superior de tu componente para manejar el estado con un [reducer.](https://es.react.dev/learn/extracting-state-logic-into-a-reducer)

```
import { useReducer } from 'react';function reducer(state, action) {// ...}function MyComponent() {const [state, dispatch] = useReducer(reducer, { age: 42 });// ...
```

`useReducer` devuelve un array con exactamente dos elementos:

1.  El estado actual de esta variable de estado, inicialmente asignado al estado inicial que proporcionaste.
2.  La función `dispatch` que te permite cambiarlo en respuesta a la interacción.

Para actualizar lo que aparece en pantalla, llama a `dispatch` con un objeto que representa lo que hizo el usuario, llamado _acción_:

```
function handleClick() {dispatch({ type: 'incremented_age' });}
```

React pasará el estado actual y la acción a tu función reducer. Tu reducer calculará y devolverá el siguiente estado. React almacenará ese siguiente estado, renderizará tu componente con él y actualizará la UI.

`useReducer` es muy similar a [`useState`](https://es.react.dev/reference/react/useState), pero te permite mover la lógica de actualización de estado de los controladores de eventos a una única función fuera de tu componente. Más información sobre [elegir entre `useState` y `useReducer`.](https://es.react.dev/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer)

* * *

### Escribir la función reducer[](#writing-the-reducer-function "Link for Escribir la función reducer ")

Una función reducer se declara así:

```
function reducer(state, action) {// ...}
```

Luego hay que completar el código que calculará y devolverá el siguiente estado. Por convención, es común escribirlo como una [declaración `switch`.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) Para cada `case` en el `switch`, calcula y devuelve un estado siguiente.

```
function reducer(state, action) {switch (action.type) {case 'incremented_age': {return {name: state.name,age: state.age + 1};}case 'changed_name': {return {name: action.nextName,age: state.age};}}throw Error('Unknown action: ' + action.type);}
```

Las acciones pueden tener cualquier forma. Por convención, es común pasar objetos con una propiedad `type` que identifica la acción. Debe incluir la información mínima necesaria que el reducer necesita para calcular el siguiente estado.

```
function Form() {const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });function handleButtonClick() {dispatch({ type: 'incremented_age' });}function handleInputChange(e) {dispatch({type: 'changed_name',nextName: e.target.value});}// ...
```

Los nombres de los tipos de acción son locales a tu componente. [Cada acción describe una única interacción, aunque provoque múltiples cambios en los datos.](https://es.react.dev/learn/extracting-state-logic-into-a-reducer#writing-reducers-well) La forma del estado es arbitraria, pero normalmente será un objeto o un array.

Lee [extrayendo lógica de estado en un reducer](https://es.react.dev/learn/extracting-state-logic-into-a-reducer) para saber más.

### Atención

El estado es de sólo lectura. No modifiques ningún objeto o arrays del estado:

```
function reducer(state, action) {switch (action.type) {case 'incremented_age': {// 🚩 Don't mutate an object in state like this:state.age = state.age + 1;return state;}
```

En su lugar, devuelve siempre nuevos objetos desde tu reducer:

```
function reducer(state, action) {switch (action.type) {case 'incremented_age': {// ✅ Instead, return a new objectreturn {...state,age: state.age + 1};}
```

Lee [actualizar objetos en el estado](https://es.react.dev/learn/updating-objects-in-state) y [actualizar arrays en el estado](https://es.react.dev/learn/updating-arrays-in-state) para saber más.

* * *

### Evitar recrear el estado inicial[](#evitar-recrear-el-estado-inicial "Link for Evitar recrear el estado inicial ")

React guarda el estado inicial una vez y lo ignora en las siguientes renderizaciones.

```
function createInitialState(username) {// ...}function TodoList({ username }) {const [state, dispatch] = useReducer(reducer, createInitialState(username));// ...
```

Aunque el resultado de `createInitialState(username)` sólo se utiliza para el renderizado inicial, sigues llamando a esta función en cada renderizado. Esto puede ser un desperdicio si está creando grandes arrays o realizando cálculos costosos.

Para solucionar esto, puedes **pasarlo como una función _initializer_** a `useReducer` como tercer argumento en su lugar:

```
function createInitialState(username) {// ...}function TodoList({ username }) {const [state, dispatch] = useReducer(reducer, username, createInitialState);// ...
```

Fíjate que estás pasando `createInitialState`, que es la _función en sí_, y no `createInitialState()`, que es el resultado de llamarla. De esta manera, el estado inicial no se vuelve a crear después de la inicialización.

En el ejemplo anterior, `createInitialState` toma un argumento `username`. Si tu inicializador no necesita ninguna información para calcular el estado inicial, puedes pasar `null` como segundo argumento a `useReducer`.

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### He despachado una acción, pero el registro me da el valor de estado antiguo[](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value "Link for He despachado una acción, pero el registro me da el valor de estado antiguo ")

Llamar a la función `dispatch` **no cambia el estado del código en ejecución**:

```
function handleClick() {console.log(state.age);  // 42dispatch({ type: 'incremented_age' }); // Request a re-render with 43console.log(state.age);  // Still 42!setTimeout(() => {console.log(state.age); // Also 42!}, 5000);}
```

Esto se debe a que \[el estado se comporta como una instantánea\] (/learn/state-as-a-snapshot) La actualización del estado solicita otra renderización con el nuevo valor de estado, pero no afecta a la variable JavaScript `state` en su controlador de evento ya en ejecución.

Si necesitas averiguar el valor del siguiente estado, puedes calcularlo manualmente llamando tú mismo al reducer:

```
const action = { type: 'incremented_age' };dispatch(action);const nextState = reducer(state, action);console.log(state);     // { age: 42 }console.log(nextState); // { age: 43 }
```

* * *

### He despachado una acción, pero la pantalla no se actualiza[](#ive-dispatched-an-action-but-the-screen-doesnt-update "Link for He despachado una acción, pero la pantalla no se actualiza ")

React **ignorará tu actualización si el siguiente estado es igual al anterior,** determinado por una comparación [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is). Esto suele ocurrir cuando cambias un objeto o un array de estado directamente:

```
function reducer(state, action) {switch (action.type) {case 'incremented_age': {// 🚩 Wrong: mutating existing objectstate.age++;return state;}case 'changed_name': {// 🚩 Wrong: mutating existing objectstate.name = action.nextName;return state;}// ...}}
```

Has mutado un objeto `state` existente y lo has devuelto, por lo que React ha ignorado la actualización. Para solucionarlo, tienes que asegurarte de que siempre estás [actualizando objetos en el estado](https://es.react.dev/learn/updating-objects-in-state) y [actualizando arrays en el estado](https://es.react.dev/learn/updating-arrays-in-state) en lugar de mutarlos:

```
function reducer(state, action) {switch (action.type) {case 'incremented_age': {// ✅ Correct: creating a new objectreturn {...state,age: state.age + 1};}case 'changed_name': {// ✅ Correct: creating a new objectreturn {...state,name: action.nextName};}// ...}}
```

* * *

### Una parte del estado de mi reductor se vuelve undefined después de despachar[](#a-part-of-my-reducer-state-becomes-undefined-after-dispatching "Link for Una parte del estado de mi reductor se vuelve undefined después de despachar ")

Asegúrate de que cada rama `case` **copia todos los campos existentes** al devolver el nuevo estado:

```
function reducer(state, action) {switch (action.type) {case 'incremented_age': {return {...state, // Don't forget this!age: state.age + 1};}// ...
```

Sin el `...state` de arriba, el siguiente estado devuelto sólo contendría el campo `edad` y nada más.

* * *

### Todo el estado de mi reducer se vuelve undefined después de despachar[](#my-entire-reducer-state-becomes-undefined-after-dispatching "Link for Todo el estado de mi reducer se vuelve undefined después de despachar ")

Si tu estado se convierte inesperadamente en `undefined`, probablemente te estás olvidando de devolver el estado con `return` en uno de los casos, o tu tipo de acción no coincide con ninguna de las declaraciones `case`. Para saber por qué, lanza un error fuera del `switch`:

```
function reducer(state, action) {switch (action.type) {case 'incremented_age': {// ...}case 'edited_name': {// ...}}throw Error('Unknown action: ' + action.type);}
```

También puedes utilizar un comprobador de tipos estático como TypeScript para detectar estos errores.

* * *

### Recibo un error: “Too many re-renders”[](#im-getting-an-error-too-many-re-renders "Link for Recibo un error: “Too many re-renders” ")

Puede que obtengas un error que dice: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` (Demasiados rerenderizados. React limita el número de renderizados para evitar un bucle infinito). Normalmente, esto significa que estás enviando incondicionalmente una acción _durante la renderización_, por lo que tu componente entra en un bucle: renderización, envío (que provoca una renderización), renderización, envío (que provoca una renderización), y así sucesivamente. Muy a menudo, esto es causado por un error al especificar un controlador de evento:

```
// 🚩 Wrong: calls the handler during renderreturn <button onClick={handleClick()}>Hazme clic</button>// ✅ Correct: passes down the event handlerreturn <button onClick={handleClick}>Hazme clic</button>// ✅ Correct: passes down an inline functionreturn <button onClick={(e) => handleClick(e)}>Hazme clic</button>
```

Si no puedes encontrar la causa de este error, haz clic en la flecha situada junto al error en la consola y busque en la pila de JavaScript la llamada específica a la función `dispatch` responsable del error.

* * *

### Mi función reductora o inicializadora se ejecuta dos veces[](#my-reducer-or-initializer-function-runs-twice "Link for Mi función reductora o inicializadora se ejecuta dos veces ")

En [Modo Estricto](https://es.react.dev/reference/react/StrictMode), React llamará a tus funciones reductoras e inicializadoras dos veces. Esto no debería romper tu código.

Este comportamiento **sólo para desarrollo** te ayuda a [mantener los componentes puros.](https://es.react.dev/learn/keeping-components-pure) React utiliza el resultado de una de las llamadas, e ignora el resultado de la otra llamada. Mientras tus funciones de componente, inicializadora y reducer sean puras, esto no debería afectar a tu lógica. Sin embargo, si accidentalmente son impuras, esto te ayuda a detectar los errores.

Por ejemplo, esta función reducer impura muta un array en estado:

```
function reducer(state, action) {switch (action.type) {case 'added_todo': {// 🚩 Mistake: mutating statestate.todos.push({ id: nextId++, text: action.text });return state;}// ...}}
```

Como React llama a tu función reductora dos veces, verás que la tarea se ha añadido dos veces, así que sabrás que hay un error. En este ejemplo, puedes corregir el error [reemplazando el array en lugar de mutarlo](https://es.react.dev/learn/updating-arrays-in-state#adding-to-an-array):

```
function reducer(state, action) {switch (action.type) {case 'added_todo': {// ✅ Correct: replacing with new statereturn {...state,todos: [...state.todos,{ id: nextId++, text: action.text }]};}// ...}}
```

Ahora que esta función reducer es pura, llamarla una vez extra no hace ninguna diferencia en el comportamiento. Esta es la razón por la que React llamándola dos veces te ayuda a encontrar errores. **Los controladores de eventos no necesitan ser puros.** así que React nunca llamará a tus controladores de eventos dos veces.

Lee [mantener los componentes puros](https://es.react.dev/learn/keeping-components-pure) para obtener más información.
