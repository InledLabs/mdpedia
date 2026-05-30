---
title: "Subclasses | GNOME JavaScript"
source: https://gjs.guide/guides/gobject/subclassing.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Subclasses | GNOME JavaScript

## GObject Subclassing [​](#gobject-subclassing)

Subclassing is a convenient way to extend most GObject classes, allowing you to define additional methods, properties and signals. If you haven't read the [GObject Basics](https://gjs.guide/guides/gobject/basics.html) guide already some of the concepts in this guide may be unfamiliar to you, so consider reading that first.

## Subclassing GObject [​](#subclassing-gobject)

WARNING

Note that prior to GJS 1.72 (GNOME 42), it was required to override `_init()` and chain-up with `super._init()` instead of the standard `constructor()`.

Every class of GObject has a globally unique [GType](#gtype) and so each subclass must be registered using the `GObject.registerClass()` function. This function takes a dictionary of GObject attributes as the first argument, and a JavaScript class declaration as its second argument.

Below is an example of a GObject class declaration with a [`GTypeName`](#gtype-name), [`Properties`](#properties) and [`Signals`](#signals) defined.

js

```
import GObject from 'gi://GObject';


const SubclassExample = GObject.registerClass({
    GTypeName: 'SubclassExample',
    Properties: {
        'example-property': GObject.ParamSpec.boolean(
            'example-property',
            'Example Property',
            'A read-write boolean property',
            GObject.ParamFlags.READWRITE,
            true
        ),
    },
    Signals: {
        'example-signal': {},
    },
}, class SubclassExample extends GObject.Object {
    constructor(constructProperties = {}) {
        super(constructProperties);
    }

    get example_property() {
        if (this._example_property === undefined)
            this._example_property = null;

        return this._example_property;
    }

    set example_property(value) {
        if (this.example_property === value)
            return;

        this._example_property = value;
        this.notify('example-property');
    }
});
```

## GTypeName [​](#gtypename)

TIP

See the [`GType`](https://gjs.guide/guides/gobject/gtype.html#gtype-name) guide for detailed information about the value of this field.

By default, the `GType` name of a subclass in GJS will be the class name prefixed with `Gjs_`. Usually setting a custom name is not necessary unless you need to refer to the type by name, such as in a `GtkBuilder` interface definition.

To specify a custom `GType` name, you can pass it as the value for the `GTypeName` property to `GObject.registerClass()`:

js

```
const SubclassOne = GObject.registerClass({
}, class SubclassOne extends GObject.Object {
});

const SubclassTwo = GObject.registerClass({
    GTypeName: 'CustomName',
}, class SubclassTwo extends GObject.Object {
});

// expected output: 'Gjs_SubclassOne'
console.log(SubclassOne.$gtype.name);

// expected output: 'CustomName'
console.log(SubclassTwo.$gtype.name);
```

## Properties [​](#properties)

TIP

See the [GObject Basics](https://gjs.guide/guides/gobject/basics.html#properties) guide for an introduction to how to use properties in GJS.

### Declaring Properties [​](#declaring-properties)

TIP

For read-write properties, GJS provides default `get` and `set` accessors. You can use them or write your own.

When defining properties of a GObject subclass, the properties must be declared in the `Properties` dictionary of the class definition. Each entry contains a [`GObject.ParamSpec`](https://gjs-docs.gnome.org/gobject20/gobject.paramspec) defining the attributes and behavior of the property, while the `get` and `set` accessors control the value.

js

```
const SubclassExample = GObject.registerClass({
    Properties: {
        'example-property': GObject.ParamSpec.string(
            'example-property',
            'Example Property',
            'A read-write string property',
            GObject.ParamFlags.READWRITE,
            null
        ),
    },
}, class SubclassExample extends GObject.Object {
    get example_property() {
        // Implementing the default value manually
        if (this._example_property === undefined)
            this._example_property = null;

        return this._example_property;
    }

    set example_property(value) {
        // Skip emission if the value has not changed
        if (this.example_property === value)
            return;

        // Set the property value before emitting
        this._example_property = value;
        this.notify('example-property');
    }
});
```

The class defined above can then be constructed with a dictionary of the declared properties:

js

```
const objectInstance = new SubclassExample({
    example_property: 'construct value',
});
```

### Property Types [​](#property-types)

`Boolean` and `String` properties are the simplest of properties. The default value for a `Boolean` should be `true` or `false`, but a `String` property may have a `null` default.

js

```
GObject.ParamSpec.boolean(
    'boolean-property',
    'Boolean Property',
    'A property holding a true or false value',
    GObject.ParamFlags.READWRITE,
    true);
```

js

```
GObject.ParamSpec.string(
    'string-property',
    'String Property',
    'A property holding a string value',
    GObject.ParamFlags.READWRITE,
    'default string');
```

#### Numeric Types [​](#numeric-types)

WARNING

The 64-bit numeric types can not hold the full value range in GJS. See the [upstream issue](https://gitlab.gnome.org/GNOME/gjs/issues/271) for details.

Properties with numeric types have additional parameters for the value range. The most commonly used in GJS classes are `GObject.ParamSpec.double()`, `GObject.ParamSpec.int()` and `GObject.ParamSpec.uint()`.

js

```
GObject.ParamSpec.double(
    'number-property',
    'Number Property',
    'A property holding a JavaScript Number',
    GObject.ParamFlags.READWRITE,
    Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER,
    0.0);
```

The GType `GObject.TYPE_DOUBLE` is equivalent to the JavaScript [`Number`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) type, and can be fully represented by `GObject.ParamSpec.double()`. The 64-bit types such as `GObject.TYPE_INT64` are not mapped to [`BigInt`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt), which limits `GObject.ParamSpec.int64()` to the range of [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) and [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER).

js

```
GObject.ParamSpec.int64(
    'int64-property',
    'Int64 Property',
    'A property holding an JavaScript Number',
    GObject.ParamFlags.READWRITE,
    Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER,
    0);
```

#### Complex Types [​](#complex-types)

There are several `GObject.ParamSpec` types for complex values, the most common being for GObject and GBoxed. Both of these require a `GType`, although `GObject.ParamSpec.object()` can be passed an super-class of the expected type.

js

```
GObject.ParamSpec.object(
    'object-property',
    'GObject Property',
    'A property holding an object derived from GObject',
    GObject.ParamFlags.READWRITE,
    GObject.Object);
```

The `GObject.ParamSpec` for a [`GLib.Variant`](https://gjs-docs.gnome.org/glib20/glib.variant) expects a [`GLib.VariantType`](https://gjs-docs.gnome.org/glib20/glib.varianttype) describing the type of value it will hold.

js

```
GObject.param_spec_variant(
    'variant-property',
    'GVariant Property',
    'A property holding a GVariant value',
    new GLib.VariantType('as'),
    new GLib.Variant('as', ['one', 'two', 'three']),
    GObject.ParamFlags.READWRITE);
```

There is also support for JavaScript types that derive from the native [`Object`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) type. This includes `Object`, `Array` and more complex types like `Date()`.

js

```
GObject.ParamSpec.jsobject(
    'jsobject-property',
    'JSObject Property',
    'A property holding a JavaScript object',
    GObject.ParamFlags.READWRITE);
```

### Property Flags [​](#property-flags)

GObject properties are not only strictly typed, but also have with restrictions on if they are read-only, write-only, read-write or changeable after construction. This behavior is controlled by the [`GObject.ParamFlags`](https://gjs-docs.gnome.org/gobject20/gobject.paramflags). Below are the most commonly used flags:

*   `GObject.ParamFlags.READABLE`
    
    A property with this flag can be read.
    
*   `GObject.ParamFlags.WRITABLE`
    
    A property with this flag is written. Write-only properties are rarely used.
    
*   `GObject.ParamFlags.READWRITE`
    
    This is an alias for `GObject.ParamFlags.READABLE | GObject.ParamFlags.WRITABLE`.
    
*   `GObject.ParamFlags.CONSTRUCT_ONLY`
    
    A property with this flag can only be written during construction.
    

### Property Change Notification [​](#property-change-notification)

As introduced in the [GObject Basics](https://gjs.guide/guides/gobject/basics.html) guide, all GObjects have a [`notify`](https://gjs-docs.gnome.org/gobject20/gobject.object#signal-notify) signal that may be emitted when a property changes. GObject subclasses in GJS must explicitly emit this signal for properties by calling [`GObject.Object.notify()`](https://gjs-docs.gnome.org/gobject20/gobject.object#method-notify).

js

```
const SubclassExample = GObject.registerClass({
    Properties: {
        'example-property': GObject.ParamSpec.string(
            'example-property',
            'Example Property',
            'A read-write string property',
            GObject.ParamFlags.READWRITE,
            null
        ),
    },
}, class SubclassExample extends GObject.Object {
    get example_property() {
        // Implementing the default value manually
        if (this._example_property === undefined)
            this._example_property = null;

        return this._example_property;
    }

    set example_property(value) {
        // Skip emission if the value has not changed
        if (this.example_property === value)
            return;

        // Set the property value before emitting
        this._example_property = value;
        this.notify('example-property');
    }
});
```

## Signals [​](#signals)

TIP

See the [GObject Basics](https://gjs.guide/guides/gobject/basics.html#signals) guide for an introduction to how to use signals in GJS.

### Declaring Signals [​](#declaring-signals)

When defining signals of a GObject subclass, the signals must be declared in the `Signals` dictionary of the class definition. The simplest signals with the default behavior only require a name.

js

```
const SignalsExample = GObject.registerClass({
    Signals: {
        'example-signal': {},
    },
}, class SignalsExample extends GObject.Object {
});
```

Callbacks are connected as handlers for the signal, like with any other GObject class:

js

```
const signalsExample = new SignalsExample();

// Connecting to the signal
const handlerId = signalsExample.connect('example-signal',
    () => console.log('example-signal emitted!'));

// Emitting the signal
signalsExample.emit('example-signal');

// Disconnecting from the signal
signalsExample.disconnect(handlerId);
```

A default signal handler can be defined in the class, and the following attributes can also be changed in the signal declaration.

Key

Default

Description

`flags`

`GObject.SignalFlags.RUN_FIRST`

Emission behavior

`param_types`

`[]` (No arguments)

List of `GType` arguments

`return_type`

`GObject.TYPE_NONE`

Return type of callbacks

`accumulator`

`GObject.AccumulatorType.NONE`

Return value behavior

### Default Handler [​](#default-handler)

Classes can set a default handler for a signal and subclasses can override them. A default handler is set by defining a class method prefixed with `on_`, such as `on_example_handler()` for the signal `example-handler`.

js

```
const HandlerExample = GObject.registerClass({
    Signals: {
        'example-signal': {
            flags: GObject.SignalFlags.RUN_FIRST,
        },
    },
}, class HandlerExample extends GObject.Object {
    on_example_signal() {
        console.log('default handler invoked');
    }
});
```

The default handler for a signal is always invoked, regardless of whether a user handler (i.e. callback) is connected to the signal. The order the default handler is invoked is controlled by whether it has the flag `RUN_FIRST`, `RUN_LAST` or `RUN_CLEANUP`.

js

```
const handlerExample = new HandlerExample();

handlerExample.connect('example-handler',
    () => console.log('user handler invoked'));


/* Expected output:
 *   1. "default handler invoked"
 *   2. "user handler invoked"
 */
handlerExample.emit('example-signal');
```

### Signal Flags [​](#signal-flags)

Signal flags can control several aspects of the emission, the most commonly used are below:

*   `GObject.SignalFlags.RUN_FIRST`
    
*   `GObject.SignalFlags.RUN_LAST`
    
*   `GObject.SignalFlags.RUN_CLEANUP`
    
    As explained above, these three flags determine which emission phase the default handler will be invoked.
    
*   `GObject.SignalFlags.DETAILED`
    
    A signal with this flag allows signal to be emitted with a detail string. For example, the GObject signal `notify` can be emitted with a property name as a detail.
    

The [`GObject.SignalFlags`](https://gjs-docs.gnome.org/gobject20/gobject.signalflags) enumeration describes all the possible flags for signals.

js

```
const DetailExample = GObject.registerClass({
    Signals: {
        'example-signal': {
            flags: GObject.SignalFlags.RUN_LAST | GObject.SignalFlags.DETAILED,
        },
    },
}, class DetailedExample extends GObject.Object {
    on_example_signal() {
        console.log('default handler invoked');
    }
});
```

The signal above can be connected to with an optional "detail" appended to the signal name. In that case, the handler will only be run if the emission detail matches the handler detail.

Since the `RUN_LAST` flag is used, the default handler will run after a user handler connected with `GObject.Object.connect()`, but before a user handler connected with `GObject.Object.connect_after()`.

js

```
const detailExample = new DetailExample();

detailExample.connect('example-handler',
    () => console.log('user handler invoked'));

detailExample.connect('example-signal::foobar',
    () => console.log('user handler invoked (detailed)'));

detailExample.connect_after('example-signal',
    () => console.log('user handler invoked (after)'));

/* Expected output:
 *   1. "user handler invoked"
 *   2. "user handler invoked (detailed)"
 *   3. "default handler invoked"
 *   4. "user handler invoked (after)"
 */
detailExample.emit('example-signal::foobar');

/* Expected output:
 *   1. "user handler invoked"
 *   2. "default handler invoked"
 *   3. "user handler invoked (after)"
 */
detailExample.emit('example-signal::bazqux');
```

### Signal Parameters [​](#signal-parameters)

The first argument for a signal callback is always the emitting object, but additional parameters can also be defined for signals using the `param_types` key:

js

```
const ParameterExample = GObject.registerClass({
    Signals: {
        'example-signal': {
            param_types: [GObject.TYPE_BOOLEAN, GObject.TYPE_STRING],
        },
    },
}, class ParameterExample extends GObject.Object {
});
```

Callbacks then receive the additional parameter value as function arguments:

js

```
const parameterExample = new ParameterExample();

parameterExample.connect('example-signal', (emittingObject, arg1, arg2) => {
    console.log(`user handler invoked: ${arg1}, ${arg2}`);
});

// Expected output: "user handler invoked: true, foobar"
parameterExample.emit('example-signal', true, 'foobar');
```

### Signal Return Values [​](#signal-return-values)

Signals may be configured to require a return value from handlers, allowing a callback to communicate to the emitting object. In most cases this is a `boolean` value, but other types are possible.

js

```
const ReturnExample = GObject.registerClass({
    Signals: {
        'example-signal': {
            return_type: GObject.TYPE_BOOLEAN,
        },
    },
}, class ReturnExample extends GObject.Object {
});
```

Callbacks for the signal should return an appropriate value, which the emitting object can act on:

js

```
const returnExample = new ReturnExample();

returnExample.connect('example-signal', () => {
    return true;
});

// Expected output: "signal handler returned true"
if (returnExample.emit('example-signal'))
    console.log('signal handler returned true');
else
    console.log('signal handler returned false');
```

### Signal Accumulator [​](#signal-accumulator)

Signal accumulators are special functions that collect the return values of callbacks, similar to how [`reduce()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) works. Currently GJS only supports two built-in accumulators:

*   `GObject.AccumulatorType.NONE`
    
    This is the default.
    
*   `GObject.AccumulatorType.FIRST_WINS`
    
    This accumulator will use the return value of the first handler that is run. A signal with this accumulator may have a return of any type.
    
*   `GObject.AccumulatorType.TRUE_HANDLED`
    
    This accumulator will stop emitting once a handler returns `true`. A signal with this accumulator must have a return type of `GObject.TYPE_BOOLEAN`.
    

Below is an example of declaring a signal with the `TRUE_HANDLED` accumulator that stops signal emission after the second user callback returns `true`.

js

```
const AccumulatorExample = GObject.registerClass({
    Signals: {
        'example-signal': {
            flags: GObject.SignalFlags.RUN_LAST,
            accumulator: GObject.AccumulatorType.TRUE_HANDLED,
            return_type: GObject.TYPE_BOOLEAN,
        },
    },
}, class AccumulatorExample extends GObject.Object {
    on_example_signal() {
        console.log('default handler invoked');
        return true;
    }
});
```

It can be seen that when emitting the signal, the first connected handler that returns `true` prevents later user handlers and the default handler from running:

js

```
const accumulatorExample = new AccumulatorExample();

accumulatorExample.connect('example-signal', () => {
    console.log('first user handler');
    return false;
});

accumulatorExample.connect('example-signal', () => {
    console.log('second user handler');
    return true;
});

accumulatorExample.connect('example-signal', () => {
    console.log('third user handler');
    return true;
});

/* Expected output:
 *   1. "first user handler"
 *   2. "second user handler"
 */
accumulatorExample.emit('example-signal');
```

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
