---
title: useContext – React
source: https://es.react.dev/reference/react/useContext
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useContext – React

`useContext` es un Hook de React que te permite leer y suscribirte a un [contexto](https://es.react.dev/learn/passing-data-deeply-with-context) desde tu componente.

```
const value = useContext(SomeContext)
```

*   [Referencia](#reference)
    *   [`useContext(SomeContext)`](#usecontext)
*   [Uso](#usage)
    *   [Pasar datos de manera profunda en el árbol](#passing-data-deeply-into-the-tree)
    *   [Actualizar los datos pasados a través del contexto](#updating-data-passed-via-context)
    *   [Especificar un valor por defecto](#specifying-a-fallback-default-value)
    *   [Sobreescribir el contexto para una parte del árbol](#overriding-context-for-a-part-of-the-tree)
    *   [Optimizar rerenderizados al pasar objetos y funciones](#optimizing-re-renders-when-passing-objects-and-functions)
*   [Solución de problemas](#troubleshooting)
    *   [Mi componente no ve el valor desde mi proveedor](#my-component-doesnt-see-the-value-from-my-provider)
    *   [Siempre recibo `undefined` de mi contexto a pesar de que el valor por defecto es diferente](#i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useContext(SomeContext)`[](#usecontext "Link for this heading")

Llama `useContext` en el nivel superior de tu componente para leer y suscribirte al [contexto.](https://es.react.dev/learn/passing-data-deeply-with-context)

```
import { useContext } from 'react';function MyComponent() {const theme = useContext(ThemeContext);// ...
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `SomeContext`: El contexto que creaste previamente con [`createContext`](https://es.react.dev/reference/react/createContext). El propio contexto no guarda información, solo representa el tipo de información que puedes proporcionar o leer desde tus componentes.

#### Devuelve[](#returns "Link for Devuelve ")

`useContext` devuelve el valor del contexto para el componente que lo llama. Está determinado como el `value` pasado al `SomeContext.Provider` más cercano arriba del componente que llama en el árbol. Si no existe tal proveedor, entonces el valor devuelto será el `defaultValue` que le pasaste a [`createContext`](https://es.react.dev/reference/react/createContext) para ese contexto. El valor devuelto siempre está actualizado. React rerenderiza automáticamente los componentes que leen algún contexto si este cambia.

#### Advertencias[](#caveats "Link for Advertencias ")

*   La llamada de `useContext()` en un componente no es afectada por los proveedores devueltos desde el _mismo_ componente. El `<Context.Provider>` correspondiente **necesita estar _arriba_** del componente que hace la llamada de `useContext()`.
*   React **rerenderiza automáticamente** todos los hijos que usen un contexto particular empezando desde el proveedor que recibe un `value` diferente. Los valores anteriores y los siguientes son comparados con [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is). Saltarse el rerenderizado con [`memo`](https://es.react.dev/reference/react/memo) no evita que los hijos reciban valores de contexto frescos de arriba.
*   Si tu sistema de compilación produce módulos duplicados en la salida (lo cual puede pasar si usas enlaces simbólicos), esto puede romper el contexto. Pasar algo a través del contexto solo funciona si `SomeContext` que usas para proporcionar el contexto y `SomeContext` que usas para leerlo son **_exactamente_ el mismo objeto**, como está determinado por la comparación `===`.

* * *

## Uso[](#usage "Link for Uso ")

### Pasar datos de manera profunda en el árbol[](#passing-data-deeply-into-the-tree "Link for Pasar datos de manera profunda en el árbol ")

Llama `useContext` en el nivel superior de tu componente para leer y suscribirte al [contexto.](https://es.react.dev/learn/passing-data-deeply-with-context)

```
import { useContext } from 'react';function Button() {const theme = useContext(ThemeContext);// ...
```

`useContext` devuelve el valor del contexto para el contexto que le pasaste. Para determinar el valor del contexto, React busca en el árbol de componentes y encuentra **el proveedor de contexto más cercano arriba** para ese contexto en particular.

Para pasar el contexto a un `Button`, envuélvelo o envuelve a uno de sus componentes padres dentro del proveedor de contexto correspondiente:

```
function MyPage() {return (<ThemeContext.Provider value="dark"><Form /></ThemeContext.Provider>);}function Form() {// ... renderiza botones dentro ...}
```

No importa cuántas capas de componentes hay entre el proveedor y el `Button`. Cuando un `Button` _en cualquier lugar_ dentro de `Form` llama `useContext(ThemeContext)`, recibirá `"dark"` como valor.

### Atención

`useContext()` siempre busca al proveedor más cercano _arriba_ del componente que lo llama. Busca hacia arriba y **no** toma en cuenta a los proveedores en el componente desde el cual estás llamando `useContext()`.

import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value\="dark"\>
      <Form />
    </ThemeContext.Provider\>
  )
}

function Form() {
  return (
    <Panel title\="Welcome"\>
      <Button\>Registrarse</Button\>
      <Button\>Iniciar sesión</Button\>
    </Panel\>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className\={className}\>
      <h1\>{title}</h1\>
      {children}
    </section\>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className\={className}\>
      {children}
    </button\>
  );
}

* * *

### Actualizar los datos pasados a través del contexto[](#updating-data-passed-via-context "Link for Actualizar los datos pasados a través del contexto ")

A menudo, querrás que el contexto cambie a través del tiempo. Para actualizar el contexto, necesitas combinarlo con [el estado.](https://es.react.dev/reference/react/useState) Declara una variable de estado en el componente padre, y pasa el estado actual como el valor de contexto al proveedor.

```
function MyPage() {const [theme, setTheme] = useState('dark');return (<ThemeContext.Provider value={theme}><Form /><Button onClick={() => {setTheme('light');}}>        Cambiar a tema claro</Button></ThemeContext.Provider>);}
```

Ahora cualquier `Button` dentro del proveedor recibirá el valor actual de `theme`. Si llamas `setTheme` para actualizar el valor de `theme` que pasaste al proveedor, todos los componentes `Button` se rerenderizarán con el nuevo valor `'light'`.

#### 

Ejemplo

1

de

5:

Actualizar un valor a través del contexto[](#updating-a-value-via-context "Link for this heading")

En este ejemplo, el componente `MyApp` guarda una variable de estado la cual es luego pasada al proveedor de `ThemeContext`. Marcar la casilla “Dark mode” actualiza el estado. Cambiar el valor proporcionado rerenderiza todos los componentes que utilizan ese contexto.

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  const \[theme, setTheme\] = useState('light');
  return (
    <ThemeContext.Provider value\={theme}\>
      <Form />
      <label\>
        <input
          type\="checkbox"
          checked\={theme === 'dark'}
          onChange\={(e) \=> {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Usar modo oscuro
      </label\>
    </ThemeContext.Provider\>
  )
}

function Form({ children }) {
  return (
    <Panel title\="Bienvenido"\>
      <Button\>Registrarse</Button\>
      <Button\>Iniciar sesión</Button\>
    </Panel\>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className\={className}\>
      <h1\>{title}</h1\>
      {children}
    </section\>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className\={className}\>
      {children}
    </button\>
  );
}

Fíjate que `value="dark"` pasa el string `"dark"`, pero `value={theme}` pasa el valor de la variable JavaScript `theme` con [llaves de JSX.](https://es.react.dev/learn/javascript-in-jsx-with-curly-braces) Las llaves también te permiten pasar valores de contexto que no son strings.

* * *

### Especificar un valor por defecto[](#specifying-a-fallback-default-value "Link for Especificar un valor por defecto ")

Si React no puede encontrar ningún proveedor de ese contexto en particular en el árbol padre, el valor del contexto devuelto por `useContext()` será igual al valor por defecto que especificaste cuando [creaste ese contexto](https://es.react.dev/reference/react/createContext):

```
const ThemeContext = createContext(null);
```

El valor por defecto **nunca cambia**. Si quieres actualizar el contexto, úsalo en conjunto con el estado como está [descrito arriba.](#updating-data-passed-via-context)

A menudo, en lugar de `null`, hay algunos valores significativos más que puedes usar por defecto, por ejemplo:

```
const ThemeContext = createContext('light');
```

De esta manera, si accidentalmente renderizas algún componente sin su proveedor correspondiente, no se romperá. Esto también ayuda a que tus componentes funcionen bien en un ambiente de pruebas sin configurar un montón de proveedores en las pruebas.

En este ejemplo a continuación, el botón “Cambiar tema” siempre es claro, porque está **afuera de cualquier proveedor de contexto del tema** y el valor por defecto del contexto del tema es `'light'`. Intenta editar el tema por defecto para que sea `'dark'`.

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

export default function MyApp() {
  const \[theme, setTheme\] = useState('light');
  return (
    <\>
      <ThemeContext.Provider value\={theme}\>
        <Form />
      </ThemeContext.Provider\>
      <Button onClick\={() \=> {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}\>
        Cambiar tema
      </Button\>
    </\>
  )
}

function Form({ children }) {
  return (
    <Panel title\="Bienvenido"\>
      <Button\>Registrarse</Button\>
      <Button\>Iniciar sesión</Button\>
    </Panel\>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className\={className}\>
      <h1\>{title}</h1\>
      {children}
    </section\>
  )
}

function Button({ children, onClick }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className\={className} onClick\={onClick}\>
      {children}
    </button\>
  );
}

* * *

### Sobreescribir el contexto para una parte del árbol[](#overriding-context-for-a-part-of-the-tree "Link for Sobreescribir el contexto para una parte del árbol ")

Puedes sobreescribir el contexto para una parte del árbol al envolver esa parte en un proveedor con un valor diferente.

```
<ThemeContext.Provider value="dark">  ...<ThemeContext.Provider value="light"><Footer /></ThemeContext.Provider>  ...</ThemeContext.Provider>
```

Puedes anidar y sobreescribir proveedores tantas veces como necesites.

#### 

Ejemplo

1

de

2:

Sobreescribir un tema[](#overriding-a-theme "Link for this heading")

Aquí, el botón _dentro_ del `Footer` recibe un valor del contexto diferente (`"light"`) que los objetos fuera (`"dark"`).

import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value\="dark"\>
      <Form />
    </ThemeContext.Provider\>
  )
}

function Form() {
  return (
    <Panel title\="Bienvenido"\>
      <Button\>Registrarse</Button\>
      <Button\>Iniciar sesión</Button\>
      <ThemeContext.Provider value\="light"\>
        <Footer />
      </ThemeContext.Provider\>
    </Panel\>
  );
}

function Footer() {
  return (
    <footer\>
      <Button\>Ajustes</Button\>
    </footer\>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className\={className}\>
      {title && <h1\>{title}</h1\>}
      {children}
    </section\>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className\={className}\>
      {children}
    </button\>
  );
}

* * *

### Optimizar rerenderizados al pasar objetos y funciones[](#optimizing-re-renders-when-passing-objects-and-functions "Link for Optimizar rerenderizados al pasar objetos y funciones ")

Puedes pasar cualquier valor a través del contexto, incluyendo objetos y funciones.

```
function MyApp() {const [currentUser, setCurrentUser] = useState(null);function login(response) {storeCredentials(response.credentials);setCurrentUser(response.user);}return (<AuthContext.Provider value={{ currentUser, login }}><Page /></AuthContext.Provider>);}
```

Aquí, el valor del contexto es un objeto de JavaScript con dos propiedades, una de las cuales es una función. Siempre que `MyApp` se rerenderice (por ejemplo, en una actualización de ruta), este será un objeto _diferente_ apuntando a una función _diferente_, así que React también tendrá que rerenderizar todos los componentes en lo profundo del árbol que llamen `useContext(AuthContext)`.

En aplicaciones más pequeñas, esto no es un problema. Sin embargo, no hay necesidad de rerenderizarlas si los datos subyacentes, como `currentUser`, no han cambiado. Para ayudar a React a aprovechar esa información, puedes envolver la función `login` con [`useCallback`](https://es.react.dev/reference/react/useCallback) y envolver la creación del objeto en un [`useMemo`](https://es.react.dev/reference/react/useMemo). Esta es una optimización del rendimiento:

```
import { useCallback, useMemo } from 'react';function MyApp() {const [currentUser, setCurrentUser] = useState(null);const login = useCallback((response) => {storeCredentials(response.credentials);setCurrentUser(response.user);}, []);const contextValue = useMemo(() => ({currentUser,login}), [currentUser, login]);return (<AuthContext.Provider value={contextValue}><Page /></AuthContext.Provider>);}
```

Como resultado de este cambio, incluso si `MyApp` necesita rerenderizarse, los componentes que llaman `useContext(AuthContext)` no se rerenderizarán a menos que `currentUser` haya cambiado. Lee más sobre [`useMemo`](https://es.react.dev/reference/react/useMemo#skipping-re-rendering-of-components) y [`useCallback`.](https://es.react.dev/reference/react/useCallback#skipping-re-rendering-of-components)

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### Mi componente no ve el valor desde mi proveedor[](#my-component-doesnt-see-the-value-from-my-provider "Link for Mi componente no ve el valor desde mi proveedor ")

Hay algunas maneras comunes en que esto puede ocurrir:

1.  Estás renderizando `<SomeContext.Provider>` en el mismo componente (o debajo de) donde estás llamando `useContext()`. Mueve `<SomeContext.Provider>` _arriba y afuera_ del componente que llama `useContext()`.
2.  Puede que hayas olvidado envolver tu componente con `<SomeContext.Provider>`, o quizás lo colocaste en una parte diferente del árbol de la que pensabas. Revisa si la jerarquía está correcta utilizando [React DevTools.](https://es.react.dev/learn/react-developer-tools)
3.  Puede que tengas un problema de compilación con tus herramientas que provoque que `SomeContext` como es visto desde el componente proveedor y que `SomeContext` como es visto desde el componente que lee sean dos objetos diferentes. Esto puede suceder si usas enlaces simbólicos, por ejemplo. Puedes verificar esto al asignarlos a variables globales como `window.SomeContext1` y `window.SomeContext2` y luego verificar si `window.SomeContext1 === window.SomeContext2` en la consola. Si no son el mismo, necesitas arreglar ese problema a nivel de herramienta de compilación.

### Siempre recibo `undefined` de mi contexto a pesar de que el valor por defecto es diferente[](#i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different "Link for this heading")

Puede que tengas un proveedor sin un `value` en el árbol:

```
// 🚩 No funciona: No hay prop value<ThemeContext.Provider><Button /></ThemeContext.Provider>
```

Si te olvidas de especificar un `value`, es como pasar `value={undefined}`.

Es posible que hayas utilizado un nombre de prop diferente por error:

```
// 🚩 No funciona: la prop debería llamarse "value"<ThemeContext.Provider theme={theme}><Button /></ThemeContext.Provider>
```

En ambos casos deberías ver una advertencia de React en la consola. Para solucionarlos llama a la prop `value`:

```
// ✅ Pasando la prop value<ThemeContext.Provider value={theme}><Button /></ThemeContext.Provider>
```

Fíjate que el [valor por defecto de tu llamada `createContext(defaultValue)`](#specifying-a-fallback-default-value) solo es usado **si no hay ningún proveedor que coincida arriba en absoluto.** Si hay algún componente `<SomeContext.Provider value={undefined}>` en algún lugar del árbol, el componente llamando `useContext(SomeContext)` _recibirá_ `undefined` como el valor del contexto.
