---
title: useState – React
source: https://es.react.dev/reference/react/useState
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# useState – React

`useState` es un Hook de React que te permite agregar una [variable de estado](https://es.react.dev/learn/state-a-components-memory) a tu componente.

```
const [state, setState] = useState(initialState)
```

*   [Referencia](#reference)
    *   [`useState(initialState)`](#usestate)
    *   [Funciones `set` , como `setAlgo(siguienteEstado)`](#setstate)
*   [Uso](#usage)
    *   [Agregar estado a un componente](#adding-state-to-a-component)
    *   [Actualización de estado con base en el estado anterior](#updating-state-based-on-the-previous-state)
    *   [Actualización de objetos y _arrays_ en el estado](#updating-objects-and-arrays-in-state)
    *   [Evitar recrear el estado inicial](#avoiding-recreating-the-initial-state)
    *   [Reinicio del estado con una _key_](#resetting-state-with-a-key)
    *   [Almacenamiento de información de renderizados anteriores](#storing-information-from-previous-renders)
*   [Solución de problemas](#troubleshooting)
    *   [He actualizado el estado, pero el registro me da el valor anterior](#ive-updated-the-state-but-logging-gives-me-the-old-value)
    *   [He actualizado el estado, pero la pantalla no se actualiza](#ive-updated-the-state-but-the-screen-doesnt-update)
    *   [Recibo un error: “Demasiados renderizados”](#im-getting-an-error-too-many-re-renders)
    *   [Mi función de inicialización o actualización se ejecuta dos veces](#my-initializer-or-updater-function-runs-twice)
    *   [Estoy tratando de establecer el estado como una función, pero termina siendo llamada](#im-trying-to-set-state-to-a-function-but-it-gets-called-instead)

* * *

## Referencia[](#reference "Link for Referencia ")

### `useState(initialState)`[](#usestate "Link for this heading")

Llama a `useState` en el nivel superior de tu componente para declarar una [variable de estado](https://es.react.dev/learn/state-a-components-memory).

```
import { useState } from 'react';function MyComponent() {const [age, setAge] = useState(28);const [name, setName] = useState('Taylor');const [todos, setTodos] = useState(() => createTodos());// ...
```

La convención es nombrar variables de estado como `[algo, setAlgo]` usando [desestructuración de arrays](https://javascript.info/destructuring-assignment).

[Ver más ejemplos abajo.](#usage)

#### Parámetros[](#parameters "Link for Parámetros ")

*   `initialState`: El valor que deseas que tenga el estado inicialmente. Puede ser un valor de cualquier tipo, pero hay un comportamiento especial para las funciones. Este argumento se ignora después del renderizado inicial.
    *   Si pasa una función como `initialState`, se tratará como una _función inicializadora_. Debe ser pura, no debe aceptar argumentos y debe devolver un valor de cualquier tipo. React llamará a tu función de inicialización al inicializar el componente y almacenará su valor de devolución como el estado inicial. [Ve un ejemplo debajo.](#avoiding-recreating-the-initial-state)

#### Devuelve[](#returns "Link for Devuelve ")

`useState` devuelve un _array_ con exactamente dos valores:

1.  El estado actual. Durante el primer renderizado, coincidirá con el `initialState` que hayas pasado.
2.  La [función `set`](#setstate) que te permite actualizar el estado a un valor diferente y desencadenar un nuevo renderizado.

#### Advertencias[](#caveats "Link for Advertencias ")

*   `useState` es un Hook, por lo que solo puedes llamarlo **en el nivel superior de tu componente** o en tus propios Hooks. No puedes llamarlo dentro de bucles o condiciones. Si lo necesitas, extrae un nuevo componente y mueva el estado a él.
*   En [Modo estricto](https://es.react.dev/reference/react/StrictMode), React **llamará a tu función de inicialización dos veces** para [ayudarte a encontrar impurezas accidentales.](#my-initializer-or-updater-function-runs-twoveces) Este es un comportamiento exclusivo de desarrollo y no ocurre en producción. Si tu función de inicialización es pura (como debería ser), esto no debería afectar la lógica de tu componente. Se ignorará el resultado de una de las llamadas.

* * *

### Funciones `set` , como `setAlgo(siguienteEstado)`[](#setstate "Link for this heading")

La función `set` devuelta por `useState` te permite actualizar el estado a un valor diferente y desencadenar un nuevo renderizado. Puedes pasar el siguiente estado directamente, o una función que lo calcule a partir del estado anterior:

```
const [name, setName] = useState('Edward');function handleClick() {setName('Taylor');setAge(a => a + 1);// ...
```

#### Parámetros[](#setstate-parameters "Link for Parámetros ")

*   `siguienteEstado`: El valor que deseas que tenga el estado. Puede ser un valor de cualquier tipo, pero hay un comportamiento especial para las funciones.
*   Si pasas una función como `siguienteEstado`, se tratará como una _función de actualización_. Debe ser pura, debe tomar el estado pendiente como único argumento y debe devolver el siguiente estado. React pondrá tu función de actualización en una cola y volverá a renderizar tu componente. Durante el próximo renderizado, React calculará el siguiente estado aplicando todas las actualizaciones en cola al estado anterior. [Ve un ejemplo debajo.](#updating-state-based-on-the-previous-state)

#### Devuelve[](#setstate-returns "Link for Devuelve ")

Las funciones `set` no tienen un valor de devolución.

#### Advertencias[](#setstate-caveats "Link for Advertencias ")

*   La función `set` **solo actualiza la variable de estado para el _próximo_ renderizado**. Si lees la variable de estado después de llamar a la función `set`, [seguirás obteniendo el valor anterior](#ive-updated-the-state-but-logging-gives-me-the-old-value) que estaba en la pantalla antes de tu llamada.
    
*   Si el nuevo valor que proporcionas es idéntico al `estado` actual, según lo determinado por un [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is), React **omitirá volver a renderizar el componente y sus hijos.** Esta es una optimización. Aunque en algunos casos React aún puede necesitar llamar a tu componente antes de omitir los hijos, no debería afectar tu código.
    
*   React [agrupa actualizaciones de estado.](https://es.react.dev/learn/queueing-a-series-of-state-updates) Actualiza la pantalla **después de que todos los controladores de eventos se hayan ejecutado** y hayan llamado a sus funciones `set`. Esto evita múltiples renderizados durante un solo evento. En el raro caso de que necesite forzar a React a actualizar la pantalla antes, por ejemplo, para acceder al DOM, puedes usar [`flushSync`.](https://es.react.dev/reference/react-dom/flushSync)
    
*   La función `set` tiene una identidad estable, por lo que a menudo verás que se omite de las dependencias de los Efectos, pero que se incluya no causa que el Efecto se dispare. Si el _linter_ te permite omitir una dependencia sin errores, es seguro hacerlo. [Aprende más sobre eliminar dependencias de los Efectos.](https://es.react.dev/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)
    
*   Llamar a la función `set` _durante el renderizado_ solo está permitido desde el componente que se está renderizando. React descartará su salida e inmediatamente intentará renderizarlo nuevamente con el nuevo estado. Este patrón rara vez se necesita, pero puedes usarlo para **almacenar información de los renderizados anteriores**. [Ve un ejemplo debajo.](#storing-information-from-previous-renders)
    
*   En [Modo estricto](https://es.react.dev/reference/react/StrictMode), React **llamará a tu función de actualización dos veces** para [ayudarte a encontrar impurezas accidentales.](#my-initializer-or-updater-function-runs-twice) Este es un comportamiento exclusivo de desarrollo y no ocurre en producción. Si tu función de actualización es pura (como debería ser), esto no debería afectar la lógica de tu componente. Se ignorará el resultado de una de las llamadas.
    

* * *

## Uso[](#usage "Link for Uso ")

### Agregar estado a un componente[](#adding-state-to-a-component "Link for Agregar estado a un componente ")

Llama a `useState` en el nivel superior de tu componente para declarar una o más [variables de estado.](https://es.react.dev/learn/state-a-components-memory)

```
import { useState } from 'react';function MyComponent() {const [age, setAge] = useState(42);const [name, setName] = useState('Taylor');// ...
```

La convención es nombrar variables de estado como `[algo, setAlgo]` utilizando la [desestructuración de _arrays_.](https://javascript.info/destructuring-assignment)

`useState` devuelve un _array_ con exactamente dos elementos:

1.  El estado actual de esta variable de estado, establecida inicialmente en el estado inicial que proporcionaste.
2.  La función `set` que te permite cambiarlo a cualquier otro valor en respuesta a la interacción.

Para actualizar lo que está en la pantalla, llama a la función `set` con algún estado:

```
function handleClick() {setName('Robin');}
```

React almacenará el siguiente estado, renderizará tu componente nuevamente con los nuevos valores y actualizará la interfaz de usuario.

### Atención

Llamar a la función `set` [**no cambia** el estado actual en el código que ya se está ejecutando](#ive-updated-the-state-but-logging-gives-me-the-old-value) :

```
function handleClick() {setName('Robin');console.log(name); // ¡Sigue siendo "Taylor"!}
```

Solo afecta lo que `useState` devolverá a partir del _siguiente_ renderizado.

#### 

Ejemplo

1

de

4:

Contador (número)[](#counter-number "Link for this heading")

En este ejemplo, la variable `contador` contiene un número. Al hacer click en el botón lo incrementa

* * *

### Actualización de estado con base en el estado anterior[](#updating-state-based-on-the-previous-state "Link for Actualización de estado con base en el estado anterior ")

Supongamos que `age` es `42`. La función `handler` llama `setAge(age + 1)` tres veces:

```
function handleClick() {setAge(age + 1); // setAge(42 + 1)setAge(age + 1); // setAge(42 + 1)setAge(age + 1); // setAge(42 + 1)}
```

¡Sin embargo, después de un click, `age` solo será `43` en lugar de 45! Esto se debe a que llamar a la función `set` no actualizará la variable de estado `age` en el código que ya se está ejecutando. Así que cada llamada `setAge(age + 1)` se convierte en `setAge(43)`.

Para resolver este problema, **puedes pasar una función de actualización** a `setAge` en lugar del siguiente estado:

```
function handleClick() {setAge(a => a + 1); // setAge(42 => 43)setAge(a => a + 1); // setAge(43 => 44)setAge(a => a + 1); // setAge(44 => 45)}
```

Aquí, `a => a + 1` es la función de actualización. Toma el estado pendiente y calcula el siguiente estado a partir de él.

React pone sus funciones de actualización en una [cola.](https://es.react.dev/learn/queueing-a-series-of-state-updates) Entonces, durante el siguiente renderizado, las llamará en el mismo orden:

1.  `a => a + 1` recibirá `42` como estado pendiente y devolverá `43` como el siguiente estado.
2.  `a => a + 1` recibirá `43` como estado pendiente y devolverá `44` como el siguiente estado.
3.  `a => a + 1` recibirá `44` como estado pendiente y devolverá `45` como el siguiente estado.

No hay otras actualizaciones en cola, por lo que React almacenará `45` como el estado actual al final.

Por convención, es común nombrar el argumento de estado pendiente como la primera letra del nombre de la variable de estado, como `a` para `age`. No obstante, también puedes llamarlo como `prevAge` o cualquier otra cosa que te resulte más clara.

React puede [llamar a tus actualizadores dos veces](#my-initializer-or-updater-function-runs-twice) en desarrollo para verificar que sean [puros.](https://es.react.dev/learn/keeping-components-pure)

##### Profundizar

#### ¿Siempre se prefiere usar un actualizador?[](#is-using-an-updater-always-preferred "Link for ¿Siempre se prefiere usar un actualizador? ")

Es posible que escuches una recomendación para escribir siempre código como `setEdad(e => e + 1)` si el estado que está configurando se calcula a partir del estado anterior. No hay daño en ello, pero tampoco es necesario siempre.

En la mayoría de los casos, no hay diferencia entre estos dos enfoques. React siempre se asegura de que para las acciones intencionales del usuario, como los clicks, la variable de estado `edad` se actualizará antes del siguiente click. Esto significa que no hay riesgo de que un controlador de clicks vea un mensaje “obsoleto” de `edad` al comienzo del controlador de evento.

Sin embargo, si realizas varias actualizaciones dentro del mismo evento, los actualizadores pueden ser útiles. También son útiles si acceder a la variable de estado en sí es un inconveniente (es posible que te encuentres con esto al optimizar los renderizados).

Si prefieres la coherencia a una sintaxis un poco más detallada, es razonable escribir siempre un actualizador si el estado que está configurando se calcula a partir del estado anterior. Si se calcula a partir del estado anterior de alguna otra variable de estado, es posible que desees combinarlos en un solo objeto y [uses un reducer.](https://es.react.dev/learn/extracting-state-logic-into-a-reducer)

#### 

Ejemplo

1

de

2:

Pasar la función de actualización[](#passing-the-updater-function "Link for this heading")

Este ejemplo pasa la función de actualización, por lo que funciona el botón “+3”.

import { useState } from 'react';

export default function Counter() {
  const \[age, setAge\] = useState(42);

  function increment() {
    setAge(a \=> a + 1);
  }

  return (
    <\>
      <h1\>Tu edad: {age}</h1\>
      <button onClick\={() \=> {
        increment();
        increment();
        increment();
      }}\>+3</button\>
      <button onClick\={() \=> {
        increment();
      }}\>+1</button\>
    </\>
  );
}

* * *

### Actualización de objetos y _arrays_ en el estado[](#updating-objects-and-arrays-in-state "Link for this heading")

Se pueden poner objetos y _arrays_ en el estado. En React, el estado se considera de solo lectura, por lo que **debes reemplazar en lugar de _mutar_ tus objetos existentes**. Por ejemplo, si tienes un objeto `formulario` en el estado, no lo actualices así:

```
// 🚩 No cambies un objeto en un estado como este:formulario.primerNombre = 'Taylor';
```

En su lugar, reemplaza todo el objeto creando uno nuevo:

```
// ✅ Reemplaza el estado con un nuevo objetosetForm({...form,firstName: 'Taylor'});
```

Lee [actualizar objetos en el estado](https://es.react.dev/learn/updating-objects-in-state) y [actualizar _arrays_ en el estado](https://es.react.dev/learn/updating-arrays-in-state) para saber más.

#### 

Ejemplo

1

de

4:

Formulario (objeto)[](#form-object "Link for this heading")

En este ejemplo, la variable de estado `formulario` contiene un objeto. Cada entrada tiene un controlador de cambios que llama `setFormulario` con el siguiente estado de todo el formulario. La sintaxis de propagación `{ ...formulario }` garantiza que el objeto de estado se reemplace en lugar de mutarse.

import { useState } from 'react';

export default function Form() {
  const \[form, setForm\] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  });

  return (
    <\>
      <label\>
        Nombre:
        <input
          value\={form.firstName}
          onChange\={e \=> {
            setForm({
              ...form,
              firstName: e.target.value
            });
          }}
        />
      </label\>
      <label\>
        Apellidos:
        <input
          value\={form.lastName}
          onChange\={e \=> {
            setForm({
              ...form,
              lastName: e.target.value
            });
          }}
        />
      </label\>
      <label\>
        Correo electrónico:
        <input
          value\={form.email}
          onChange\={e \=> {
            setForm({
              ...form,
              email: e.target.value
            });
          }}
        />
      </label\>
      <p\>
        {form.firstName}{' '}
        {form.lastName}{' '}
        ({form.email})
      </p\>
    </\>
  );
}

* * *

### Evitar recrear el estado inicial[](#avoiding-recreating-the-initial-state "Link for Evitar recrear el estado inicial ")

React guarda el estado inicial una vez y lo ignora en los próximos renderizados.

```
function TodoList() {const [todos, setTodos] = useState(createInitialTodos());// ...
```

Aunque el resultado de `createInitialTodos()` solo se usa para el renderizado inicial, todavía está llamando a esta función en cada renderizado. Esto puede ser un desperdicio si se trata de crear _arrays_ grandes o realizar cálculos costosos.

Para resolver esto, puedes **pasarlo como una función inicializadora** a `useState` en su lugar:

```
function TodoList() {const [todos, setTodos] = useState(createInitialTodos);// ...
```

Observa que estás pasando `createInitialTodos`, que es la _función misma_, y no `createInitialTodos()`, que es el resultado de llamarla. Si pasas una función a `useState`, React solo la llamará durante la inicialización.

React puede [llamar a tus inicializadores dos veces](#my-initializer-or-updater-function-runs-twice) en desarrollo para verificar que sean [puros.](https://es.react.dev/learn/keeping-components-pure)

#### 

Ejemplo

1

de

2:

Paso de la función de inicializadora[](#passing-the-initializer-function "Link for this heading")

Este ejemplo pasa la función de inicialización, por lo que la función `createInitialTodos` solo se ejecuta durante la inicialización. No se ejecuta cuando el componente se vuelve a renderizar, como cuando escribe en la entrada.

import { useState } from 'react';

function createInitialTodos() {
  const initialTodos = \[\];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: 'Item ' + (i + 1)
    });
  }
  return initialTodos;
}

export default function TodoList() {
  const \[todos, setTodos\] = useState(createInitialTodos);
  const \[text, setText\] = useState('');

  return (
    <\>
      <input
        value\={text}
        onChange\={e \=> setText(e.target.value)}
      />
      <button onClick\={() \=> {
        setText('');
        setTodos(\[{
          id: todos.length,
          text: text
        }, ...todos\]);
      }}\>Agregar</button\>
      <ul\>
        {todos.map(item \=> (
          <li key\={item.id}\>
            {item.text}
          </li\>
        ))}
      </ul\>
    </\>
  );
}

* * *

### Reinicio del estado con una _key_[](#resetting-state-with-a-key "Link for this heading")

Por lo general, es posible que encuentre el atributo _`key`_ al [renderizar listas.](https://es.react.dev/learn/rendering-lists) Sin embargo, también tiene otro propósito.

Puede **reiniciar el estado de un componente pasando una _`key`_ diferente a un componente.** En este ejemplo, el botón Reiniciar cambia la variable de estado `versión`, que pasamos como una _`key`_ al `Formulario`. Cuando la _`key`_ cambia, React vuelve a crear el componente `Formulario` (y todos sus hijos) desde cero, por lo que su estado se reinicia.

Lea [preservar y reiniciar el estado](https://es.react.dev/learn/preserving-and-resetting-state) para obtener más información.

import { useState } from 'react';

export default function App() {
  const \[version, setVersion\] = useState(0);

  function handleReset() {
    setVersion(version + 1);
  }

  return (
    <\>
      <button onClick\={handleReset}\>Reiniciar</button\>
      <Form key\={version} />
    </\>
  );
}

function Form() {
  const \[name, setName\] = useState('Taylor');

  return (
    <\>
      <input
        value\={name}
        onChange\={e \=> setName(e.target.value)}
      />
      <p\>Hola, {name}.</p\>
    </\>
  );
}

* * *

### Almacenamiento de información de renderizados anteriores[](#storing-information-from-previous-renders "Link for Almacenamiento de información de renderizados anteriores ")

Por lo general, actualizarás el estado en los controladores de eventos. Sin embargo, en casos excepcionales, es posible que desees ajustar el estado en respuesta al renderizado; por ejemplo, es posible que desees cambiar una variable de estado cuando cambia una propiedad.

En la mayoría de los casos, no lo necesitas:

*   **Si el valor que necesitas se puede calcular completamente a partir de las props actuales u otro estado, [elimina ese estado redundante por completo.](https://es.react.dev/learn/choosing-the-state-structure#avoid-redundant-state)** Si te preocupa volver a calcular con demasiada frecuencia, el [Hook `useMemo`](https://es.react.dev/reference/react/useMemo) puede ayudarte.
*   Si deseas reiniciar el estado de todo el árbol de componentes, [pasa una _`key`_ diferente a tu componente.](#resetting-state-with-a-key)
*   Si puedes, actualiza todo el estado relevante en los controladores de eventos.

En el raro caso de que ninguno de estos se aplique, hay un patrón que puedes usar para actualizar el estado en función de los valores que se han renderizado hasta el momento, llamando a una función `set` mientras tu componente se está renderizando.

Aquí hay un ejemplo. Este componente `CountLabel` muestra la propiedad `count` que se le pasó:

```
export default function CountLabel({ count }) {return <h1>{count}</h1>}
```

Digamos que quieres mostrar si el contador ha _aumentado o disminuido_ desde el último cambio. La prop `count` no te lo dice, — necesitas realizar un seguimiento de su valor anterior. Agrega la variable de estado `prevCount` para realizar un seguimiento. Agrega otra variable de estado llamada `trend` para determinar si el conteo ha aumentado o disminuido. Compara `prevCount` con `count` y, si no son iguales, actualiza tanto `prevCount` como `trend`. Ahora puedes mostrar tanto el accesorio de conteo actual como _cómo ha cambiado desde el último renderizado_.

import { useState } from 'react';

export default function CountLabel({ count }) {
  const \[prevCount, setPrevCount\] = useState(count);
  const \[trend, setTrend\] = useState(null);
  if (prevCount !== count) {
    setPrevCount(count);
    setTrend(count > prevCount ? 'aumenta' : 'disminuye');
  }
  return (
    <\>
      <h1\>{count}</h1\>
      {trend && <p\>El contador {trend}</p\>}
    </\>
  );
}

Ten en cuenta que si llamas a una función `set` durante el renderizado, debe estar dentro de una condición como `prevCount !== count`, y debe haber una llamada como `setPrevCount(count)` dentro de la condición. De lo contrario, tu componente se volvería a procesar en un bucle hasta que se bloquee. Además, solo puedes actualizar el estado del componente _actualmente renderizado_ de esta manera. Llamar a la función `set` de _otro_ componente durante el renderizado es un error. Finalmente, tu llamada `set` aún debería [actualizar el estado sin mutación](#updating-objects-and-arrays-in-state) — este caso especial no significa que puedas romper otras reglas de [funciones puras.](https://es.react.dev/learn/keeping-components-pure)

Este patrón puede ser difícil de entender y, por lo general, es mejor evitarlo. Sin embargo, es mejor que actualizar el estado en un Efecto. Cuando llamas a la función `set` durante el renderizado, React volverá a renderizar ese componente inmediatamente después de que tu componente salga con una declaración `return` y antes de renderizar los hijos. De esta manera, sus hijos no necesitan renderizarse dos veces. El resto de la función de tu componente aún se ejecutará (y el resultado se descartará), pero si tu condición está por debajo de todas las llamadas a Hooks, puedes agregar un `return;` anticipado dentro de él para reiniciar el renderizado antes.

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### He actualizado el estado, pero el registro me da el valor anterior[](#ive-updated-the-state-but-logging-gives-me-the-old-value "Link for He actualizado el estado, pero el registro me da el valor anterior ")

Llamar a la función `set` **no cambia el estado en el código en ejecución**:

```
function handleClick() {console.log(count);  // 0setCount(count + 1); // Solicitar un re-render con 1console.log(count);  // Todavía 0!setTimeout(() => {console.log(count); // También es 0!}, 5000);}
```

Esto se debe a que [los estados se comportan como una instantánea.](https://es.react.dev/learn/state-as-a-snapshot) La actualización del estado solicita otro procesamiento con el nuevo valor del estado, pero no afecta la variable de JavaScript `count` en tu controlador de evento que ya se está ejecutando.

Si necesitas usar el siguiente estado, puedes guardarlo en una variable antes de pasarlo a la función `set`:

```
const nextCount = count + 1;setCount(nextCount);console.log(count);     // 0console.log(nextCount); // 1
```

* * *

### He actualizado el estado, pero la pantalla no se actualiza[](#ive-updated-the-state-but-the-screen-doesnt-update "Link for He actualizado el estado, pero la pantalla no se actualiza ")

React **ignorará tu actualización si el siguiente estado es igual al estado anterior**, según lo determine un [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is). Esto generalmente sucede cuando cambias un objeto o un _array_ en el estado directamente:

```
obj.x = 10;  // 🚩 Incorrecto: mutar objeto existentesetObj(obj); // 🚩 No hace nada
```

Mutaste un objeto `obj` existente y se lo volviste a pasar a `setObj`, por lo que React ignoró la actualización. Para solucionar esto, debes asegurarte de estar siempre [_reemplazando_ objetos y arreglos en el estado en lugar de _mutarlos_](#updating-objects-and-arrays-in-state) :

```
// ✅ Correcto: crear un nuevo objetosetObj({...obj,x: 10});
```

* * *

### Recibo un error: “Demasiados renderizados”[](#im-getting-an-error-too-many-re-renders "Link for Recibo un error: “Demasiados renderizados” ")

Es posible que recibas un error que diga: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` (`Demasiados renderizados. React limita la cantidad de renderizados para evitar un bucle infinito.`) Por lo general, esto significa que estás estableciendo el estado incondicionalmente _durante el renderizado_, por lo que tu componente entra en un bucle: renderizar, establecer el estado (lo que provoca un renderizado), renderizar, establecer estado (que provoca un renderizado), y así sucesivamente. Muy a menudo, esto se debe a un error al especificar un controlador de evento:

```
// 🚩 Incorrecto: llama al controlador durante el procesamientoreturn <button onClick={handleClick()}>Hazme clic</button>// ✅ Correcto: pasa el controlador de eventoreturn <button onClick={handleClick}>Hazme clic</button>// ✅ Correcto: pasa una función en líneareturn <button onClick={(e) => handleClick(e)}>Hazme clic</button>
```

Si no puedes encontrar la causa de este error, haz clic en la flecha al lado del error en la consola y mira a través de la pila de JavaScript para encontrar la llamada de función `set` específica responsable del error.

* * *

### Mi función de inicialización o actualización se ejecuta dos veces[](#my-initializer-or-updater-function-runs-twice "Link for Mi función de inicialización o actualización se ejecuta dos veces ")

En [Modo estricto](https://es.react.dev/reference/react/StrictMode), React llamará a algunas de tus funciones dos veces en lugar de una:

```
function TodoList() {// Esta función de componente se ejecutará dos veces por cada procesamiento.const [todos, setTodos] = useState(() => {// Esta función de inicialización se ejecutará dos veces durante la inicialización.return createTodos();});function handleClick() {setTodos(prevTodos => {// Esta función de actualización se ejecutará dos veces por cada click.return [...prevTodos, createTodo()];});}// ...
```

Esto se espera y no debería romper tu código.

Este comportamiento que ocurre **solo en desarrollo** te ayuda a [mantener los componentes puros.](https://es.react.dev/learn/keeping-components-pure) React usa el resultado de una de las llamadas e ignora el resultado de la otra llamada. Siempre que tus funciones de componente, inicializadoras y actualizadoras sean puras, esto no debería afectar su lógica. Sin embargo, si son impuras accidentalmente, esto te ayuda a detectar los errores y corregirlos.

Por ejemplo, esta función de actualización impura muta un _array_ en el estado:

```
setTodos(prevTodos => {// 🚩 Error: estado mutandoprevTodos.push(createTodo());});
```

Debido a que React llama a tu función de actualización dos veces, verás que la tarea pendiente se agregó dos veces, por lo que sabrás que hay un error. En este ejemplo, puede corregir el error [reemplazando el _array_ en lugar de mutarlo](#updating-objects-and-arrays-in-state):

```
setTodos(prevTodos => {// ✅ Correcto: reemplazar con nuevo estadoreturn [...prevTodos, createTodo()];});
```

Ahora que esta función de actualización es pura, llamarla una vez más no hace una diferencia en el comportamiento. Es por eso que al React llamarla dos veces te ayuda a encontrar errores. **Solo las funciones de componente, inicializadoras y actualizadoras deben ser puras.** Los controladores de eventos no necesitan ser puros, por lo que React nunca llamará a tus controladores de eventos dos veces.

Lea [mantener los componentes puros](https://es.react.dev/learn/keeping-components-pure) para obtener más información.

* * *

### Estoy tratando de establecer el estado como una función, pero termina siendo llamada[](#im-trying-to-set-state-to-a-function-but-it-gets-called-instead "Link for Estoy tratando de establecer el estado como una función, pero termina siendo llamada ")

No puedes poner una función en un estado como este:

```
const [fn, setFn] = useState(someFunction);function handleClick() {setFn(someOtherFunction);}
```

Debido a que estás pasando una función, React asume que `someFunction` es una [función inicializadora](#avoiding-recreating-the-initial-state), y que `someOtherFunction` es una [función actualizadora](#updating-state-based-on-the-previous-state), por lo que intenta llamarlas y almacenar el resultado. Para realmente _almacenar_ una función, tienes que poner `() =>` delante de ellas en ambos casos. Entonces React almacenará las funciones que pases.

```
const [fn, setFn] = useState(() => someFunction);function handleClick() {setFn(() => someOtherFunction);}
```
