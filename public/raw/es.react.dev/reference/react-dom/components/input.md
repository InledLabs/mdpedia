---
title: <input> – React
source: https://es.react.dev/reference/react-dom/components/input
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../../_index.md).

---

# <input> – React

El [componente `<input>` integrado en el navegador](https://developer.mozilla.org/es/docs/Web/HTML/Element/input) te permite renderizar diferentes tipos de entradas de formularios.

```
<input />
```

*   [Referencia](#reference)
    *   [`<input>`](#input)
*   [Uso](#usage)
    *   [Visualización de inputs de diferentes tipos](#displaying-inputs-of-different-types)
    *   [Proporcionar una etiqueta para un input](#providing-a-label-for-an-input)
    *   [Proporcionar un valor inicial para un input](#providing-an-initial-value-for-an-input)
    *   [Leer los valores de los inputs cuando se envía un formulario](#reading-the-input-values-when-submitting-a-form)
    *   [Controlar un input con un estado variable](#controlling-an-input-with-a-state-variable)
    *   [Optimizar la re-renderización en cada pulsación del teclado](#optimizing-re-rendering-on-every-keystroke)
*   [Solución de problemas](#troubleshooting)
    *   [Mi input de tipo texto no se actualiza cuando escribo dentro de él](#my-text-input-doesnt-update-when-i-type-into-it)
    *   [Mi checkbox no se actualiza cuando le doy click](#my-checkbox-doesnt-update-when-i-click-on-it)
    *   [El caret de mi input salta al principio de cada pulsación del teclado](#my-input-caret-jumps-to-the-beginning-on-every-keystroke)
    *   [Estoy teniendo un error: “Un componente esta cambiando un input no controlado para ser controlado”](#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled)

* * *

## Referencia[](#reference "Link for Referencia ")

### `<input>`[](#input "Link for this heading")

Para mostrar un input, renderiza el componente [`<input>` incorporado en el navegador](https://developer.mozilla.org/es/docs/Web/HTML/Element/input).

```
<input name="myInput" />
```

[Ver más ejemplos abajo.](#usage)

#### Props[](#props "Link for Props ")

`<input>` admite todas las [props comunes de los elementos.](https://es.react.dev/reference/react-dom/components/common#props)

*   [`formAction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formaction): A string or function. Overrides the parent `<form action>` for `type="submit"` and `type="image"`. When a URL is passed to `action` the form will behave like a standard HTML form. When a function is passed to `formAction` the function will handle the form submission. See [`<form action>`](https://es.react.dev/reference/react-dom/components/form#props).

Puedes [hacer un input controlado](#controlling-an-input-with-a-state-variable) pasando una de estas props:

*   [`checked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#checked): Booleano. Para un entrada de tipo checkbox o radio button, controla si está seleccionado.
*   [`value`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#value): String. Para una entrada de texto, controla su texto. (Para un radio button, especifica sus datos de formulario.)

Cuando pases cualquiera de ellos, debes también pasar un controlador `onChange` que actualice el valor pasado.

Estas props de `<input>` son solamente relevantes para inputs no controlados:

*   [`defaultChecked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#defaultChecked): Booleano. Especifica [el valor inicial](#providing-an-initial-value-for-an-input) para inputs `type="checkbox"` y `type="radio"`.
*   [`defaultValue`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#defaultValue): String. Especifica [el valor inicial](#providing-an-initial-value-for-an-input) para un input de texto.

Estas props de `<input>` son relevantes para ambos inputs controlados y no controlados:

*   [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#accept): String. Especifica cuales tipos de archivo son soportados por un input `type="file"`.
*   [`alt`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#alt): String. Especifica el texto alternativo de una imagen para un input `type="image"`.
*   [`capture`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#capture): String. Especifica el medio capturado (micrófono, video, o cámara) por un input `type="file"`.
*   [`autoComplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete): String. Especifica uno de los posibles [comportamientos de autocompletado.](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values)
*   [`autoFocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus): Booleano. Si es `true`, React enfocara al elemento al montarlo.
*   [`dirname`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#dirname): String. Especifica el nombre del campo de formulario para la direccionalidad del elemento.
*   [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled): Booleano. Si es `true`, el input no será interactivo y aparecerá oscurecido.
*   `children`: `<input>` no acepta hijos.
*   [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#form): String. Especifica el `id` del `<form>` al que este input pertenece. Si se omite, es el formulario padre más cercano.
*   [`formAction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formaction): String. Sobrescribe el `<form action>` padre para `type="submit"` y `type="image"`.
*   [`formEnctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formenctype): String. Sobrescribe el `<form enctype>` padre para `type="submit"` y `type="image"`.
*   [`formMethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formmethod): String. Sobrescribe el `<form method>` padre para `type="submit"` y `type="image"`.
*   [`formNoValidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formnovalidate): String. Sobrescribe el `<form noValidate>` padre para `type="submit"` y `type="image"`.
*   [`formTarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formtarget): String. Sobrescribe `<form target>` padre para `type="submit"` y `type="image"`.
*   [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#height): String. Especifica la altura de la imagen para `type="image"`.
*   [`list`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#list): String. Especifica el `id` del `<datalist>` con las opciones de autocompletado.
*   [`max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max): Número. Especifica el máximo valor de los inputs de tipo numérico y de fecha y hora.
*   [`maxLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength): Número. Especifica la longitud máxima del texto y otros inputs.
*   [`min`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min): Número. Especifica el valor mínimo de los inputs de tipo numérico y de fecha y hora.
*   [`minLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength): Número. Especifica la longitud mínima de texto y otros inputs.
*   [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#multiple): Booleano. Especifica si valores múltiples son permitidos para `<type="file"` y `type="email"`.
*   [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name): String. Especifica el nombre para este input que se [envía con el formulario.](#reading-the-input-values-when-submitting-a-form)
*   `onChange`: Un [controlador de evento](https://es.react.dev/reference/react-dom/components/common#event-handler). Requerido para [inputs controlados.](#controlling-an-input-with-a-state-variable) Se activa inmediatamente cuando el valor del input es cambiado por el usuario (por ejemplo, se activa en cada pulsación de teclas). Se comporta como el [evento `input`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) del navegador.
*   `onChangeCapture`: Una versión de `onChange` que se activa en la [fase de captura.](https://es.react.dev/learn/responding-to-events#capture-phase-events)
*   [`onInput`](https://developer.mozilla.org/es/docs/Web/API/HTMLElement/input_event): Un [controlador de evento](https://es.react.dev/reference/react-dom/components/common#event-handler). Se activa inmediatamente cuando el valor es cambiado por el usuario. Por razones históricas, en React es idiomático usar `onChange` en su lugar que funciona de forma similar.
*   `onInputCapture`: Una version de `onInput` que se activa en la [fase de captura.](https://es.react.dev/learn/responding-to-events#capture-phase-events)
*   [`onInvalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event): Un [controlador de evento](https://es.react.dev/reference/react-dom/components/common#event-handler). Se activa si un input falla en la validación cuando se envía un formulario. A diferencia del evento integrado `invalid`, el evento `onInvalid` de React se propaga.
*   `onInvalidCapture`: Una versión de `onInvalid` que se activa en la [fase de captura.](https://es.react.dev/learn/responding-to-events#capture-phase-events)
*   [`onSelect`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event): Un [controlador de evento](https://es.react.dev/reference/react-dom/components/common#event-handler). Se activa después de selección dentro de los cambios de un `<input>`. React hereda el evento `onSelect` para también activarse para selecciones vacías y en ediciones (las cuales pueden afectar la selección).
*   `onSelectCapture`: Una versión `onSelect` que se activa en la [fase de captura.](https://es.react.dev/learn/responding-to-events#capture-phase-events)
*   [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern): String. Especifica el patrón con el cual `value` debe coincidir.
*   [`placeholder`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder): String. Mostrado en un color atenuado cuando el valor del input esta vació.
*   [`readOnly`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly): Booleano. Si es `true`, el usuario no puede editar el input.
*   [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#required): Booleano. Si es `true`, el valor debe ser proporcionado para poder enviar el formulario.
*   [`size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#size): Número. Similar a configurar el ancho, pero la unidad depende del control.
*   [`src`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#src): String. Especifica la fuente de la imagen para un input `type="image"`.
*   [`step`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step): Un número positivo o un string `'any'`. Especifica la distancia entre los valores validos.
*   [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#type): String. Uno de los [tipos de input.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)
*   [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#width): String. Especifica el ancho de la imagen para un input `type="image"`.

#### Advertencias[](#caveats "Link for Advertencias ")

*   Los Checkboxes necesitan `checked` (o `defaultChecked`), no `value` (o `defaultValue`).
*   Si un input de texto recibe una prop `value` de tipo string , será [tratado como controlado.](#controlling-an-input-with-a-state-variable)
*   Si un checkbox o un radio button recibe una prop `checked` de tipo booleano, será [tratado como controlado.](#controlling-an-input-with-a-state-variable)
*   Un input no puede ser controlado o no controlado al mismo tiempo.
*   Un input no puede cambiar entre ser controlado o no durante su ciclo de vida.
*   Cada input controlado necesita un controlador de evento `onChange` que sincrónicamente actualice su valor de respaldo.

* * *

## Uso[](#usage "Link for Uso ")

### Visualización de inputs de diferentes tipos[](#displaying-inputs-of-different-types "Link for Visualización de inputs de diferentes tipos ")

Para visualizar un input, renderiza un componente `<input>`. Por defecto, será un input de tipo texto. Puedes pasar `type="checkbox"` para un checkbox, `type="radio"` para un radio button, [o uno de los otros tipos de inputs.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)

* * *

### Proporcionar una etiqueta para un input[](#providing-a-label-for-an-input "Link for Proporcionar una etiqueta para un input ")

Típicamente, pondrás cada `<input>` dentro de una etiqueta [`<label>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/label). Esto le dice al navegador que esta etiqueta esta asociada con ese input. Cuando el usuario da click a la etiqueta, el navegador automáticamente enfocará al input. También es esencial para la accesibilidad: un lector de pantalla anunciará la etiqueta cuando el usuario enfoque el input asociado.

Si no puedes anidar un `<input>` dentro de un `<label>`, asócialos pasando el mismo ID al `<input id>` y al [`<label htmlFor>`.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor) Para evitar conflictos entre múltiples instancias de un componente, genera dicho ID con [`useId`.](https://es.react.dev/reference/react/useId)

* * *

### Proporcionar un valor inicial para un input[](#providing-an-initial-value-for-an-input "Link for Proporcionar un valor inicial para un input ")

Puedes opcionalmente especificar el valor inicial para cualquier input. Pásalo como el `defaultValue` string para inputs de tipo texto. Checkboxes y radio buttons deben especificar el valor inicial con el `defaultChecked` booleano en su lugar.

* * *

### Leer los valores de los inputs cuando se envía un formulario[](#reading-the-input-values-when-submitting-a-form "Link for Leer los valores de los inputs cuando se envía un formulario ")

Añade un [`<form>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/form) que rodee tus inputs con un [`<button type="submit">`](https://developer.mozilla.org/es/docs/Web/HTML/Element/button) dentro. Llamará a tu controlador de evento `<form onSubmit>`. Por defecto, el navegador enviará los datos del formulario a la URL actual y refrescará la página. Puedes sobrescribir ese comportamiento llamando `e.preventDefault()`. Para leer los datos del formulario, usa [`new FormData(e.target)`](https://developer.mozilla.org/es/docs/Web/API/FormData).

### Nota

Da un `name` para cada `<input>`, por ejemplo `<input name="firstName" defaultValue="Taylor" />`. El `name` que especifiques será usado como una llave en los datos del formulario, por ejemplo `{ firstName: "Taylor" }`.

### Atención

Por defecto, _cualquier_ `<button>` dentro de un `<form>` lo enviará. ¡Esto puede ser sorprendente! Si tienes tu propio componente `Button` de React, considera devolver [`<button type="button">`](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/button) en vez de `<button>`. Entonces, para ser explicito, usa `<button type="submit">` para botones que _se_ supone envían el formulario.

* * *

### Controlar un input con un estado variable[](#controlling-an-input-with-a-state-variable "Link for Controlar un input con un estado variable ")

Un input como `<input />` es _no controlado._ Incluso si [pasas un valor inicial](#providing-an-initial-value-for-an-input) como `<input defaultValue="Initial text" />`, tu JSX solo especifica el valor inicial. No controla cual debe ser el valor ahora mismo.

**Para renderizar un input _controlado_, pásale la prop `value` (o `checked` para checkboxes y radios).** React forzará al input para que siempre tenga el `value` que le pasaste. Típicamente, controlarás un input declarando una [variable de estado:](https://es.react.dev/reference/react/useState)

```
function Form() {const [firstName, setFirstName] = useState(''); // Declara una variable de estado...// ...return (<inputvalue={firstName} // ... fuerza al valor del input para que coincida con la variable de estado...onChange={e => setFirstName(e.target.value)} // ... y actualiza la variable de estado en cada edición!/>);}
```

Un input controlado te servirá si necesitas un estado de cualquier forma — por ejemplo, para renderizar tu UI en cada edición:

```
function Form() {const [firstName, setFirstName] = useState('');return (<><label>        Nombre:<input value={firstName} onChange={e => setFirstName(e.target.value)} /></label>{firstName !== '' && <p>Tu nombre es {firstName}.</p>}      ...
```

Es también útil si quieres ofrecer múltiples formas de ajustar el estado del input (por ejemplo, al dar click a un botón):

```
function Form() {// ...const [age, setAge] = useState('');const ageAsNumber = Number(age);return (<><label>        Edad:<inputvalue={age}onChange={e => setAge(e.target.value)}type="number"/><button onClick={() => setAge(ageAsNumber + 10)}>          Añade 10 años</button>
```

El `value` que pases a componentes controlados no debe ser `undefined` o `null`. Si necesitas que el valor inicial este vacío (así como el campo de `firstName` más abajo), inicializa tu variable de estado con un string vacío (`''`).

### Atención

**Si pasas un `value` sin un `onChange`, será imposible escribir dentro del input.** Cuando controlas un input pasándole algún `value`, lo _fuerzas_ a siempre tener el valor que le pasaste. Entonces si pasas una variable de estado como un `value` pero olvidaste actualizar esa variable de estado sincrónicamente durante el controlado de evento `onChange`, React revertirá el input después de cada pulsación del teclado al `value` que especificaste.

* * *

### Optimizar la re-renderización en cada pulsación del teclado[](#optimizing-re-rendering-on-every-keystroke "Link for Optimizar la re-renderización en cada pulsación del teclado ")

Cuando usas un input controlado, pones el estado en cada pulsación del teclado. Si el componente que contiene tu estado renderiza de nuevo un árbol grande, este puede volverse lento. Hay varias formas en las que puedes optimizar el rendimiento del re-renderizado.

Por ejemplo, supón que empiezas con un formulario que renderiza de nuevo toda el contenido de la página en cada pulsación del teclado:

```
function App() {const [firstName, setFirstName] = useState('');return (<><form><input value={firstName} onChange={e => setFirstName(e.target.value)} /></form><PageContent /></>);}
```

Ya que `<PageContent />` no depende del estado del input, puedes mover el valor del input dentro de su propio componente:

```
function App() {return (<><SignupForm /><PageContent /></>);}function SignupForm() {const [firstName, setFirstName] = useState('');return (<form><input value={firstName} onChange={e => setFirstName(e.target.value)} /></form>);}
```

Esto mejora el rendimiento significativamente porque ahora solamente `SignupForm` renderiza de nuevo en cada pulsación del teclado.

Si no hay forma de evitar el re-renderizado (por ejemplo, si `PageContent` depende del valor de el input de búsqueda), [`useDeferredValue`](https://es.react.dev/reference/react/useDeferredValue#deferring-re-rendering-for-a-part-of-the-ui) te permite mantener el input controlado incluso a la mitad de un re-renderizado grande.

* * *

## Solución de problemas[](#troubleshooting "Link for Solución de problemas ")

### Mi input de tipo texto no se actualiza cuando escribo dentro de él[](#my-text-input-doesnt-update-when-i-type-into-it "Link for Mi input de tipo texto no se actualiza cuando escribo dentro de él ")

Si renderizas un input con un `value` pero sin un `onChange`, verás un error en la consola:

```
// 🔴 Error: input de texto controlado sin un controlador de evento onChange<input value={something} />
```

Console

You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.

**(Traducción)**

Proporcionaste una prop `value` a un campo de formulario sin un controlador `onChange`. Esto renderiza un campo de solo lectura. Si el campo debe ser mutable usa `defaultValue`. En caso contrario, establece `onChange` o `readOnly`.

Como el mensaje de error sugiere, si solo quieres [especificar el valor _inicial_ ,](#providing-an-initial-value-for-an-input) pasa `defaultValue` en su lugar:

```
// ✅ Bien: input no controlado con un valor inicial<input defaultValue={something} />
```

Si quieres [controlar este input con una variable de estado,](#controlling-an-input-with-a-state-variable) especifica un controlador de evento `onChange`:

```
// ✅ Bien: input controlado con onChange<input value={something} onChange={e => setSomething(e.target.value)} />
```

Si el valor es intencionalmente de solo lectura, añade una prop `readOnly` para eliminar el error:

```
// ✅ Bien: input controlado de solo lectura sin un onChange<input value={something} readOnly={true} />
```

* * *

### Mi checkbox no se actualiza cuando le doy click[](#my-checkbox-doesnt-update-when-i-click-on-it "Link for Mi checkbox no se actualiza cuando le doy click ")

Si renderizas un checkbox con `checked` pero sin `onChange`, verás un error en la consola:

```
// 🔴 Error: checkbox controlado sin un controlador de evento onChange<input type="checkbox" checked={something} />
```

Console

You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.

**(Traducción)**

Proporcionaste una prop `checked` a un campo de formulario sin un controlador `onChange`. Esto renderiza un campo de solo lectura. Si el campo debe ser mutable usa `defaultChecked`. En caso contrario, establece `onChange` o `readOnly`.

Como el error sugiere, si solo quieres [especificar el valor _inicial_,](#providing-an-initial-value-for-an-input) pasa `defaultChecked` en su lugar:

```
// ✅ Bien: checkbox no controlado con un valor inicial<input type="checkbox" defaultChecked={something} />
```

Si quieres [controlar este checkbox con una variable de estado,](#controlling-an-input-with-a-state-variable) especifica un controlador de evento `onChange`:

```
// ✅ Bien: checkbox controlado con onChange<input type="checkbox" checked={something} onChange={e => setSomething(e.target.checked)} />
```

### Atención

Necesitas leer `e.target.checked` en vez de `e.target.value` para checkboxes.

Si el checkbox es intencionalmente de solo lectura, añade una prop `readOnly` para eliminar el error:

```
// ✅ Bien: input controlado de solo lectura sin un onChange<input type="checkbox" checked={something} readOnly={true} />
```

* * *

### El caret de mi input salta al principio de cada pulsación del teclado[](#my-input-caret-jumps-to-the-beginning-on-every-keystroke "Link for El caret de mi input salta al principio de cada pulsación del teclado ")

Si [controlas un input,](#controlling-an-input-with-a-state-variable) debes actualizar su variable de estado con el valor del input desde el DOM durante `onChange`.

No puedes actualizarlo a algo distinto a `e.target.value` (o `e.target.checked` para checkboxes):

```
function handleChange(e) {// 🔴 Error: actualizando un input a algo distinto a e.target.valuesetFirstName(e.target.value.toUpperCase());}
```

También no puedes actualizarlo asincrónicamente:

```
function handleChange(e) {// 🔴 Error: actualizando un input asincrónicamentesetTimeout(() => {setFirstName(e.target.value);}, 100);}
```

Para arreglar tu código, actualízalo sincrónicamente a `e.target.value`:

```
function handleChange(e) {// ✅ Actualizando un input controlado a e.target.value sincrónicamentesetFirstName(e.target.value);}
```

Si esto no repara el problema, es posible que el input sea removido y re-agregado al DOM en cada pulsación de tecla. Esto puede ocurrir si tú estás accidentalmente [reiniciando el estado](https://es.react.dev/learn/preserving-and-resetting-state) en cada re-renderización, por ejemplo, si el input o uno de sus padres siempre recibe un atributo `key` diferente, o si tú anidas definiciones de funciones de componentes (lo cual no es soportado y causa que el componente “interno” siempre sea considerado un árbol diferente).

* * *

### Estoy teniendo un error: “Un componente esta cambiando un input no controlado para ser controlado”[](#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled "Link for Estoy teniendo un error: “Un componente esta cambiando un input no controlado para ser controlado” ")

Si proporcionas un `value` al componente, debe seguir siendo un string durante de su ciclo de vida.

No puedes pasar `value={undefined}` primero y luego pasar `value="some string"` porque React no sabrá si quieres que el componente sea controlado o no. Un componente controlado debería siempre recibir un `value` de tipo string, no un `null` o `undefined`.

Si tu `value` viene desde una API o de una variable de estado, puede ser inicializado en `null` o `undefined`. En ese caso, o bien establécelo en un string vacío (`''`) inicialmente, o pasa `value={someValue ?? ''}` para asegurar que `value` es un string.

Similarmente, si pasas `checked` a un checkbox, asegúrate de que siempre sea un booleano.
