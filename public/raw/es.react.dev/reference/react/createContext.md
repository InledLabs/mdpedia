---
title: createContext – React
source: https://es.react.dev/reference/react/createContext
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# createContext – React

`createContext` te permite crear un [contexto](https://es.react.dev/learn/passing-data-deeply-with-context) que los componentes pueden proporcionar o leer.

```
const SomeContext = createContext(defaultValue)
```

*   [Referencia](#reference)
    *   [`createContext(defaultValue)`](#createcontext)
    *   [`SomeContext.Provider`](#provider)
    *   [`SomeContext.Consumer`](#consumer)
*   [Uso](#usage)
    *   [Crear un contexto](#creating-context)
    *   [Importación y exportación de contexto desde un archivo](#importing-and-exporting-context-from-a-file)
*   [Solución de problemas](#troubleshooting)
    *   [No puedo encontrar la manera de cambiar el valor del contexto](#i-cant-find-a-way-to-change-the-context-value)

* * *

## Referencia[](#reference "Link for Referencia ")

### `createContext(defaultValue)`[](#createcontext "Link for this heading")

Puedes llamar a `createContext` fuera de cualquier componente para crear un contexto.

```
import { createContext } from 'react';const ThemeContext = createContext('light');
```

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `defaultValue`: El valor que desees que tenga el contexto cuando no hay un proveedor de contexto coincidente en el árbol sobre el componente que lee el contexto. Si no tiene ningún valor predeterminado significativo, especifica `null`. El valor predeterminado se entiende como una reserva de “último recurso”. Es estático y nunca cambia con el tiempo.

#### Devuelve[](#returns "Link for Devuelve ")

`createContext` devuelve un objeto de contexto.

**El objeto de contexto en sí no contiene ninguna información.** Representa _qué_ contexto pueden leer o proporcionar otros componentes. Por lo general, utilizará [`SomeContext.Provider`](#provider) en los componentes anteriores para especificar el valor de contexto y llamará a [`useContext(SomeContext)`](https://es.react.dev/reference/react/useContext) en los componentes siguientes para leerlo. El objeto de contexto tiene algunas propiedades:

*   `SomeContext.Provider` Te permite proporcionar el valor de contexto a los componentes.
*   `SomeContext.Consumer` Es una forma alternativa y poco utilizada de leer el valor del contexto..

* * *

### `SomeContext.Provider`[](#provider "Link for this heading")

Envuelve tus componentes en un proveedor de contexto para especificar el valor de este contexto para todos los componentes dentro:

```
function App() {const [theme, setTheme] = useState('light');// ...return (<ThemeContext.Provider value={theme}><Page /></ThemeContext.Provider>);}
```

#### Props[](#provider-props "Link for Props ")

*   `value`: El valor que desees pasar a todos los componentes que leen este contexto dentro de este proveedor, sin importar cuán profundo sea. El valor de contexto puede ser de cualquier tipo. Un componente que llama a [`useContext(SomeContext)`](https://es.react.dev/reference/react/useContext) dentro del proveedor recibe el valor (`value`) del proveedor de contexto correspondiente más interno que se encuentra arriba.

* * *

### `SomeContext.Consumer`[](#consumer "Link for this heading")

Antes de que existiera `useContext`, había una forma más antigua de leer el contexto:

```
function Button() {// 🟡 Forma antigua (no recomendado)return (<ThemeContext.Consumer>{theme => (<button className={theme} />)}</ThemeContext.Consumer>);}
```

Aunque esta forma aún funciona, **el código recién escrito debería leer el contexto con [`useContext()`](https://es.react.dev/reference/react/useContext) en su lugar:**

```
function Button() {// ✅ Forma recomendadaconst theme = useContext(ThemeContext);return <button className={theme} />;}
```

#### Props[](#consumer-props "Link for Props ")

*   `children`: Una función. React llamará a la función que pases con el valor de contexto actual determinado por el mismo algoritmo que [`useContext()`](https://es.react.dev/reference/react/useContext) y renderizará el resultado que devuelves de esta función. React también volverá a ejecutar esta función y actualizará la interfaz de usuario siempre que el contexto pasado desde los componentes principales haya cambiado.

* * *

## Uso[](#usage "Link for Uso ")

### Crear un contexto[](#creating-context "Link for Crear un contexto ")

El contexto permite que los componentes [pasen información en profundidad](https://es.react.dev/learn/passing-data-deeply-with-context) sin pasar props explícitamente.

Llama a `createContext` fuera de cualquier componente para crear uno o más contextos.

```
import { createContext } from 'react';const ThemeContext = createContext('light');const AuthContext = createContext(null);
```

`createContext` devuelve un objeto context. Los componentes pueden leer el contexto pasándolo a [`useContext()`](https://es.react.dev/reference/react/useContext):

```
function Button() {const theme = useContext(ThemeContext);// ...}function Profile() {const currentUser = useContext(AuthContext);// ...}
```

De forma predeterminada, los valores que reciben serán los valores predeterminados que se han especificado al crear los contextos. Sin embargo, esto por sí mismo no es útil porque los valores predeterminados nunca cambian.

El contexto es útil porque puede **proporcionar otros valores dinámicos a sus componentes:**

```
function App() {const [theme, setTheme] = useState('dark');const [currentUser, setCurrentUser] = useState({ name: 'Taylor' });// ...return (<ThemeContext.Provider value={theme}><AuthContext.Provider value={currentUser}><Page /></AuthContext.Provider></ThemeContext.Provider>);}
```

Ahora el componente `Page` y cualquier componente dentro de él, sin importar cuán profundo sea, “verán” los valores de contexto dados. Si los valores del contexto dados cambian, React volverá a renderizar los componentes leyendo el contexto también.

[Aprende más sobre leer y proporcionar un contexto, y consulta ejemplos.](https://es.react.dev/reference/react/useContext)

* * *

### Importación y exportación de contexto desde un archivo[](#importing-and-exporting-context-from-a-file "Link for Importación y exportación de contexto desde un archivo ")

A menudo, los componentes de diferentes archivos necesitarán acceso al mismo contexto. Por eso es común declarar contextos en un archivo separado. Luego puedes usar la declaración [`export`](https://developer.mozilla.org/es/docs/web/javascript/reference/statements/export) para hacer que el contexto esté disponible para otros archivos:

```
// Contexts.jsimport { createContext } from 'react';export const ThemeContext = createContext('light');export const AuthContext = createContext(null);
```

Los componentes declarados en otros archivos pueden usar la declaración [`import`](https://developer.mozilla.org/es/docs/web/javascript/reference/statements/import) para leer o proveer un contexto:

```
// Button.jsimport { ThemeContext } from './Contexts.js';function Button() {const theme = useContext(ThemeContext);// ...}
```

```
// App.jsimport { ThemeContext, AuthContext } from './Contexts.js';function App() {// ...return (<ThemeContext.Provider value={theme}><AuthContext.Provider value={currentUser}><Page /></AuthContext.Provider></ThemeContext.Provider>);}
```

Esto funciona de manera similar a la [importación y exportación de componentes.](https://es.react.dev/learn/importing-and-exporting-components)

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### No puedo encontrar la manera de cambiar el valor del contexto[](#i-cant-find-a-way-to-change-the-context-value "Link for No puedo encontrar la manera de cambiar el valor del contexto ")

Un código como este especifica el valor de contexto _predeterminado_:

```
const ThemeContext = createContext('light');
```

Este valor nunca cambia. React solo usa este valor como respaldo si no puede encontrar un proveedor coincidente arriba.

Para hacer que el contexto cambie con el tiempo, [agrega estado y envuelve los componentes en un proveedor de contexto.](https://es.react.dev/reference/react/useContext#updating-data-passed-via-context)
